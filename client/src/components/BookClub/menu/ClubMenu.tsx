import React from 'react';
import styled from 'styled-components';
import ChatList from './ChatList';
import ClubProfile from './ClubProfile';

const ClubMenu = () => {
  return (
    <ClubMenuBox>
      <ClubProfile />
      <ChatList />
    </ClubMenuBox>
  );
};

const ClubMenuBox = styled.div`
  background-color: blue;
`;

export default ClubMenu;
