import React from 'react';
import styled from 'styled-components';
import { Book } from '../../types/profile';

interface ProfileBookProps {
  book: Book;
}

const ProfileBook = ({ book }: ProfileBookProps) => {
  return (
    <ProfileBookBox>
      <Img src={book.image} alt="" />
      <Title>제목: {book.title}</Title>
    </ProfileBookBox>
  );
};

const ProfileBookBox = styled.div``;

const Img = styled.img`
  width: 134px;
  height: 190px;
  margin-bottom: 8px;
  border: 2px solid ${(props) => props.theme.borderColor};
`;

const Title = styled.div`
  width: 134px;
  font-size: 15px;
  font-weight: bold;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export default ProfileBook;
