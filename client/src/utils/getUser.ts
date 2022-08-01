import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { refreshToken } from './refreshToken';

export const useUser = () => {
  const [loggedUser, setLoggedUser] = useState(true);

  useEffect(() => {
    setUser();
  }, []);

  const setUser = async () => {
    try {
      const user = await axios.get('/auth/user');
      setLoggedUser(user.data);
    } catch (err) {
      if (err.response.data.code === 2) {
        // Access token does not exist
        // Aceess token 재발급해야 함
        const result = await refreshToken();
        // Access token 재발급후 다시 요청
        if (result !== 'guest') {
          try {
            const user = await axios.get('/auth/user');
            setLoggedUser(user.data);
            return;
          } catch (err) {
            console.error(err);
          }
        }
      } else {
        console.error(err);
      }
      setLoggedUser(false);
    }
  };

  const getInfo = useCallback(() => {
    return loggedUser;
  }, [loggedUser]);

  return getInfo();
};
