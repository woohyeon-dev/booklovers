import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { refreshToken } from './refreshToken';

export const getUser = (update: boolean = false) => {
  const [loggedUser, setLoggedUser] = useState({ email: '', nickname: '', gender: '', birthday: '', photo: '' });

  useEffect(() => {
    setUser();
  }, [update]);

  const setUser = async () => {
    console.log('this is occured');
    try {
      const user = await axios.get('/auth/user');
      console.log(user.data);
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
      setLoggedUser(undefined);
    }
  };

  const getInfo = useCallback(() => {
    return loggedUser;
  }, [loggedUser]);

  return getInfo();
};
