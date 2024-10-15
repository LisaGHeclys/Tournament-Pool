import { useState } from "react";
import { Method } from "@/app/api/_helpers/types/types";

type useFetchOptions = {
  url: string;
  method: Method;
  body?: object;
};

export function useFetch() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<string | null>(null);

  async function executeFetch({ url, method, body }: useFetchOptions) {
    setIsLoading(true);
    setIsError(null);

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + url, {
        method: method,
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${errorText}`);
      }

      setIsLoading(false);
      return response;
    } catch (err: any) {
      setIsError(err.message || "An unexpected error occurred");
      setIsLoading(false);
      return null;
    }
  }

  return { executeFetch, isLoading, isError };
}
