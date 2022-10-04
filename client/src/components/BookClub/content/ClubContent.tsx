import React from 'react';
import styled from 'styled-components';
import ChatDetail from './detail/ChatDetail';
import ChatRoom from './room/ChatRoom';

const ClubContent = () => {
  return (
    <ClubContentBox>
      <ChatRoom />
      <ChatDetail />
    </ClubContentBox>
  );
};

const ClubContentBox = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
`;

export default ClubContent;
