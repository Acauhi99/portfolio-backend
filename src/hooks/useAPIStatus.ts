import { useState, useEffect } from 'react';
import { httpClient } from '../lib/http';

interface APIStatus {
  status: 'online' | 'offline' | 'maintenance';
  responseTime: number;
  uptime: number;
  lastCheck: Date;
}

export function useAPIStatus(apiUrl: string, checkInterval = 60000) {
  const [status, setStatus] = useState<APIStatus>({
    status: 'offline',
    responseTime: 0,
    uptime: 0,
    lastCheck: new Date(),
  });

  const checkStatus = async () => {
    const startTime = performance.now();

    try {
      await httpClient.get(`${apiUrl}/health`);
      const endTime = performance.now();
      const responseTime = Math.round(endTime - startTime);

      setStatus((prev) => ({
        status: 'online',
        responseTime,
        uptime: prev.status === 'online' ? prev.uptime : 99.9,
        lastCheck: new Date(),
      }));
    } catch {
      setStatus((prev) => ({
        status: 'offline',
        responseTime: 0,
        uptime: prev.uptime > 0 ? prev.uptime - 0.1 : 0,
        lastCheck: new Date(),
      }));
    }
  };

  useEffect(() => {
    checkStatus();

    const interval = setInterval(checkStatus, checkInterval);

    return () => clearInterval(interval);
  }, [apiUrl, checkInterval]);

  return { ...status, refetch: checkStatus };
}
