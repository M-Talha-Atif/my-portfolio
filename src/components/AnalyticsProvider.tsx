'use client'

import React, { Suspense, useEffect, useMemo, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import {
  buildAnalyticsUrl,
  captureAnalyticsEvent,
  isAnalyticsEnabled,
  POSTHOG_HOST,
  POSTHOG_KEY,
  POSTHOG_SCRIPT_SRC,
} from '@/lib/analytics'

interface AnalyticsProviderProps {
  children: React.ReactNode
}

const initializePostHog = (): boolean => {
  if (typeof window === 'undefined' || !POSTHOG_KEY) {
    return false
  }

  if (!window.posthog || window.__posthogInitialized) {
    return Boolean(window.__posthogInitialized)
  }

  window.posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    autocapture: false,
    capture_pageview: false,
    disable_session_recording: true,
    persistence: 'localStorage+cookie',
    person_profiles: 'identified_only',
  })

  window.__posthogInitialized = true
  return true
}

const loadPostHog = async (): Promise<boolean> => {
  if (typeof window === 'undefined' || !POSTHOG_KEY) {
    return false
  }

  if (window.__posthogInitialized) {
    return true
  }

  if (window.posthog) {
    return initializePostHog()
  }

  await new Promise<void>((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[data-posthog-script="true"]',
    )

    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(), { once: true })
      existingScript.addEventListener(
        'error',
        () => reject(new Error('Failed to load PostHog script.')),
        { once: true },
      )
      return
    }

    const script = document.createElement('script')
    script.src = POSTHOG_SCRIPT_SRC
    script.async = true
    script.dataset.posthogScript = 'true'
    script.addEventListener('load', () => resolve(), { once: true })
    script.addEventListener(
      'error',
      () => reject(new Error('Failed to load PostHog script.')),
      { once: true },
    )

    document.head.appendChild(script)
  })

  return initializePostHog()
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

    captureAnalyticsEvent('$pageview', {
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
  const [isReady, setIsReady] = useState<boolean>(() => !POSTHOG_KEY)

  useEffect(() => {
    if (!POSTHOG_KEY) {
      return
    }

    let isMounted = true

    void loadPostHog()
      .then((loaded) => {
        if (isMounted && loaded) {
          setIsReady(true)
        }
      })
      .catch((error: unknown) => {
        if (process.env.NODE_ENV !== 'production') {
          console.error('PostHog failed to initialize.', error)
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <>
      {children}
      {isReady ? (
        <Suspense fallback={null}>
          <PostHogPageViewTracker />
        </Suspense>
      ) : null}
    </>
  )
}

