'use client'

export type AnalyticsPrimitive = string | number | boolean | null
export type AnalyticsValue = AnalyticsPrimitive | AnalyticsPrimitive[] | undefined
export type AnalyticsProperties = Record<string, AnalyticsValue>

export const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY?.trim() ?? ''
export const POSTHOG_HOST =
  process.env.NEXT_PUBLIC_POSTHOG_HOST?.trim() || 'https://us.i.posthog.com'
export const POSTHOG_SCRIPT_SRC = `${POSTHOG_HOST.replace('.i.posthog.com', '-assets.i.posthog.com')}/static/array.js`

const getPostHogClient = (): PostHogClient | undefined => {
  if (typeof window === 'undefined') {
    return undefined
  }

  return window.posthog
}

export const isAnalyticsEnabled = (): boolean => {
  return typeof window !== 'undefined' && Boolean(POSTHOG_KEY)
}

export const buildAnalyticsUrl = (pathname: string, search: string): string => {
  if (typeof window === 'undefined') {
    return `${pathname}${search}`
  }

  return `${window.location.origin}${pathname}${search}`
}

export function captureAnalyticsEvent<EventName extends string>(
  eventName: EventName,
  properties?: AnalyticsProperties,
): void {
  if (!isAnalyticsEnabled()) {
    return
  }

  getPostHogClient()?.capture?.(eventName, properties)
}

export const identifyAnalyticsUser = (
  distinctId: string,
  properties?: AnalyticsProperties,
): void => {
  if (!isAnalyticsEnabled()) {
    return
  }

  getPostHogClient()?.identify?.(distinctId, properties)
}

export const resetAnalytics = (): void => {
  getPostHogClient()?.reset?.()
}

