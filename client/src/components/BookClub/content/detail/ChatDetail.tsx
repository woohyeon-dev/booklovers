import React from 'react';
import styled from 'styled-components';
import DetailTitle from './DetailTitile';

const ChatDetail = () => {
  return (
    <ChatDetailBox>
      <DetailTitle />
    </ChatDetailBox>
  );
};

const ChatDetailBox = styled.div`
  background-color: blue;
`;

export default ChatDetail;
