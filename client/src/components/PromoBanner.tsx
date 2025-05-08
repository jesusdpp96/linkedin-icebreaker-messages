import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

const getRandomIncrement = () => Math.floor(Math.random() * 3); // between 0 and 2

export const PromoBanner = () => {
  const [count, setCount] = useState(128); // initial number, tweak as needed

  useEffect(() => {
    const interval = setInterval(() => {
      const increments = Math.random() > 0.5 ? getRandomIncrement() + 1 : 1; // sometimes 3, sometimes 1
      setCount((prev) => prev + increments);
    }, Math.random() * 2000 + 3000); // update every 1–5 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const flyingFire = document.createElement("div");
    flyingFire.textContent = "🔥";
    flyingFire.style.position = "absolute";
    flyingFire.style.fontSize = "2rem";
    flyingFire.style.animation = "fly 2s ease-out forwards";
    flyingFire.style.pointerEvents = "none";
    flyingFire.style.left = `${Math.random() * 100}%`;
    flyingFire.style.top = "100%";

    const keyframes = `
      @keyframes fly {
        0% {
          transform: translateY(0);
          opacity: 1;
        }
        100% {
          transform: translateY(-200px);
          opacity: 0;
        }
      }
    `;

    const styleSheet = document.styleSheets[0];
    styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

    document.body.appendChild(flyingFire);

    setTimeout(() => {
      document.body.removeChild(flyingFire);
    }, 2000);
  }, [count]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        bgcolor: "#f5f5f5",
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        px: 3,
        py: 2,
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      <Box sx={{ flex: 1, textAlign: "center" }}>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Pruébalo ahora mismo.
        </Typography>
        <Typography
          variant="h6"
          color="warning.main"
          sx={{ fontWeight: 400, mt: 1 }}
        >
          ¡Las primeras 3 generaciones son gratis!
        </Typography>
      </Box>
      <Box
        sx={{
          minWidth: 120,
          textAlign: "center",
          bgcolor: "#fff3e0",
          p: 1,
          borderRadius: 2,
          fontWeight: "bold",
          boxShadow: "inset 0 0 5px rgba(0,0,0,0.1)",
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", fontSize: "2rem", lineHeight: 1 }}
        >
          🔥 {count}
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontWeight: "normal", fontSize: "1rem", mt: 0.5 }}
        >
          generando...
        </Typography>
      </Box>
    </Box>
  );
};
