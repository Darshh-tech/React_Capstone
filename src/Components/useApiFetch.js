import { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY =  process.env.REACT_APP_OMDB_API_KEY;
const BASE_URL = 'https://www.omdbapi.com/';

const useApiFetch = (params = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!params.s && !params.i && !params.t) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(BASE_URL, {
          params: { apikey: API_KEY, ...params },
        });

        if (response.data.Response === "False") {
          setError(response.data.Error);
        } else {
          setData(response.data);
          setError(null);
        }
      } catch (err) {
        setError('Network Error');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [JSON.stringify(params)]);

  return { data, loading, error };
};

export default useApiFetch;