import { useState, useEffect, useCallback } from 'react';
import { httpClient } from '../lib/http';
import { useAppStore } from '../store/index';

interface UseAPIOptions {
  immediate?: boolean;
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
}

export function useAPI<T = any>(url: string, options: UseAPIOptions = {}) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { setError: setGlobalError } = useAppStore();

  const { immediate = false, onSuccess, onError } = options;

  const execute = useCallback(
    async (customUrl?: string) => {
      try {
        setLoading(true);
        setError(null);

        const result = await httpClient.get<T>(customUrl || url);
        setData(result);

        if (onSuccess) {
          onSuccess(result);
        }

        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Unknown error');
        setError(error);
        setGlobalError(error.message);

        if (onError) {
          onError(error);
        }

        throw error;
      } finally {
        setLoading(false);
      }
    },
    [url, onSuccess, onError, setGlobalError]
  );

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return {
    data,
    loading,
    error,
    execute,
    refetch: () => execute(),
  };
}
