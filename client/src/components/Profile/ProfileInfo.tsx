import React from 'react';
import styled from 'styled-components';
import { Input, Button } from '@components';
import { RiEdit2Line } from 'react-icons/ri';

const ProfileInfo = ({ loggedUser, setEditable }) => {
  const { photo, nickname, sex, birthday } = loggedUser;

  return (
    <ProfileInfoBox>
      <div className="imageBox">
        {!photo && <div>none</div>}
        {photo && <img className="preview" src={photo} alt="" />}
      </div>
      <Input label="Nickname" name="nickname" type="text" value={nickname} disabled />
      <Input label="Sex" name="sex" type="text" value={sex} disabled />
      <Input label="Birthday" name="birthday" type="text" value={birthday} disabled />
      <Button
        Icon={RiEdit2Line}
        value="Edit Profile"
        type="button"
        border="1px solid #d5d7db"
        boxShadow="none"
        borderRadius="0.5rem"
        onClick={() => setEditable(true)}
      />
    </ProfileInfoBox>
  );
};

const ProfileInfoBox = styled.div`
  display: grid;
  margin-top: 12px;

  .imageBox {
    width: 223px;
    height: 223px;
    margin-bottom: 10px;
    background-color: #f7f8f9;
    color: #88929c;
    outline: 1px solid #d5d7db;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.5rem;
    overflow: hidden;
  }

  .preview {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0.5rem;
  }

  button {
    margin-top: 20px;
  }
`;

export default ProfileInfo;
