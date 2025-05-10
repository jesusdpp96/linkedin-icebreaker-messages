"use client";

import type React from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { useForm } from "../hooks/useForm";
import type { FormData } from "../types";

interface MessageFormProps {
  onSubmit: (data: FormData) => void;
  lastError?: string | null;
}

const initialFormState: FormData = {
  senderUrl: "",
  problemDescription: "",
  solutionDescription: "",
  receiverUrl: "",
};

const MessageForm: React.FC<MessageFormProps> = ({ onSubmit, lastError }) => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateForm,
    isFormValid,
  } = useForm(initialFormState);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(values);
    }
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      elevation={0}
      sx={{
        p: { xs: 2, sm: 3 },
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
        <TextField
          fullWidth
          name="senderUrl"
          label="URL de perfil de LinkedIn (emisor)"
          placeholder="La url de linkedin aquí"
          variant="outlined"
          value={values.senderUrl}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.senderUrl && Boolean(errors.senderUrl)}
          helperText={touched.senderUrl && errors.senderUrl}
          size="small"
          InputProps={{
            sx: {
              "& .MuiInputBase-input": {
                overflow: "hidden",
                resize: "vertical",
              },
            },
          }}
        />

        <TextField
          fullWidth
          name="problemDescription"
          label="Problema que resuelves"
          placeholder="El problema que resuelves aquí"
          variant="outlined"
          multiline
          rows={2}
          value={values.problemDescription}
          onChange={handleChange}
          onBlur={handleBlur}
          error={
            touched.problemDescription && Boolean(errors.problemDescription)
          }
          helperText={touched.problemDescription && errors.problemDescription}
          size="small"
          InputProps={{
            sx: {
              "& .MuiInputBase-input": {
                overflow: "hidden",
                resize: "vertical",
              },
            },
          }}
        />

        <TextField
          fullWidth
          name="solutionDescription"
          label="Solución que ofreces"
          placeholder="La solución que ofertas aquí"
          variant="outlined"
          multiline
          rows={2}
          value={values.solutionDescription}
          onChange={handleChange}
          onBlur={handleBlur}
          error={
            touched.solutionDescription && Boolean(errors.solutionDescription)
          }
          helperText={touched.solutionDescription && errors.solutionDescription}
          size="small"
          InputProps={{
            sx: {
              "& .MuiInputBase-input": {
                overflow: "hidden",
                resize: "vertical",
              },
            },
          }}
        />

        <TextField
          fullWidth
          name="receiverUrl"
          label="URL de perfil de LinkedIn (objetivo)"
          placeholder="El url de linkedin de tu objetivo aquí"
          variant="outlined"
          value={values.receiverUrl}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.receiverUrl && Boolean(errors.receiverUrl)}
          helperText={touched.receiverUrl && errors.receiverUrl}
          size="small"
          InputProps={{
            sx: {
              "& .MuiInputBase-input": {
                overflow: "hidden",
                resize: "vertical",
              },
            },
          }}
        />
      </Box>

      <Box sx={{ mt: 3, textAlign: "center" }}>
        <Button
          type="submit"
          variant="contained"
          size="large"
          fullWidth
          disabled={!isFormValid()}
          sx={{
            py: 1.5,
            bgcolor: "#1976d2",
            "&:hover": {
              bgcolor: "#1565c0",
            },
          }}
        >
          GENERAR MENSAJES
        </Button>

        <Typography variant="body2" color="primary" sx={{ mt: 1 }}>
          Se van a generar las 3 mejores opciones de mensajes personalizados
        </Typography>
        {lastError && (
          <Typography
            variant="body2"
            style={{ marginTop: "16px" }}
            color="error"
            sx={{ mt: 1 }}
          >
            {lastError}
          </Typography>
        )}
      </Box>
    </Paper>
  );
};

export default MessageForm;
