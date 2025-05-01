import { useRef } from "react";
import { CachedData } from "./types";

// Utility function to get the current timestamp
const getCurrentTimestamp = (): number => Math.floor(Date.now() / 1000);

// Custom hook for cache management with expiration
const useCache = <T,>(key: string, expirationInSeconds: number) => {
  const cache = useRef<CachedData<T>>(
    JSON.parse(localStorage.getItem(key) || "{}")
  );

  const setCache = (query: string, data: T): void => {
    const timestamp = getCurrentTimestamp();
    cache.current[query] = { data, timestamp };
    localStorage.setItem(key, JSON.stringify(cache.current));
  };

  const getCache = (query: string): T | null => {
    const cachedData = cache.current[query];
    if (cachedData) {
      const { data, timestamp } = cachedData;
      if (getCurrentTimestamp() - timestamp < expirationInSeconds) {
        return data;
      } else {
        // Cache expired
        delete cache.current[query];
        localStorage.setItem(key, JSON.stringify(cache.current));
      }
    }
    return null;
  };

  return { setCache, getCache };
};

export default useCache;
