import {
  IcebreakerRequest,
  IcebreakerResponse,
  IcebreakerSuccessResponse,
} from "@/types";

/**
 * Service for interacting with the icebreaker messages API
 */
export class IcebreakerMessageService {
  /**
   * Fetch icebreaker messages from the API
   * @param requestData - The data to send to the API
   * @returns A promise with the response and an abort controller
   */
  static getIcebreakerMessages(requestData: IcebreakerRequest): {
    promise: Promise<IcebreakerResponse>;
    abort: () => void;
  } {
    const controller = new AbortController();
    const { signal } = controller;

    const promise = new Promise<IcebreakerResponse>(async (resolve, reject) => {

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
      const endpoint = `${apiUrl}/icebreaker-messages`;

      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
          signal,
        });

        const data = await response.json();

        if (!response.ok) {
          const newError = new Error(
            data.message || "Error desconocido en la API"
          );
          newError.name = data.name || "unexpected_error";
          throw newError;
        }

        resolve(data as IcebreakerResponse);
      } catch (error) {
        // Handle AbortError separately
        if (error instanceof DOMException && error.name === "AbortError") {
          reject(new Error("Solicitud cancelada"));
          return;
        }

        reject(error instanceof Error ? error : new Error("Error desconocido"));
      }
    });

    return {
      promise,
      abort: () => controller.abort(),
    };
  }

  /**
   * Check if the response is a success response
   * @param response - The response to check
   * @returns True if the response is a success response
   */
  static isSuccessResponse(
    response: IcebreakerResponse
  ): response is IcebreakerSuccessResponse {
    return response.status === "success";
  }
}
