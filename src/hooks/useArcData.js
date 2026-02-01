import { useState, useEffect, useCallback } from 'react';
import { fetchAllData } from '../lib/data';
import { REFRESH_INTERVAL } from '../lib/config';

export function useArcData() {
  const [data, setData] = useState({
    stats: null,
    blocks: [],
    gasHistory: [],
    tpsHistory: [],
    whales: [],
    contracts: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    try {
      const result = await fetchAllData();
      setData(result);
      setError(null);
    } catch (e) {
      console.error('Fetch error:', e);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
    const interval = setInterval(refresh, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [refresh]);

  return { ...data, loading, error, refresh };
}
