import React, { useState } from 'react';
import styled from 'styled-components';
import ChatContent from './ChatContent';
import ChatInput from './ChatInput';
import RoomTitle from './RoomTitle';
import DOMPurify from 'dompurify';
import ReactHtmlParser from 'html-react-parser';

const ChatRoom = () => {
  const [state, setState] = useState('');
  console.log(state);

  return (
    <ChatRoomBox>
      <RoomTitle />
      {state && ReactHtmlParser(DOMPurify.sanitize(state))}
      <ChatContent />
      <ChatInput setState={setState} />
    </ChatRoomBox>
  );
};

const ChatRoomBox = styled.div`
  font-weight: 'none';
  display: grid;
  grid-template-rows: 60px auto 86px;
`;

export default ChatRoom;
