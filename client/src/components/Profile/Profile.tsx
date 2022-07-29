import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ProfileInfo, EditProfile } from '@components';
import axios from 'axios';
import { refreshToken } from '../../utils/refreshToken';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [editable, setEditable] = useState(false);
  const [loggedUser, setLoggedUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // getUser();
  }, []);

  const getUser = async () => {
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
          } catch (err) {
            alert('로그인 후 이용가능합니다.');
            navigate('/login');
            console.error(err);
          }
        } else {
          alert('로그인 후 이용가능합니다.');
          navigate('/login');
        }
      } else {
        alert('로그인 후 이용가능합니다.');
        navigate('/login');
        console.error(err);
      }
    }
  };

  return (
    <ProfileBox>
      <div className="box">
        <h1>PROFILE</h1>
        {!editable && <ProfileInfo loggedUser={loggedUser} setEditable={setEditable} />}
        {editable && <EditProfile loggedUser={loggedUser} setEditable={setEditable} />}
      </div>
      <div className="box">
        <h1>WANT TO READ</h1>
        <div className="list">book list</div>
      </div>
    </ProfileBox>
  );
};

const ProfileBox = styled.div`
  margin: 20px 0;
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-gap: 20px;

  .box {
    border: 1px solid #d5d7db;
    padding: 20px;
    border-radius: 0.5rem;
  }

  h1 {
    padding-left: 4px;
    font-size: 20px;
    font-weight: bold;
  }

  .list {
    margin-top: 12px;
  }
`;

export default Profile;
