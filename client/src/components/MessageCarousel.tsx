"use client";

import type React from "react";
import { Box, IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import CategoryCard from "./ui/CategoryCard";
import { useCarousel } from "../hooks/useCarousel";
import type { CardData } from "../types";

interface MessageCarouselProps {
  cards: CardData[];
}

const MessageCarousel: React.FC<MessageCarouselProps> = ({ cards }) => {
  const { activeIndex, nextSlide, prevSlide, pauseAutoplay, resumeAutoplay } =
    useCarousel(cards);

  return (
    <Box
      sx={{
        position: "relative",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
      onMouseEnter={pauseAutoplay}
      onMouseLeave={resumeAutoplay}
    >
      <IconButton
        onClick={prevSlide}
        sx={{
          position: "absolute",
          left: 10,
          zIndex: 2,
          color: "text.secondary",
          bgcolor: "rgba(255,255,255,0.7)",
          "&:hover": { bgcolor: "rgba(255,255,255,0.9)" },
        }}
      >
        <ArrowBackIos />
      </IconButton>

      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "100%",
          position: "relative",
        }}
      >
        {cards.map((card, index) => {
          // Calculate if this card is active, previous, or next
          const isActive = index === activeIndex;
          const isPrev =
            index === (activeIndex - 1 + cards.length) % cards.length;
          const isNext = index === (activeIndex + 1) % cards.length;

          // Only render active, previous and next cards for performance
          if (!isActive && !isPrev && !isNext) return null;

          return (
            <Box
              key={index}
              sx={{
                position: "absolute",
                width: "100%",
                height: "100%",
                left: 0,
                right: 0,
                transform: isActive
                  ? "translateX(0) scale(1)"
                  : isPrev
                  ? "translateX(-70%) scale(0.85)"
                  : "translateX(70%) scale(0.85)",
                opacity: isActive ? 1 : 0.6,
                zIndex: isActive ? 1 : 0,
                transition: "all 0.5s ease",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box sx={{ width: isActive ? "90%" : "80%", height: "90%" }}>
                <CategoryCard data={card} isActive={isActive} />
              </Box>
            </Box>
          );
        })}
      </Box>

      <IconButton
        onClick={nextSlide}
        sx={{
          position: "absolute",
          right: 10,
          zIndex: 2,
          color: "text.secondary",
          bgcolor: "rgba(255,255,255,0.7)",
          "&:hover": { bgcolor: "rgba(255,255,255,0.9)" },
        }}
      >
        <ArrowForwardIos />
      </IconButton>
    </Box>
  );
};

export default MessageCarousel;
