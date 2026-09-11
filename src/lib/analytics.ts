'use client'

import posthog from 'posthog-js'

export type AnalyticsPrimitive = string | number | boolean | null
export type AnalyticsValue = AnalyticsPrimitive | AnalyticsPrimitive[] | undefined
export type AnalyticsProperties = Record<string, AnalyticsValue>

export const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN?.trim() ?? ''
export const POSTHOG_HOST =
  process.env.NEXT_PUBLIC_POSTHOG_HOST?.trim() || 'https://us.i.posthog.com'

export const isAnalyticsEnabled = (): boolean => {
  return Boolean(POSTHOG_KEY)
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

  posthog.capture(eventName, properties)
}

export const identifyAnalyticsUser = (
  distinctId: string,
  properties?: AnalyticsProperties,
): void => {
  if (!isAnalyticsEnabled()) {
    return
  }

  posthog.identify(distinctId, properties)
}

export const resetAnalytics = (): void => {
  posthog.reset()
}
