/**
 * Analytics utility functions
 * Provides helper functions for tracking analytics events
 */

import posthog from "posthog-js";

/**
 * Track a user action with PostHog
 * @param eventName The name of the event to track
 * @param properties Optional properties to include with the event
 */
export function trackEvent(
  eventName: string,
  properties?: Record<string, any>
) {
  if (typeof posthog !== "undefined") {
    posthog.capture(eventName, properties);
  }
}

/**
 * Track a page view with PostHog
 * @param url The URL of the page being viewed
 * @param referrer The referrer URL
 */
export function trackPageView(url: string, referrer?: string) {
  trackEvent("page_view", {
    $current_url: url,
    referrer: referrer || document.referrer || "direct",
  });
}

/**
 * Track a form submission with PostHog
 * @param formName The name of the form being submitted
 * @param isComplete Whether all form fields are complete
 * @param properties Additional properties to include with the event
 */
export function trackFormSubmission(
  formName: string,
  isComplete: boolean,
  properties?: Record<string, any>
) {
  trackEvent("form_submission", {
    form_name: formName,
    form_complete: isComplete,
    ...properties,
  });
}

/**
 * Track a button click with PostHog
 * @param buttonName The name or text of the button
 * @param location The location of the button on the page
 * @param properties Additional properties to include with the event
 */
export function trackButtonClick(
  buttonName: string,
  location: string,
  properties?: Record<string, any>
) {
  trackEvent("button_click", {
    button_name: buttonName,
    button_location: location,
    ...properties,
  });
}

/**
 * Track an error with PostHog
 * @param errorType The type of error
 * @param errorMessage The error message
 * @param properties Additional properties to include with the event
 */
export function trackError(
  errorType: string,
  errorMessage: string,
  properties?: Record<string, any>
) {
  trackEvent("error", {
    error_type: errorType,
    error_message: errorMessage,
    ...properties,
  });
}

/**
 * Track a feature usage with PostHog
 * @param featureName The name of the feature being used
 * @param properties Additional properties to include with the event
 */
export function trackFeatureUsage(
  featureName: string,
  properties?: Record<string, any>
) {
  trackEvent("feature_usage", {
    feature_name: featureName,
    ...properties,
  });
}

/**
 * Track a user return with PostHog
 * @param daysSinceLastVisit The number of days since the user's last visit
 */
export function trackUserReturn(daysSinceLastVisit: number) {
  trackEvent("user_return", {
    days_since_last_visit: daysSinceLastVisit,
  });
}

/**
 * Track generation time with PostHog
 * @param durationMs The duration of the generation in milliseconds
 */
export function trackGenerationTime(durationMs: number) {
  trackEvent("generation_time", {
    duration_ms: durationMs,
  });
}
