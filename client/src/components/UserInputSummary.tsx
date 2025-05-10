"use client";

import type React from "react";
import {
  Box,
  Typography,
  Paper,
  Link,
  Button,
  Stack,
  Divider,
} from "@mui/material";
import type { FormData } from "../types";

interface UserInputSummaryProps {
  data: FormData;
  onReset: () => void;
  onResetWithData: () => void;
}

const UserInputSummary: React.FC<UserInputSummaryProps> = ({
  data,
  onReset,
  onResetWithData,
}) => {
  return (
    <Paper
      elevation={0}
      sx={{ p: { xs: 2, sm: 3 }, display: "flex", flexDirection: "column" }}
    >
      <Typography variant="h6" gutterBottom>
        Información proporcionada
      </Typography>

      <Box sx={{ flex: 1 }}>
        <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
          Enlace tu LinkedIn
        </Typography>
        <Link
          href={data.senderUrl}
          target="_blank"
          rel="noopener noreferrer"
          sx={{ display: "block", mb: 2, wordBreak: "break-all" }}
        >
          {data.senderUrl}
        </Link>

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
          El problema que resuelves:
        </Typography>
        <Paper
          variant="outlined"
          sx={{ p: 2, mb: 2, bgcolor: "#f5f5f5", borderRadius: 1 }}
        >
          <Typography variant="body2">{data.problemDescription}</Typography>
        </Paper>

        <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
          La solución que ofertas:
        </Typography>
        <Paper
          variant="outlined"
          sx={{ p: 2, mb: 2, bgcolor: "#f5f5f5", borderRadius: 1 }}
        >
          <Typography variant="body2">{data.solutionDescription}</Typography>
        </Paper>

        <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
          El url de LinkedIn de tu objetivo:
        </Typography>
        <Link
          href={data.receiverUrl}
          target="_blank"
          rel="noopener noreferrer"
          sx={{ display: "block", mb: 2, wordBreak: "break-all" }}
        >
          {data.receiverUrl}
        </Link>
      </Box>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mt: 3 }}>
        <Button variant="outlined" fullWidth onClick={onResetWithData}>
          Generar nuevos mensajes
        </Button>
        <Button variant="contained" fullWidth onClick={onReset}>
          Comenzar de nuevo
        </Button>
      </Stack>
    </Paper>
  );
};

export default UserInputSummary;
