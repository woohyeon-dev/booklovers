import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { SearchResultType } from 'types/search';
import axios from 'axios';
import { User } from '../../types/profile';

interface BookInfoProps {
  loggedUser: User | undefined;
  result: SearchResultType;
  setSearchResult: Dispatch<SetStateAction<Array<SearchResultType>>>;
}

const BookInfo = ({ loggedUser, result, setSearchResult }: BookInfoProps) => {
  const handleLikes = async () => {
    try {
      const { isbn, likesCount, isLikes } = result;
      let changedLikesCnt = 0;
      if (isLikes) {
        await axios.post('/books/likes/cancel', { isbn, likesCount, userId: loggedUser?.idx });
        if (likesCount) {
          changedLikesCnt = likesCount - 1;
        }
      } else {
        await axios.post('/books/likes', { isbn, likesCount, userId: loggedUser?.idx });
        if (likesCount === 0 || likesCount) {
          changedLikesCnt = likesCount + 1;
        }
      }
      setSearchResult((current) =>
        current.map((el) => {
          if (el.isbn === isbn) {
            el.likesCount = changedLikesCnt;
            el.isLikes = !el.isLikes;
          }
          return el;
        }),
      );
    } catch (err: any) {
      // console.error(err);
    }
  };
  return (
    <BookInfoBox>
      {loggedUser && result.isLikes && <FaHeart onClick={handleLikes} className="heart" />}
      {loggedUser && !result.isLikes && <FaRegHeart onClick={handleLikes} className="heart" />}
      <div className="coverBox">
        <CoverImg src={result.image} />
      </div>
      <div className="info">
        <Title>{result.title}</Title>
        <Description>{result.description}</Description>
      </div>
    </BookInfoBox>
  );
};

const BookInfoBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 2.5fr;
  padding: 20px;
  grid-gap: 20px;
  position: relative;

  &:hover {
    cursor: pointer;
    outline: 2px solid ${(props) => props.theme.borderColor};
  }

  .heart {
    position: absolute;
    right: 10px;
    top: 10px;
    width: 20px;
    height: 24px;
    color: red;
  }
`;

const CoverImg = styled.img`
  width: 100%;
  height: 200px;
`;

const Title = styled.div`
  width: 320px;
  height: 32px;
  line-height: 32px;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Description = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 24px;
  height: 168px;
  display: -webkit-box;
  -webkit-line-clamp: 7;
  -webkit-box-orient: vertical;
`;

export default BookInfo;
