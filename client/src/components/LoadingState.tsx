import type React from "react";
import { Box, Typography, Grid } from "@mui/material";
import MessageCarousel from "./MessageCarousel";
import SkeletonMessageCard from "./ui/SkeletonMessageCard";
import type { CardData } from "../types";

interface LoadingStateProps {
  cards: CardData[];
  isMobile: boolean;
}

const LoadingState: React.FC<LoadingStateProps> = ({ cards, isMobile }) => {
  return (
    <>
      <Grid item xs={12}>
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            LinkedIn Icebreaker Messages
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: "800px", mx: "auto" }}
          >
            Generando mensajes personalizados para abrir conversaciones de
            manera natural...
          </Typography>
        </Box>
      </Grid>

      <Grid item xs={12} md={6}>
        <Box
          sx={{
            border: "1px solid #e0e0e0",
            borderRadius: 2,
            overflow: "hidden",
            height: isMobile ? "350px" : "500px",
            maxHeight: "500px",
            mb: isMobile ? 4 : 0,
          }}
        >
          <MessageCarousel cards={cards} />
        </Box>
      </Grid>

      <Grid item xs={12} md={6}>
        <Box
          sx={{
            border: "1px solid #e0e0e0",
            borderRadius: 2,
            bgcolor: "white",
            p: 3,
            overflow: "auto",
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            sx={{ textAlign: "center", mb: 3 }}
          >
            Generando mensajes personalizados...
          </Typography>

          <SkeletonMessageCard />
          <SkeletonMessageCard />
          <SkeletonMessageCard />
        </Box>
      </Grid>
    </>
  );
};

export default LoadingState;
