"use client";

import type React from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { useForm } from "../hooks/useForm";
import type { FormData } from "../types";

interface MessageFormProps {
  onSubmit: (data: FormData) => void;
}

const initialFormState: FormData = {
  senderProfileUrl: "",
  problemDescription: "",
  solutionDescription: "",
  receiverProfileUrl: "",
};

const MessageForm: React.FC<MessageFormProps> = ({ onSubmit }) => {
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
          name="senderProfileUrl"
          label="URL de perfil de LinkedIn (emisor)"
          placeholder="La url de linkedin aquí"
          variant="outlined"
          value={values.senderProfileUrl}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.senderProfileUrl && Boolean(errors.senderProfileUrl)}
          helperText={touched.senderProfileUrl && errors.senderProfileUrl}
          size="small"
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
        />

        <TextField
          fullWidth
          name="receiverProfileUrl"
          label="URL de perfil de LinkedIn (objetivo)"
          placeholder="El url de linkedin de tu objetivo aquí"
          variant="outlined"
          value={values.receiverProfileUrl}
          onChange={handleChange}
          onBlur={handleBlur}
          error={
            touched.receiverProfileUrl && Boolean(errors.receiverProfileUrl)
          }
          helperText={touched.receiverProfileUrl && errors.receiverProfileUrl}
          size="small"
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
      </Box>
    </Paper>
  );
};

export default MessageForm;
