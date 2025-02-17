import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../utils/api';

// Define a generic type
const useFetch = <T>(endpoint: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}${endpoint}`);
        const result: T = await res.json(); // Type the result to T
        setData(result);
      } catch (err) {
        setError(`Failed to fetch data ${err}`);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [endpoint]);

  return { data, loading, error };
};

export default useFetch;
