"use client";

import type React from "react";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider, usePostHog } from "posthog-js/react";
import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: "/ingest",
      ui_host: "https://us.posthog.com",
      capture_pageview: false, // We capture pageviews manually
      capture_pageleave: true, // Enable pageleave capture
      debug: process.env.NODE_ENV === "development",
    });
  }, []);

  return (
    <PHProvider client={posthog}>
      <SuspendedPostHogPageView />
      {children}
    </PHProvider>
  );
}

function PostHogPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const posthog = usePostHog();

  useEffect(() => {
    if (pathname && posthog) {
      let url = window.origin + pathname;
      const search = searchParams.toString();
      if (search) {
        url += "?" + search;
      }

      // Track page view event
      posthog.capture("page_view", {
        $current_url: url,
        referrer: document.referrer || "direct",
      });

      // Track user return if they have a previous visit
      const lastVisit = localStorage.getItem("last_visit_date");
      if (lastVisit) {
        const daysSinceLastVisit = Math.floor(
          (Date.now() - Number.parseInt(lastVisit)) / (1000 * 60 * 60 * 24)
        );
        if (daysSinceLastVisit > 0) {
          posthog.capture("user_return", {
            days_since_last_visit: daysSinceLastVisit,
          });
        }
      }

      // Update last visit date
      localStorage.setItem("last_visit_date", Date.now().toString());
    }
  }, [pathname, searchParams, posthog]);

  return null;
}

function SuspendedPostHogPageView() {
  return (
    <Suspense fallback={null}>
      <PostHogPageView />
    </Suspense>
  );
}
