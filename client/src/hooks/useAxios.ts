import { useState, useEffect, useCallback } from 'react';
import axios, { AxiosError, AxiosResponse, Method } from 'axios';

axios.defaults.baseURL = '';
axios.defaults.headers['Content-type'] = 'application/json; charset=UTF-8';

const useAxios = (url: string, method: Method | string, data?: any) => {
  const [response, setResponse] = useState<AxiosResponse>();
  const [error, setError] = useState<AxiosError>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      if (method === 'get' || method === 'GET') {
        fetchData(url, method, data);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  const fetchData = async (url: string, method: Method | string, data?: any) => {
    try {
      const result = await axios.request({ url, method, data: data ? data : '' });
      setResponse(result);
      if (result.data.msg) {
        console.log(result.data.msg);
      }
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const sendData = async () => {
    try {
      await fetchData(url, method, data);
    } catch (err) {
      console.error(error);
      alert(err.response.data.msg);
    }
  };

  return { response, error, loading, sendData };
};

export default useAxios;
