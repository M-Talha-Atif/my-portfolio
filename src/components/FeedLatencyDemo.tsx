'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

// A replay of the Cunocovo feed fix. The two end-to-end figures (3,000 ms before, 700 ms after) were
// measured in production. How that gap divides between the four fixes is an illustration: each fix
// was not timed in isolation, so the demo says so on the page.

type FixKey = 'index' | 'cols' | 'query' | 'cache'
type Fixes = Record<FixKey, boolean>

const FIXES: { key: FixKey; label: string; detail: string }[] = [
  { key: 'index', label: 'Composite index', detail: '(user_id, created_at DESC), so Postgres stops scanning the table' },
  { key: 'cols', label: 'Trim the DTO', detail: 'send the 6 columns the client reads, not all 15' },
  { key: 'query', label: 'Rework the query', detail: 'optimise how the feed query is built' },
  { key: 'cache', label: 'In-memory cache', detail: '5 minute TTL, keyed by user_id' },
]

const NONE: Fixes = { index: false, cols: false, query: false, cache: false }
const ALL: Fixes = { index: true, cols: true, query: true, cache: true }
const SCALE_MS = 3000

type Row = { id: string; label: string; note: string; ms: number; slow: boolean }

function buildRows(f: Fixes): Row[] {
  return [
    { id: 'auth', label: 'route + auth', note: 'verify JWT', ms: 80, slow: false },
    { id: 'plan', label: 'build query', note: f.query ? 'reworked' : 'original shape', ms: 100 + (f.query ? 0 : 400), slow: !f.query },
    { id: 'fetch', label: 'fetch rows', note: f.index ? 'Index Scan on posts' : 'Seq Scan on posts', ms: 120 + (f.index ? 0 : 1100), slow: !f.index },
    { id: 'dto', label: 'serialise', note: f.cols ? '6 columns' : '15 columns', ms: 120 + (f.cols ? 0 : 450), slow: !f.cols },
    { id: 'assemble', label: 'assemble feed', note: f.cache ? 'cache hit' : 'rebuilt every request', ms: 80 + (f.cache ? 0 : 350), slow: !f.cache },
    { id: 'send', label: 'respond + render', note: 'network, parse, paint', ms: 200, slow: false },
  ]
}

const POSTS = [
  { handle: 'lens.by.amara', caption: 'Golden hour, Karoo road trip', likes: 214 },
  { handle: 'northfield.film', caption: 'Test reel, 16mm grain pass', likes: 98 },
  { handle: 'studio.kofi', caption: 'Product set, softbox only', likes: 141 },
  { handle: 'mira.frames', caption: 'Street, Rosebank, 6:40am', likes: 76 },
]

type LogEntry = { n: number; fixes: Fixes; ms: number }

function fixSummary(f: Fixes) {
  const on = FIXES.filter((x) => f[x.key]).map((x) => x.key)
  return on.length === 0 ? 'no fixes' : on.join(' + ')
}

