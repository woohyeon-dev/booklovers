import React from 'react';
import styled from 'styled-components';

const RoomTitle = () => {
  return (
    <RoomTitleBox>
      <Titile># qfqwfqf</Titile>
      <Info>
        <div>인원 123명</div>
        <div>설명</div>
      </Info>
    </RoomTitleBox>
  );
};

const RoomTitleBox = styled.div`
  background-color: aqua;
  padding: 10px;
`;

const Titile = styled.div`
  font-weight: bold;
  font-size: 18px;
`;

const Info = styled.div`
  padding-top: 6px;
  font-size: 16px;
  display: flex;
  gap: 10px;
`;

export default RoomTitle;
