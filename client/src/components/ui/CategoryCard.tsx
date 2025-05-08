import type React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import LinkedinMessageCard from "./LinkedinMessageCard";
import type { CardData } from "../../types";

interface CategoryCardProps {
  data: CardData;
  isActive?: boolean;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  data,
  isActive = false,
}) => {
  return (
    <Card
      sx={{
        bgcolor: data.cardColor,
        height: "100%",
        width: "100%",
        transform: isActive ? "scale(1)" : "scale(0.95)",
        opacity: isActive ? 1 : 0.8,
        transition: "all 0.3s ease",
        boxShadow: isActive ? 6 : 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent sx={{ flex: 1, p: 3 }}>
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="overline"
            sx={{
              bgcolor: "rgba(255,255,255,0.2)",
              px: 1.5,
              py: 0.5,
              borderRadius: 1,
              display: "inline-block",
              fontWeight: "bold",
              color: "white",
            }}
          >
            {data.messageCategory}
          </Typography>
          <Typography
            variant="h6"
            sx={{ mt: 1.5, color: "white", fontWeight: "bold" }}
          >
            {data.titleCategory}
          </Typography>
        </Box>

        <Box sx={{ mt: 2, height: "calc(100% - 80px)" }}>
          <LinkedinMessageCard message={data.linkedinSimulationMessage} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
