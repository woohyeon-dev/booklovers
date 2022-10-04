import React from 'react';
import styled from 'styled-components';
import ClubContent from './content/ClubContent';
import ClubMenu from './menu/ClubMenu';

const BookClub = () => {
  return (
    <BookClubBox>
      <ClubMenu />
      <ClubContent />
    </BookClubBox>
  );
};

const BookClubBox = styled.div`
  margin: 40px 0;
  display: grid;
  grid-template-columns: 1fr 3fr;
`;

export default BookClub;
