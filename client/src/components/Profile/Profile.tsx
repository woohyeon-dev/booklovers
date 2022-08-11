import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ProfileInfo, EditProfile } from '@components';
import { getUser } from '../../utils/getUser';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [editable, setEditable] = useState(false);
  const [update, setUpdate] = useState(false);
  // const loggedUser = getUser(update);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!loggedUser) {
  //     alert('Available after login');
  //     navigate('/login');
  //   }
  // }, [loggedUser]);

  const loggedUser = {
    photo: '',
    nickname: '',
    gender: '',
    birthday: '',
  };

  return (
    <ProfileBox>
      {loggedUser && (
        <>
          <Box>
            <h1>프로필</h1>
            {!editable && <ProfileInfo loggedUser={loggedUser} setEditable={setEditable} />}
            {editable && <EditProfile loggedUser={loggedUser} setEditable={setEditable} setUpdate={setUpdate} />}
          </Box>
          <Box>
            <h1>읽고 싶은 책</h1>
            <List></List>
          </Box>
        </>
      )}
    </ProfileBox>
  );
};

const ProfileBox = styled.div`
  margin: 40px 0;
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-gap: 20px;
`;

const Box = styled.div`
  height: fit-content;
  border: 1px solid ${(props) => props.theme.borderColor};
  padding: 20px;
  border-radius: 0.5rem;

  h1 {
    padding-left: 4px;
    font-size: 20px;
  }
`;

const List = styled.div`
  margin-top: 12px;
`;

export default Profile;
