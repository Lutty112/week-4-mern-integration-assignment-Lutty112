import { useCallback } from 'react';
import api from '../services/api';

export default function useApi() {
const useApi = () => {
  const token = localStorage.getItem('token');
  const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

  const request = useCallback(
    async (method, url, data = null) => {
      try {
        const config = {
          method,
          url,
          headers: authHeaders,
          ...(data && { data }),
        };

        const response = await api(config);
        return response.data;
      } catch (error) {
        const message =
          error.response?.data?.message || error.message || 'API Error';
        throw new Error(message);
      }
    },
    [token]
  );

  return {
    get: (url) => request('get', url),
    post: (url, data) => request('post', url, data),
    put: (url, data) => request('put', url, data),
    del: (url) => request('delete', url),
  };
};

}
