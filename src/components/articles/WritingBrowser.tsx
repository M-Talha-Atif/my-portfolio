'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { Search, X } from 'lucide-react'
import ArticleCard from './ArticleCard'
import type { ArticleBrowserItem } from '@/lib/articles'

type Sort = 'newest' | 'oldest' | 'shortest' | 'longest'

const SORTS: { value: Sort; label: string }[] = [
  { value: 'newest', label: 'Newest first' },
  { value: 'oldest', label: 'Oldest first' },
  { value: 'shortest', label: 'Shortest read' },
  { value: 'longest', label: 'Longest read' },
]
const TAGS_SHOWN = 8

const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[’‘]/g, "'")

function chipClass(active: boolean) {
  return `rounded-full border px-3 py-1.5 text-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-solid)] ${
    active
      ? 'border-[var(--color-accent-solid)] bg-[var(--color-accent-solid)] font-semibold text-[var(--color-on-accent)]'
      : 'border-[var(--color-border-strong)] bg-[var(--color-surface)] text-subtext hover:border-[var(--color-accent-solid)] hover:text-heading'
  }`
}

export default function WritingBrowser({ items }: { items: ArticleBrowserItem[] }) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<string | null>(null)
  const [tag, setTag] = useState<string | null>(null)
  const [sort, setSort] = useState<Sort>('newest')
  const [showAllTags, setShowAllTags] = useState(false)
  const [ready, setReady] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)

  const categories = useMemo(() => {
    const counts = new Map<string, number>()
    items.forEach((i) => counts.set(i.category, (counts.get(i.category) ?? 0) + 1))
    return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
  }, [items])

  const topTags = useMemo(() => {
    const counts = new Map<string, number>()
    items.forEach((i) => i.tags.forEach((t) => counts.set(t, (counts.get(t) ?? 0) + 1)))
    return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).map(([t]) => t)
  }, [items])

  // Restore state from the URL once, so a filtered view can be shared or reloaded.
  // Deferred by a tick so it runs after hydration (the server HTML has no filters applied).
  useEffect(() => {
    const id = window.setTimeout(() => {
      const params = new URLSearchParams(window.location.search)
      const q = params.get('q')
      const c = params.get('category')
      const t = params.get('tag')
      const s = params.get('sort') as Sort | null
      if (q) setQuery(q)
      if (c && items.some((i) => i.category === c)) setCategory(c)
      if (t && items.some((i) => i.tags.includes(t))) {
        setTag(t)
        if (!topTags.slice(0, TAGS_SHOWN).includes(t)) setShowAllTags(true)
      }
      if (s && SORTS.some((x) => x.value === s)) setSort(s)
      setReady(true)
    }, 0)
    return () => window.clearTimeout(id)
  }, [items, topTags])

  // Keep the URL in sync (replace, so Back still leaves the page).
  useEffect(() => {
    if (!ready) return
    const params = new URLSearchParams()
    if (query.trim()) params.set('q', query.trim())
    if (category) params.set('category', category)
    if (tag) params.set('tag', tag)
    if (sort !== 'newest') params.set('sort', sort)
    const qs = params.toString()
    window.history.replaceState(null, '', qs ? `?${qs}` : window.location.pathname)
  }, [query, category, tag, sort, ready])

  // "/" focuses the search box, Escape clears it.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null
      const typing = !!el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable)
      if (e.key === '/' && !typing && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault()
        searchRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const indexed = useMemo(() => items.map((i) => ({ item: i, haystack: normalize(i.searchText) })), [items])

  const words = useMemo(() => normalize(query).split(/\s+/).filter(Boolean), [query])
  const rawWords = useMemo(() => query.trim().split(/\s+/).filter(Boolean), [query])

  const results = useMemo(() => {
    const list = indexed
      .filter(({ item, haystack }) => {
        if (category && item.category !== category) return false
        if (tag && !item.tags.includes(tag)) return false
        return words.every((w) => haystack.includes(w))
      })
      .map(({ item }) => item)
    const by: Record<Sort, (a: ArticleBrowserItem, b: ArticleBrowserItem) => number> = {
      newest: (a, b) => b.date.localeCompare(a.date),
      oldest: (a, b) => a.date.localeCompare(b.date),
      shortest: (a, b) => a.readingMinutes - b.readingMinutes || b.date.localeCompare(a.date),
      longest: (a, b) => b.readingMinutes - a.readingMinutes || b.date.localeCompare(a.date),
    }
    return list.sort(by[sort])
  }, [indexed, words, category, tag, sort])

  const filtersActive = Boolean(query.trim() || category || tag || sort !== 'newest')
  const visibleTags = showAllTags ? topTags : topTags.slice(0, TAGS_SHOWN)
  const reset = () => {
    setQuery('')
    setCategory(null)
    setTag(null)
    setSort('newest')
  }

  return (
    <div>
      {/* Search + sort */}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-subtext" aria-hidden="true" />
          <input
            ref={searchRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                setQuery('')
                e.currentTarget.blur()
              }
            }}
            placeholder="Search articles, topics, tags…"
            aria-label="Search articles"
            autoComplete="off"
            spellCheck={false}
            className="glass w-full py-3 pl-11 pr-24 text-base text-heading placeholder:text-subtext focus:border-[var(--color-accent-solid)] focus:outline-none [&::-webkit-search-cancel-button]:hidden"
          />
          {query ? (
            <button
              type="button"
              onClick={() => {
                setQuery('')
                searchRef.current?.focus()
              }}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full text-subtext transition hover:bg-[var(--color-border)] hover:text-heading"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          ) : (
            <kbd
              aria-hidden="true"
              className="pointer-events-none absolute right-4 top-1/2 hidden -translate-y-1/2 rounded-md border border-[var(--color-border-strong)] px-2 py-0.5 text-xs text-subtext sm:block"
            >
              /
            </kbd>
          )}
        </div>

        <label className="flex items-center gap-2 text-sm text-subtext">
          <span className="sr-only sm:not-sr-only">Sort</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="glass cursor-pointer py-3 pl-4 pr-8 text-sm text-heading focus:border-[var(--color-accent-solid)] focus:outline-none"
            aria-label="Sort articles"
          >
            {SORTS.map((s) => (
              <option key={s.value} value={s.value} className="bg-[var(--color-bg)] text-[var(--color-text)]">
                {s.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Category filter */}
      <div className="mb-3 flex flex-wrap items-center gap-2" role="group" aria-label="Filter by category">
        <button type="button" onClick={() => setCategory(null)} aria-pressed={category === null} className={chipClass(category === null)}>
          All <span className="opacity-70">{items.length}</span>
        </button>
        {categories.map(([name, count]) => (
          <button
            key={name}
            type="button"
            onClick={() => setCategory(category === name ? null : name)}
            aria-pressed={category === name}
            className={chipClass(category === name)}
          >
            {name} <span className="opacity-70">{count}</span>
          </button>
        ))}
      </div>

      {/* Tag filter */}
      <div className="mb-6 flex flex-wrap items-center gap-2" role="group" aria-label="Filter by tag">
        <span className="mr-1 text-xs font-semibold uppercase tracking-widest text-subtext">Tags</span>
        {visibleTags.map((name) => (
          <button
            key={name}
            type="button"
            onClick={() => setTag(tag === name ? null : name)}
            aria-pressed={tag === name}
            className={chipClass(tag === name)}
          >
            {name}
          </button>
        ))}
        {topTags.length > TAGS_SHOWN && (
          <button
            type="button"
            onClick={() => setShowAllTags((v) => !v)}
            className="rounded-full px-3 py-1.5 text-sm text-subtext underline underline-offset-4 transition hover:text-[var(--color-accent-solid)]"
          >
            {showAllTags ? 'Show fewer' : `Show all ${topTags.length}`}
          </button>
        )}
      </div>

      {/* Status line */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 text-sm text-subtext">
        <p aria-live="polite">
          {results.length === items.length && !filtersActive
            ? `${items.length} articles`
            : `Showing ${results.length} of ${items.length} article${items.length === 1 ? '' : 's'}`}
          {query.trim() && (
            <>
              {' '}
              for <span className="font-medium text-heading">“{query.trim()}”</span>
            </>
          )}
        </p>
        {filtersActive && (
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border-strong)] px-3 py-1.5 text-sm text-heading transition hover:border-[var(--color-accent-solid)] hover:text-[var(--color-accent-solid)]"
          >
            <X className="h-3.5 w-3.5" aria-hidden="true" /> Clear all
          </button>
        )}
      </div>

      {/* Results */}
      {results.length > 0 ? (
        <section aria-label="Articles" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {results.map((article) => (
            <ArticleCard key={article.slug} article={article} highlight={rawWords} />
          ))}
        </section>
      ) : (
        <div className="glass mx-auto max-w-xl p-10 text-center" role="status">
          <p className="text-lg font-semibold text-heading">No articles match.</p>
          <p className="mt-2 text-subtext">Try a different word, or remove a filter.</p>
          <button
            type="button"
            onClick={reset}
            className="mt-5 rounded-full bg-[var(--color-accent-solid)] px-5 py-2.5 text-sm font-semibold text-[var(--color-on-accent)] transition hover:opacity-90"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  )
}
