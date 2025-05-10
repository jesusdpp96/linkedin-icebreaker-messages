"use client";

import { useState, useEffect, useRef } from "react";
import type { CardData } from "../types";

export const useCarousel = (cards: CardData[], autoplayInterval = 5000) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const prevSlide = () => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + cards.length) % cards.length
    );
  };

  const goToSlide = (index: number) => {
    setActiveIndex(index);
  };

  const pauseAutoplay = () => {
    setIsPaused(true);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const resumeAutoplay = () => {
    setIsPaused(false);
  };

  useEffect(() => {
    // Start autoplay when component mounts or when isPaused changes to false
    if (!isPaused && cards.length > 0) {
      intervalRef.current = setInterval(nextSlide, autoplayInterval);
    }

    // Clean up interval on unmount or when isPaused changes to true
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused, cards.length, autoplayInterval]);

  return {
    activeIndex,
    nextSlide,
    prevSlide,
    goToSlide,
    pauseAutoplay,
    resumeAutoplay,
  };
};
