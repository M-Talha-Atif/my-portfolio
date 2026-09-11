'use client'

import React, { Suspense, useEffect, useMemo } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import posthog from 'posthog-js'
import { buildAnalyticsUrl, isAnalyticsEnabled } from '@/lib/analytics'

interface AnalyticsProviderProps {
  children: React.ReactNode
}

function PostHogPageViewTracker(): React.JSX.Element | null {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const pageUrl = useMemo(() => {
    const search = searchParams.toString()
    return buildAnalyticsUrl(pathname, search ? `?${search}` : '')
  }, [pathname, searchParams])

  useEffect(() => {
    if (!isAnalyticsEnabled()) {
      return
    }

    posthog.capture('$pageview', {
      $current_url: pageUrl,
      page_title: typeof document === 'undefined' ? undefined : document.title,
      pathname,
    })
  }, [pageUrl, pathname])

  return null
}

export default function AnalyticsProvider({
  children,
}: AnalyticsProviderProps): React.JSX.Element {
  return (
    <>
      {children}
      <Suspense fallback={null}>
        <PostHogPageViewTracker />
      </Suspense>
    </>
  )
}
