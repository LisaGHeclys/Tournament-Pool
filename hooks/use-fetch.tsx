import { useState } from "react";
import { useFetchOptions } from "@/app/api/_helpers/types/types";

export function useFetch() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<string | null>(null);

  async function executeFetch({ url, method, body }: useFetchOptions) {
    setIsLoading(true);
    setIsError(null);

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        ...(body && { body: JSON.stringify(body) }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${errorText}`);
      }

      setIsLoading(false);
      return response;
    } catch (error) {
      setIsError("An unexpected error occurred :" + error);
      setIsLoading(false);
      return null;
    }
  }

  return { executeFetch, isLoading, isError };
}
