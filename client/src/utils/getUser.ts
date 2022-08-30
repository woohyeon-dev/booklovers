import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { User } from '../types/profile';
import { refreshToken } from './refreshToken';

export const getUser = (update: boolean = false): User | undefined => {
  const [loggedUser, setLoggedUser] = useState<User | undefined>({
    idx: 0,
    email: '',
    nickname: '',
    gender: '',
    birthday: '',
    photo: '',
  });

  useEffect(() => {
    (async () => {
      try {
        const user = await axios.get('/auth/user');
        setLoggedUser(user.data);
      } catch (err: any) {
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
            } catch (err: any) {
              console.error(err);
            }
          }
        } else {
          // console.error(err);
        }
        setLoggedUser(undefined);
      }
    })();
  }, [update]);

  const getInfo = useCallback(() => {
    return loggedUser;
  }, [loggedUser]);

  return getInfo();
};
