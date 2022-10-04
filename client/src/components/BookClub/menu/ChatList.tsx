import React, { useState } from 'react';
import styled from 'styled-components';

const ChatList = () => {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <ChatListBox>
      <ChatUl onClick={() => setIsClicked(!isClicked)}>
        채팅방
        {isClicked && (
          <ListBox>
            <li># qfqwfqf</li>
            <li># scsc</li>
            <li># 찾기</li>
          </ListBox>
        )}
      </ChatUl>
    </ChatListBox>
  );
};

const ChatListBox = styled.div`
  background-color: blue;
  padding: 16px 10px;
`;

const ChatUl = styled.ul`
  font-size: 18px;
`;

const ListBox = styled.div`
  padding-top: 4px;
  padding-left: 8px;

  & > li {
    padding-top: 6px;
  }
`;

export default ChatList;
