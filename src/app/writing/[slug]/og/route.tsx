import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'
import { articles, getArticle } from '@/lib/articles'

// Branded 1200x630 header image, generated at build time. Follows Brand/brand.md (article header spec):
// category tag top left, stylized mark top right, pill + two-line title (white / primary green) + description,
// avatar + name bottom left, publication + handle bottom right. Background is always #0B0B0D.
// Optional: up to three phone mockups (left, center, right) filled with screenshots from /public.
export const dynamic = 'force-static'

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }))
}

const BG = '#0B0B0D'
const GREEN = '#CFFFDC'
const WHITE = '#F2F2F2'
const BODY = '#CFCFCF'
const MUTED = '#6B6B70'
const BORDER = '#232326'

const PHONE_W = 154
const PHONE_H = 336
const BEZEL = 7

function screenshotDataUri(publicPath: string): string | null {
  try {
    const clean = publicPath.replace(/^\/+/, '')
    if (clean.includes('..')) return null
    const buf = readFileSync(join(process.cwd(), 'public', clean))
    const type = /\.png$/i.test(clean) ? 'image/png' : 'image/jpeg'
    return `data:${type};base64,${buf.toString('base64')}`
  } catch {
    return null
  }
}

function Phone({ src, left, top, rotate }: { src: string; left: number; top: number; rotate: number }) {
  return (
    <div
      style={{
        position: 'absolute',
        left,
        top,
        display: 'flex',
        width: PHONE_W,
        height: PHONE_H,
        padding: BEZEL,
        borderRadius: 34,
        backgroundColor: '#17171A',
        border: '2px solid #3A3A3E',
        boxShadow: '0 24px 44px rgba(0,0,0,0.65)',
        transform: `rotate(${rotate}deg)`,
      }}
    >
      <div
        style={{
          display: 'flex',
          position: 'relative',
          width: PHONE_W - 2 * BEZEL - 4,
          height: PHONE_H - 2 * BEZEL - 4,
          borderRadius: 26,
          overflow: 'hidden',
          backgroundColor: '#FFFFFF',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          width={PHONE_W - 2 * BEZEL - 4}
          height={PHONE_H - 2 * BEZEL - 4}
          style={{ width: PHONE_W - 2 * BEZEL - 4, height: PHONE_H - 2 * BEZEL - 4, objectFit: 'cover' }}
        />
        <div
          style={{
            position: 'absolute',
            top: 7,
            left: (PHONE_W - 2 * BEZEL - 4 - 46) / 2,
            width: 46,
            height: 11,
            borderRadius: 8,
            backgroundColor: '#0B0B0D',
          }}
        />
      </div>
    </div>
  )
}

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) return new Response('Not found', { status: 404 })

  const [line1, line2] = article.ogLines
  const phones = (article.ogPhones ?? [])
    .slice(0, 3)
    .map(screenshotDataUri)
    .filter((p): p is string => p !== null)
  const hasPhones = phones.length > 0
  const titleSize = hasPhones ? 46 : 60

  // left, center (drawn last so it sits on top), right
  const layout = [
    { left: 0, top: 50, rotate: -7 },
    { left: 122, top: 8, rotate: 0 },
    { left: 250, top: 44, rotate: 7 },
  ]
  const order = phones.length === 3 ? [0, 2, 1] : phones.map((_, i) => i)

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          backgroundColor: BG,
          padding: 24,
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            position: 'relative',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '100%',
            height: '100%',
            border: `1px solid ${BORDER}`,
            padding: '36px 48px',
          }}
        >
          {/* phones */}
          {hasPhones && (
            <div style={{ position: 'absolute', display: 'flex', right: 40, top: 66, width: 410, height: 400 }}>
              {order.map((i) => (
                <Phone key={i} src={phones[i]} {...layout[phones.length === 3 ? i : i]} />
              ))}
            </div>
          )}

          {/* top bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', color: WHITE, fontSize: 18, fontWeight: 700, letterSpacing: 3 }}>
              BACKEND ENGINEERING
            </div>
            <div style={{ display: 'flex', fontSize: 24, fontWeight: 700, color: WHITE }}>
              <span>Muhammad Talha&nbsp;</span>
              <span style={{ color: GREEN }}>Atif</span>
              <span>();</span>
            </div>
          </div>

          {/* body */}
          <div style={{ display: 'flex', flexDirection: 'column', ...(hasPhones ? { maxWidth: 620 } : {}) }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                alignSelf: 'flex-start',
                border: `1px solid ${BORDER}`,
                borderRadius: 999,
                padding: '8px 18px',
                color: BODY,
                fontSize: 20,
                marginBottom: 24,
              }}
            >
              <div style={{ display: 'flex', width: 10, height: 10, borderRadius: 999, backgroundColor: GREEN, marginRight: 12 }} />
              {article.category}
            </div>
            <div style={{ display: 'flex', fontSize: titleSize, fontWeight: 700, lineHeight: 1.12, color: WHITE, letterSpacing: -1 }}>
              {line1}
            </div>
            <div style={{ display: 'flex', fontSize: titleSize, fontWeight: 700, lineHeight: 1.12, color: GREEN, letterSpacing: -1 }}>
              {line2}
            </div>
            {article.ogDescription && (
              <div
                style={{
                  display: 'flex',
                  marginTop: 20,
                  maxWidth: hasPhones ? 540 : 820,
                  fontSize: hasPhones ? 21 : 24,
                  lineHeight: 1.4,
                  color: BODY,
                }}
              >
                {article.ogDescription}
              </div>
            )}
          </div>

          {/* bottom bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 52,
                  height: 52,
                  borderRadius: 999,
                  border: `1px solid ${GREEN}`,
                  color: GREEN,
                  fontSize: 20,
                  fontWeight: 700,
                  marginRight: 16,
                }}
              >
                MT
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', color: WHITE, fontSize: 22, fontWeight: 700 }}>Muhammad Talha Atif</div>
                <div style={{ display: 'flex', color: MUTED, fontSize: 18 }}>Full Stack Engineer</div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <div style={{ display: 'flex', color: MUTED, fontSize: 16, letterSpacing: 2 }}>DEVWEEKENDS · BACKEND ENGINEERING</div>
              <div style={{ display: 'flex', color: MUTED, fontSize: 16 }}>@iam-talhaatif</div>
            </div>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  )
}
