import axios from 'axios';

export const refreshToken = async () => {
  try {
    const token = await axios.request({ url: '/auth/token', method: 'GET' });
    axios.defaults.headers.common['Authorization'] = token.data.accessToken ? `Bearer ${token.data.accessToken}` : null;
  } catch (err) {
    if (err.response.data.code == 1) {
      // Cookie does not have refresh token
      // Invalid refresh token
      axios.defaults.headers.common['Authorization'] = null;
      return 'guest';
    }
    console.error(err);
  }
};
