import { useState } from "react";
import { Method } from "@/app/api/_helpers/types/types";

type useFetchOptions = {
  url: string;
  method: Method;
  body?: object;
};

export function useFetch() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  async function executeFetch({ url, method, body }: useFetchOptions) {
    setIsLoading(true);
    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + url, {
      method: method,
      body: JSON.stringify(body),
    }).catch((err) => {
      setError(err);
    });
    setIsLoading(false);
    return response;
  }

  return { executeFetch, isLoading, error };
}
