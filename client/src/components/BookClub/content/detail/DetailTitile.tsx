import React from 'react';
import styled from 'styled-components';

const DetailTitle = () => {
  return (
    <DetailTitleBox>
      <Titile>세부정보</Titile>
      <RoomName># qfqwfqf</RoomName>
    </DetailTitleBox>
  );
};

const DetailTitleBox = styled.div`
  background-color: darkcyan;
  padding: 10px;
`;

const Titile = styled.div`
  font-weight: bold;
  font-size: 18px;
`;

const RoomName = styled.div`
  padding-top: 6px;
  font-size: 16px;
`;

export default DetailTitle;
