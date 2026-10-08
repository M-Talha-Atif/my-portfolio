import { ImageResponse } from 'next/og'
import { articles, getArticle } from '@/lib/articles'

// Branded 1200x630 share image, generated at build time. Follows Brand/brand.md (article header spec):
// category tag top left, stylized mark top right, pill + two-line title (white / primary green) + description,
// avatar + name bottom left, publication + handle bottom right. Background is always #0B0B0D.
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

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) return new Response('Not found', { status: 404 })

  const [line1, line2] = article.ogLines

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
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '100%',
            height: '100%',
            border: `1px solid ${BORDER}`,
            padding: '36px 48px',
          }}
        >
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
          <div style={{ display: 'flex', flexDirection: 'column' }}>
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
            <div style={{ display: 'flex', fontSize: 68, fontWeight: 700, lineHeight: 1.12, color: WHITE, letterSpacing: -1 }}>
              {line1}
            </div>
            <div style={{ display: 'flex', fontSize: 68, fontWeight: 700, lineHeight: 1.12, color: GREEN, letterSpacing: -1 }}>
              {line2}
            </div>
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
