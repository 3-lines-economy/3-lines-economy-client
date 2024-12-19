import { useState, useCallback } from "react";

type UseFetchReturn = {
  request: (
    endpoint: string,
    token: string | null,
    options?: RequestInit
  ) => Promise<any>;
  loading: boolean;
  error: string | null;
};

export const useFetch = (): UseFetchReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const request = useCallback(
    async (endpoint: string, token: string | null, options?: RequestInit) => {
      setLoading(true);
      setError(null);

      try {
        const url = `${process.env.NEXT_PUBLIC_API_NEW}${endpoint}`;
        const headers: HeadersInit = {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          "Content-Type": "application/json",
          ...(options?.headers || {}),
        };

        const response = await fetch(url, {
          ...options,
          headers,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `Error: ${response.status}`);
        }

        const data = await response.json();
        return data;
      } catch (err: any) {
        setError(err.message || "An unknown error occurred");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { request, loading, error };
};
