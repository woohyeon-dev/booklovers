import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const refreshToken = async () => {
  try {
    const token = await axios.request({ url: '/auth/token', method: 'GET' });
    axios.defaults.headers.common['Authorization'] = token.data.accessToken ? `Bearer ${token.data.accessToken}` : null;
  } catch (err) {
    if (err.response.data.code == 1) {
      return 'guest';
    }
  }
};
