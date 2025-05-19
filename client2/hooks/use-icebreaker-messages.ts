import { useEffect, useState } from "react";
import { IcebreakerMessage, IcebreakerRequest } from "@/types"
import { IcebreakerMessageService } from "../services/icebreaker-message-service";

interface UseIcebreakerMessagesReturn {
  messages: IcebreakerMessage[] | null;
  loading: boolean;
  error: string | null;
  fetchMessages: (data: IcebreakerRequest) => Promise<void>;
  reset: () => void;
}
/**
 * Hook to fetch icebreaker messages
 */
export function useIcebreakerMessages(): UseIcebreakerMessagesReturn {
  const [messages, setMessages] = useState<IcebreakerMessage[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [controller, setController] = useState<{ abort: () => void } | null>(
    null
  );

  // Cleanup when component unmounts
  useEffect(() => {
    return () => {
      if (controller) {
        controller.abort();
      }
    };
  }, [controller]);

  const fetchMessages = async (data: IcebreakerRequest): Promise<void> => {
    // Cancel any previous request
    if (controller) {
      controller.abort();
    }

    setLoading(true);
    setError(null);

    const { promise, abort } =
      IcebreakerMessageService.getIcebreakerMessages(data);
    setController({ abort });

    try {
      const response = await promise;

      if (IcebreakerMessageService.isSuccessResponse(response)) {
        setMessages(response.data);
      } else {
        setError(response.name);
        setMessages(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.name : "Error desconocido");
      setMessages(null);
    } finally {
      setLoading(false);
      setController(null);
    }
  };

  const reset = () => {
    setMessages(null);
    setLoading(false);
    setError(null);
  };

  return { messages, loading, error, fetchMessages, reset };
}
