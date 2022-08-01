import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ProfileInfo, EditProfile } from '@components';
import { useUser } from '../../utils/getUser';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [editable, setEditable] = useState(false);
  const navigate = useNavigate();
  const loggedUser = useUser();

  useEffect(() => {
    if (!loggedUser) {
      alert('Available after login');
      navigate('/login');
    }
  }, [loggedUser]);

  return (
    <ProfileBox>
      {loggedUser && (
        <>
          <div className="box">
            <h1>PROFILE</h1>
            {!editable && <ProfileInfo loggedUser={loggedUser} setEditable={setEditable} />}
            {editable && <EditProfile loggedUser={loggedUser} setEditable={setEditable} />}
          </div>
          <div className="box">
            <h1>WANT TO READ</h1>
            <div className="list">book list</div>
          </div>
        </>
      )}
    </ProfileBox>
  );
};

const ProfileBox = styled.div`
  margin: 20px 0;
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-gap: 20px;

  .box {
    height: fit-content;
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
