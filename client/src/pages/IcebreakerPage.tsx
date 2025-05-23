"use client";

import type React from "react";
import { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Box,
  useTheme,
  useMediaQuery,
  Snackbar,
  Alert,
  AlertTitle,
} from "@mui/material";
import MessageCarousel from "../components/MessageCarousel";
import MessageForm from "../components/MessageForm";
import LoadingState from "../components/LoadingState";
import UserInputSummary from "../components/UserInputSummary";
import GeneratedMessages from "../components/GeneratedMessages";
import { AppState, type FormData, type ShowMessages } from "../types";
import { getSampleCards } from "../services/messageService";
import { Layout } from "../components/Layout";
import { PromoBanner } from "../components/PromoBanner";
import { useIcebreakerMessages } from "../hooks/useIcebreakerMessages";
import { getErrorMessage } from "../services/errorMessages";

const IcebreakerPage: React.FC = () => {
  const { messages, loading, error, fetchMessages, reset } =
    useIcebreakerMessages();
  const [appState, setAppState] = useState<AppState>(AppState.INITIAL);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [open, setOpen] = useState(false);

  const [generatedMessages, setGeneratedMessages] =
    useState<ShowMessages | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const sampleCards = getSampleCards();

  const handleFormSubmit = async (data: FormData) => {
    try {
      reset();
      setFormData(data);
      await fetchMessages(data);
    } catch (err) {
      console.error("Error generating messages:", err);
    }
  };

  const handleReset = () => {
    setAppState(AppState.INITIAL);
    setFormData(null);
    setGeneratedMessages(null);
    reset();
  };

  const handleResetWithData = () => {
    if (formData) {
      handleFormSubmit(formData);
    }
  };

  const renderContent = () => {
    switch (appState) {
      case AppState.INITIAL:
        return (
          <>
            <Grid item xs={12}>
              <Box sx={{ textAlign: "center", mb: 4 }}>
                <Typography
                  variant={isMobile ? "h4" : "h3"}
                  color="text.secondary"
                  sx={{ maxWidth: "1200px", mx: "auto" }}
                >
                  Conecta en LinkedIn con mensajes irresistibles, humanos y
                  personalizados en segundos. ¡Rompe el hielo como un
                  profesional!
                </Typography>

                <Typography
                  variant={isMobile ? "h6" : "h5"}
                  color="primary.main"
                  sx={{
                    maxWidth: "1200px",
                    mx: "auto",
                    mt: 2,
                    bgcolor: "rgba(0, 0, 0, 0.05)",
                    p: 2,
                    borderRadius: 1,
                  }}
                >
                  Con IA, analizamos tu perfil y el de tu prospecto en LinkedIn,
                  entendemos tu estilo, tu propuesta y generamos mensajes
                  personalizados que abren conversaciones reales.
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  border: "1px solid #e0e0e0",
                  borderRadius: 2,
                  overflow: "hidden",
                  height: "500px",
                  maxHeight: "500px",
                  mb: isMobile ? 4 : 0,
                }}
              >
                <MessageCarousel cards={sampleCards} />
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  border: "1px solid #e0e0e0",
                  borderRadius: 2,
                  bgcolor: "white",
                  overflow: "auto",
                }}
              >
                <PromoBanner />
                <MessageForm
                  onSubmit={handleFormSubmit}
                  lastError={error ? getErrorMessage(error) : null}
                />
              </Box>
            </Grid>
          </>
        );

      case AppState.LOADING:
        return <LoadingState cards={sampleCards} isMobile={isMobile} />;

      case AppState.RESPONSE:
        return (
          <>
            <Grid item xs={12}>
              <Box sx={{ textAlign: "center", mb: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                  RESULTADO
                </Typography>
                <Typography
                  variant="h6"
                  color="text.secondary"
                  sx={{ maxWidth: "800px", mx: "auto" }}
                >
                  Hemos generado 3 mensajes personalizados para tu objetivo.
                  Elige el que mejor se adapte a tu estilo.
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={5}>
              <Box
                sx={{
                  border: "1px solid #e0e0e0",
                  borderRadius: 2,
                  bgcolor: "white",
                  overflow: "auto",
                  mb: isMobile ? 4 : 0,
                }}
              >
                {formData && (
                  <UserInputSummary
                    data={formData}
                    onReset={handleReset}
                    onResetWithData={handleResetWithData}
                  />
                )}
              </Box>
            </Grid>

            <Grid item xs={12} md={7}>
              <Box
                sx={{
                  border: "1px solid #e0e0e0",
                  borderRadius: 2,
                  bgcolor: "white",
                  overflow: "auto",
                }}
              >
                {generatedMessages && (
                  <GeneratedMessages messages={generatedMessages.messages} />
                )}
              </Box>
            </Grid>
          </>
        );

      default:
        return null;
    }
  };

  useEffect(() => {
    if (loading) {
      setAppState(AppState.LOADING);
      return;
    }
    if (error) {
      setOpen(true);
      setAppState(AppState.INITIAL);
      return;
    }
    if (messages) {
      setGeneratedMessages({
        messages: messages,
      });
      setAppState(AppState.RESPONSE);
    }
  }, [loading, error, messages]);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        if (error) {
          setOpen(false);
        }
      }, 3_000); // 8 seconds
    }
  }, [open]);

  return (
    <Layout>
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              LinkedIn Icebreaker Messages
            </Typography>
          </Toolbar>
        </AppBar>

        <Container maxWidth="xl" sx={{ py: 4, flex: 1 }}>
          <Grid container spacing={4}>
            {renderContent()}
          </Grid>
        </Container>
        <Snackbar
          open={open}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert severity="error" variant="filled" sx={{ width: "100%" }}>
            <AlertTitle>Error</AlertTitle>
            {getErrorMessage(error)}
          </Alert>
        </Snackbar>
      </Box>
    </Layout>
  );
};

export default IcebreakerPage;
