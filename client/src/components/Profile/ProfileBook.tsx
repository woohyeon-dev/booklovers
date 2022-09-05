import axios from 'axios';
import React, { Dispatch, SetStateAction } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import styled from 'styled-components';
import { Book, User } from '../../types/profile';

interface ProfileBookProps {
  loggedUser: User;
  book: Book;
  setBooks: Dispatch<SetStateAction<Array<Book>>>;
}

const ProfileBook = ({ loggedUser, book, setBooks }: ProfileBookProps) => {
  const handleBookLikes = async () => {
    try {
      const { isbn, image, title, likesCount } = book;
      await axios.post('/books/likes/cancel', {
        isbn,
        image,
        title,
        likesCount,
        userId: loggedUser?.idx,
      });
      setBooks((current) => current.filter((book) => isbn !== book.isbn));
    } catch (err: any) {
      // console.error(err);
    }
  };
  return (
    <ProfileBookBox>
      <FaHeart onClick={handleBookLikes} className="heart" />
      <Img src={book.image} alt="" />
      <Title>제목: {book.title}</Title>
    </ProfileBookBox>
  );
};

const ProfileBookBox = styled.div`
  width: 134px;
  height: 214px;
  position: relative;

  .heart {
    position: absolute;
    z-index: 10;
    right: 10px;
    top: 10px;
    width: 20px;
    height: 24px;
    color: red;
  }
`;

const Img = styled.img`
  width: 134px;
  height: 190px;
  margin-bottom: 8px;
  border: 2px solid ${(props) => props.theme.borderColor};
`;

const Title = styled.div`
  width: 134px;
  height: 16px;
  font-size: 15px;
  font-weight: bold;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export default ProfileBook;
