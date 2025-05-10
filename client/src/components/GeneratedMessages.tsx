import type React from "react";
import { Box, Typography } from "@mui/material";
import GeneratedMessageCard from "./ui/GeneratedMessageCard";
import type { GeneratedMessage } from "../types";
import { getCategoryColor, getCategoryTitle } from "../services/messageService";

interface GeneratedMessagesProps {
  messages: GeneratedMessage[];
}

const GeneratedMessages: React.FC<GeneratedMessagesProps> = ({ messages }) => {
  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
        Mensajes generados
      </Typography>

      <Box sx={{ mt: 2 }}>
        {messages.map((message, index) => (
          <GeneratedMessageCard
            key={index}
            message={message}
            color={getCategoryColor(message.templateCategory)}
            title={getCategoryTitle(message.templateCategory)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default GeneratedMessages;