export default function FeedLatencyDemo() {
  const [fixes, setFixes] = useState<Fixes>(NONE)
  const [phase, setPhase] = useState<'idle' | 'running' | 'done'>('idle')
  const [elapsed, setElapsed] = useState(0)
  const [log, setLog] = useState<LogEntry[]>([])
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)
  const runCount = useRef(0)

  const rows = useMemo(() => buildRows(fixes), [fixes])
  const total = useMemo(() => rows.reduce((s, r) => s + r.ms, 0), [rows])
  const starts = useMemo(() => {
    let acc = 0
    return rows.map((r) => {
      const s = acc
      acc += r.ms
      return s
    })
  }, [rows])

  const stop = useCallback(() => {
    if (timer.current !== null) clearInterval(timer.current)
    timer.current = null
  }, [])

  useEffect(() => stop, [stop])

  const finish = useCallback(
    (f: Fixes, ms: number) => {
      runCount.current += 1
      setElapsed(ms)
      setPhase('done')
      setLog((l) => [{ n: runCount.current, fixes: f, ms }, ...l].slice(0, 5))
    },
    [],
  )

  const run = useCallback(() => {
    stop()
    const f = fixes
    const target = total
    const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      finish(f, target)
      return
    }
    setPhase('running')
    setElapsed(0)
    const t0 = performance.now()
    // wall-clock based, so a throttled or backgrounded tab still lands on the right number
    timer.current = setInterval(() => {
      const t = performance.now() - t0
      if (t >= target) {
        stop()
        finish(f, target)
        return
      }
      setElapsed(t)
    }, 16)
  }, [fixes, total, stop, finish])

  const toggle = (key: FixKey) => {
    stop()
    setPhase('idle')
    setElapsed(0)
    setFixes((f) => ({ ...f, [key]: !f[key] }))
  }

  const preset = (f: Fixes) => {
    stop()
    setPhase('idle')
    setElapsed(0)
    setFixes(f)
  }

  const running = phase === 'running'
  const done = phase === 'done'
  const shown = done ? total : elapsed
  const saved = done && total < SCALE_MS ? Math.round(((SCALE_MS - total) / SCALE_MS) * 100) : 0
  const firstPostAt = total

  return (
    <section className="glass p-8 rounded-2xl mb-10 border border-[var(--color-border)]" aria-labelledby="feed-demo-title">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 mb-1">
        <h3 id="feed-demo-title" className="text-xl font-semibold">Replay the feed fix</h3>
        <span className="font-mono text-xs text-subtext">GET /feed &middot; production, 3,000 ms &rarr; 700 ms</span>
      </div>
      <p className="text-sm text-subtext leading-relaxed mb-6 max-w-3xl">
        The feed took three seconds because four separate things were wrong. Switch the fixes on one at a time, send the
        request, and watch where the time goes.
      </p>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_260px] gap-8">
        <div className="min-w-0">
          {/* fixes */}
          <div className="flex items-center justify-between mb-2">
            <div className="font-mono text-[11px] uppercase tracking-widest text-subtext">fixes applied</div>
            <div className="flex gap-3 font-mono text-xs">
              <button type="button" onClick={() => preset(NONE)} className="text-subtext hover:text-heading underline-offset-4 hover:underline">
                before
              </button>
              <button type="button" onClick={() => preset(ALL)} className="text-subtext hover:text-heading underline-offset-4 hover:underline">
                after
              </button>
            </div>
          </div>
          <ul className="border border-[var(--color-border)] rounded-lg divide-y divide-[var(--color-border)] mb-6">
            {FIXES.map((fx) => {
              const on = fixes[fx.key]
              return (
                <li key={fx.key}>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={on}
                    onClick={() => toggle(fx.key)}
                    className="w-full flex items-start gap-3 text-left px-4 py-3 hover:bg-[var(--color-surface)] transition-colors"
                  >
                    <span
                      aria-hidden
                      className={`mt-0.5 shrink-0 w-4 h-4 rounded-[3px] border flex items-center justify-center text-[11px] leading-none font-bold ${
                        on
                          ? 'bg-[var(--color-accent-solid)] border-[var(--color-accent-solid)] text-[var(--color-on-accent)]'
                          : 'border-[var(--color-border-strong)] text-transparent'
                      }`}
                    >
                      &#10003;
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-medium text-heading">{fx.label}</span>
                      <span className="block text-xs text-subtext leading-snug">{fx.detail}</span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>

          {/* waterfall */}
          <div className="flex items-center justify-between mb-2">
            <div className="font-mono text-[11px] uppercase tracking-widest text-subtext">request waterfall</div>
            <div className="font-mono text-[11px] text-subtext">0 &ndash; {SCALE_MS / 1000}s</div>
          </div>
          <div className="relative border border-[var(--color-border)] rounded-lg p-3 overflow-hidden">
            <div className="space-y-2">
              {rows.map((r, i) => {
                const start = starts[i]
                const visible = Math.max(0, Math.min(1, (shown - start) / r.ms))
                const finished = shown >= start + r.ms - 0.5 && (running || done)
                return (
                  <div key={r.id} className="grid grid-cols-[104px_minmax(0,1fr)_52px] sm:grid-cols-[120px_minmax(0,1fr)_56px] items-center gap-2">
                    <div className="min-w-0">
                      <div className="text-xs text-heading truncate">{r.label}</div>
                      <div className="font-mono text-[10px] text-subtext truncate" title={r.note}>{r.note}</div>
                    </div>
                    <div className="relative h-4">
                      <div className="absolute inset-y-0 left-0 right-0 border-b border-dashed border-[var(--color-border)] top-1/2" />
                      <div
                        className={`absolute top-0.5 bottom-0.5 rounded-[2px] ${r.slow ? 'bg-red-400/20' : 'bg-[var(--color-border-strong)]/60'}`}
                        style={{ left: `${(start / SCALE_MS) * 100}%`, width: `${(r.ms / SCALE_MS) * 100}%` }}
                      >
                        <div
                          className={`h-full rounded-[2px] ${r.slow ? 'bg-red-400/80' : 'bg-[var(--color-accent-solid)]'}`}
                          style={{ width: `${visible * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className={`font-mono text-xs text-right tabular-nums ${r.slow ? 'text-red-300' : 'text-subtext'}`}>
                      {finished || phase === 'idle' ? `${r.ms}` : ' '}
                    </div>
                  </div>
                )
              })}
            </div>
            {running && (
              <div className="pointer-events-none absolute inset-3 grid grid-cols-[104px_minmax(0,1fr)_52px] sm:grid-cols-[120px_minmax(0,1fr)_56px] gap-2" aria-hidden>
                <div />
                <div className="relative">
                  <div className="absolute -top-1 -bottom-1 w-px bg-[var(--color-heading)]/70" style={{ left: `${Math.min(1, elapsed / SCALE_MS) * 100}%` }} />
                </div>
                <div />
              </div>
            )}
          </div>

          {/* readout */}
          <div className="flex flex-wrap items-center justify-between gap-4 mt-5">
            <div className="flex items-baseline gap-3" aria-live="polite">
              <span className="font-mono text-4xl font-semibold tabular-nums text-heading">
                {phase === 'idle' ? total.toLocaleString() : Math.round(shown).toLocaleString()}
              </span>
              <span className="font-mono text-sm text-subtext">ms</span>
              {done && saved > 0 && (
                <span className="font-mono text-sm text-[var(--color-accent-solid)]">&minus;{saved}% vs. 3,000</span>
              )}
              {phase === 'idle' && <span className="text-xs text-subtext">expected</span>}
            </div>
            <button
              type="button"
              onClick={run}
              disabled={running}
              className="px-5 py-2.5 rounded-lg text-sm font-medium bg-[var(--color-accent-solid)] text-[var(--color-on-accent)] hover:opacity-90 disabled:opacity-50 transition"
            >
              {running ? 'Waiting on the database…' : done ? 'Send again' : 'Send request'}
            </button>
          </div>
        </div>

        {/* feed + run log */}
        <div className="min-w-0">
          <div className="font-mono text-[11px] uppercase tracking-widest text-subtext mb-2">what the user sees</div>
          <div className="border border-[var(--color-border)] rounded-lg p-3 h-[318px] overflow-hidden">
            {done ? (
              <ul className="space-y-3" aria-label="Feed loaded">
                {POSTS.map((p, i) => (
                  <li key={p.handle} className="flex gap-3" style={{ animation: `feedIn 260ms ease-out ${i * 60}ms both` }}>
                    <div className="w-14 h-14 shrink-0 rounded-md bg-[var(--color-surface)] border border-[var(--color-border)]" />
                    <div className="min-w-0">
                      <div className="text-xs text-heading truncate">@{p.handle}</div>
                      <div className="text-xs text-subtext leading-snug">{p.caption}</div>
                      <div className="font-mono text-[10px] text-subtext mt-0.5">{p.likes} likes</div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="space-y-3" aria-label="Feed loading">
                {POSTS.map((p) => (
                  <li key={p.handle} className="flex gap-3">
                    <div className="w-14 h-14 shrink-0 rounded-md bg-[var(--color-surface)]" />
                    <div className="flex-1 pt-1 space-y-2">
                      <div className="h-2.5 w-1/2 rounded bg-[var(--color-surface)]" />
                      <div className="h-2.5 w-4/5 rounded bg-[var(--color-surface)]" />
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="font-mono text-[10px] text-subtext mt-2">
            {done ? `first post painted at ${firstPostAt.toLocaleString()} ms` : 'sample posts'}
          </div>

          <div className="font-mono text-[11px] uppercase tracking-widest text-subtext mt-6 mb-2">runs</div>
          {log.length === 0 ? (
            <div className="text-xs text-subtext">Nothing sent yet.</div>
          ) : (
            <ul className="space-y-1.5">
              {log.map((e) => (
                <li key={e.n} className="flex items-baseline justify-between gap-3 font-mono text-xs">
                  <span className="text-subtext truncate" title={fixSummary(e.fixes)}>
                    #{e.n} {fixSummary(e.fixes)}
                  </span>
                  <span className="text-heading tabular-nums shrink-0">{e.ms.toLocaleString()}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <p className="text-xs text-subtext leading-relaxed mt-6 max-w-3xl border-t border-[var(--color-border)] pt-4">
        The 3,000 ms and 700 ms figures are the measured before and after on production. How the 2,300 ms divides between
        the four fixes is illustrative: I shipped them together and did not time each one alone.
      </p>

      <style>{`@keyframes feedIn { from { opacity: 0; transform: translateY(4px) } to { opacity: 1; transform: none } }
@media (prefers-reduced-motion: reduce) { [aria-label="Feed loaded"] li { animation: none !important } }`}</style>
    </section>
  )
}
