import React from 'react';
import styled from 'styled-components';
import { Input, Button } from '@components';
import { RiEdit2Line } from 'react-icons/ri';

const ProfileInfo = ({ loggedUser, setEditable }) => {
  const { photo, nickname, gender, birthday } = loggedUser;

  return (
    <ProfileInfoBox>
      <ImageBox>
        {!photo && <div>none</div>}
        {photo && <Img src={`/img/profile/${photo}`} alt="" />}
      </ImageBox>
      <Input label="닉네임" name="nickname" value={nickname} disabled />
      <Input label="성별" name="gender" value={gender} disabled />
      <Input label="생년월일" name="birthday" value={birthday} disabled />
      <Btn
        Icon={RiEdit2Line}
        value="프로필 수정"
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
`;

const ImageBox = styled.div`
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
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.5rem;
`;

const Btn = styled(Button)`
  margin-top: 20px;
`;

export default ProfileInfo;
