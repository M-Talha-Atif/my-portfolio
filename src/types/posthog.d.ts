declare global {
  type PostHogInitOptions = {
    api_host?: string
    autocapture?: boolean
    capture_pageview?: boolean
    disable_session_recording?: boolean
    persistence?: 'localStorage+cookie' | 'localStorage' | 'cookie' | 'memory'
    person_profiles?: 'identified_only' | 'always' | 'never'
  }

  type PostHogClient = {
    capture?: (eventName: string, properties?: Record<string, unknown>) => void
    identify?: (distinctId: string, properties?: Record<string, unknown>) => void
    init: (apiKey: string, options?: PostHogInitOptions) => void
    reset?: () => void
  }

  interface Window {
    __posthogInitialized?: boolean
    posthog?: PostHogClient
  }
}

export {}


