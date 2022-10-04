import React from 'react';
import styled from 'styled-components';

const ClubProfile = () => {
  return (
    <ClubProfileBox>
      <ProfileImage>사진</ProfileImage>
      <div>닉네임</div>
      <EditBtn>수정</EditBtn>
    </ClubProfileBox>
  );
};

const ClubProfileBox = styled.div`
  padding: 10px;
  background-color: yellow;
  height: 64px;
  display: grid;
  grid-gap: 8px;
  grid-template-columns: 1fr 3fr 1fr;
`;

const ProfileImage = styled.div`
  background-color: red;
`;

const EditBtn = styled.button`
  background-color: red;
`;

export default ClubProfile;
