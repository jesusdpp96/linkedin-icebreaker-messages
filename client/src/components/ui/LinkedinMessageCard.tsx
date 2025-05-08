"use client";

import type React from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  Divider,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import type { LinkedinMessage } from "../../types";
import Linkedin from "../../assets/linkedin.png";

interface LinkedinMessageCardProps {
  message: LinkedinMessage;
}

const LinkedinMessageCard: React.FC<LinkedinMessageCardProps> = ({
  message,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Card sx={{ bgcolor: "white", boxShadow: 2, borderRadius: 2 }}>
      <CardContent sx={{ p: isMobile ? 1.5 : 2 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            mb: 1,
          }}
        >
          <Avatar
            src={Linkedin}
            alt="LinkedIn Icon"
            sx={{
              width: isMobile ? 20 : 24,
              height: isMobile ? 20 : 24,
              mr: 1,
            }}
          />
          <Typography
            variant="subtitle2"
            fontWeight="bold"
            fontSize={isMobile ? "0.8rem" : "0.875rem"}
          >
            LinkedIn
          </Typography>
        </Box>
        {/* Receiver info */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
          <Avatar
            src={message.receiverProfilePicture}
            alt={message.receiverName}
            sx={{
              width: isMobile ? 40 : 48,
              height: isMobile ? 40 : 48,
              mr: 1.5,
            }}
          />
          <Box>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              fontSize={isMobile ? "0.9rem" : "1rem"}
            >
              {message.receiverName}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              fontSize={isMobile ? "0.7rem" : "0.75rem"}
            >
              {message.receiverHeadline}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 1.5 }} />

        {/* Sender info and message */}
        <Box sx={{ display: "flex", mt: 2, marginLeft: "40px" }}>
          <Avatar
            src={message.senderProfilePicture}
            alt={message.senderName}
            sx={{
              width: isMobile ? 32 : 40,
              height: isMobile ? 32 : 40,
              mr: 1.5,
            }}
          />
          <Stack spacing={0.5} sx={{ width: "calc(100% - 56px)" }}>
            <Typography
              variant="subtitle2"
              fontWeight="bold"
              fontSize={isMobile ? "0.8rem" : "0.875rem"}
            >
              {message.senderName}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ mb: 1 }}
              fontSize={isMobile ? "0.7rem" : "0.75rem"}
            >
              {message.senderHeadline}
            </Typography>
            <Typography
              variant="body2"
              sx={{ wordBreak: "break-word" }}
              fontSize={isMobile ? "0.8rem" : "0.875rem"}
            >
              {message.message}
            </Typography>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};

export default LinkedinMessageCard;
