"use client";

import type React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Tooltip,
  Link,
  Button,
  useMediaQuery,
  useTheme,
  Chip,
  Snackbar,
  Alert,
  AlertTitle,
} from "@mui/material";
import { ContentCopy, Info } from "@mui/icons-material";
import LinkedinMessageCard from "./LinkedinMessageCard";
import type { GeneratedMessage } from "../../types";
import HtmlTooltip from "./HtmlTooltip";
import { Fragment, useState } from "react";
import { getCategoryTitle } from "../../services/messageService";

interface GeneratedMessageCardProps {
  message: GeneratedMessage;
  color: string;
  title: string;
}

const GeneratedMessageCard: React.FC<GeneratedMessageCardProps> = ({
  message,
  color,
  title,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(false);

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(message.message);
    // You could add a toast notification here
    setOpen(true);

    setTimeout(() => {
      setOpen(false);
    }, 4000);
  };

  return (
    <Card sx={{ bgcolor: color, mb: 3, borderRadius: 2 }}>
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            alignItems: isMobile ? "flex-start" : "center",
            mb: 2,
            gap: isMobile ? 1 : 0,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
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
              {message.templateCategory}
            </Typography>
            <HtmlTooltip
              placement="top-start"
              title={
                <Fragment>
                  <Box
                    sx={{
                      bgcolor: "rgba(0, 0, 0, 0.8)",
                      color: "white",
                      p: 2,
                      borderRadius: 2,
                      maxWidth: "450px",
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: "bold", mb: 1 }}
                    >
                      Información de la categoria
                    </Typography>
                    <Typography variant="h5" sx={{ lineHeight: 1.5 }}>
                      {getCategoryTitle(message.templateCategory)}
                    </Typography>
                  </Box>
                </Fragment>
              }
            >
              <IconButton size="small" sx={{ ml: 1, color: "white" }}>
                <Info fontSize="small" />
              </IconButton>
            </HtmlTooltip>
          </Box>

          <Button
            variant="contained"
            startIcon={<ContentCopy />}
            onClick={handleCopyMessage}
            size={isMobile ? "small" : "medium"}
            sx={{
              bgcolor: "#1976d2",
              color: "white",
              "&:hover": {
                bgcolor: "#1565c0",
              },
              borderRadius: 4,
              px: 2,
            }}
          >
            COPIAR MENSAJE
          </Button>
        </Box>

        <LinkedinMessageCard
          message={{
            receiverName: message.receiverName,
            receiverProfilePicture: message.receiverProfilePicture,
            receiverHeadline: message.receiverHeadline,
            senderName: message.senderName,
            senderProfilePicture: message.senderProfilePicture,
            senderHeadline: message.senderHeadline,
            message: message.message,
          }}
        />

        <Box
          sx={{
            mt: 2,
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            alignItems: isMobile ? "flex-start" : "center",
            gap: isMobile ? 1 : 0,
          }}
        >
          <Box>
            <Typography variant="subtitle2" sx={{ color: "white", mb: 0.5 }}>
              FUENTES:
            </Typography>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              {message.sourcePosts.map((post, index) => (
                <Chip
                  key={index}
                  color="primary"
                  label={`Post ${index + 1}`}
                  component="a"
                  href={post}
                  target="_blank"
                  rel="noopener noreferrer"
                  clickable
                />
              ))}
            </Box>
          </Box>

          <HtmlTooltip
            placement="top-start"
            title={
              <Fragment>
                <Box
                  sx={{
                    bgcolor: "rgba(0, 0, 0, 0.8)",
                    color: "white",
                    p: 2,
                    borderRadius: 2,
                    maxWidth: "450px",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", mb: 1 }}
                  >
                    Instrucciones
                  </Typography>
                  <Typography variant="h5" sx={{ lineHeight: 1.5 }}>
                    {message.instruction}
                  </Typography>
                </Box>
              </Fragment>
            }
          >
            <Button
              variant="text"
              sx={{ color: "white" }}
              startIcon={<Info />}
              size={isMobile ? "small" : "medium"}
            >
              Instrucciones
            </Button>
          </HtmlTooltip>
        </Box>
      </CardContent>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
          <AlertTitle>Mensaje copiado al portapapeles</AlertTitle>
          {message.message.slice(0, 60) + "..."}
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default GeneratedMessageCard;
