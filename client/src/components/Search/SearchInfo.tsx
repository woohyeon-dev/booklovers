import React from 'react';
import styled from 'styled-components';

interface SearchInfoProps {
  searchWord: string;
  totalCnt: number;
  currentPage: number;
}

const SearchInfo = ({ searchWord, totalCnt, currentPage }: SearchInfoProps) => {
  return (
    <SearchInfoBox>
      <div>
        검색어: <span>{searchWord}</span>
      </div>
      <div>
        <span>{totalCnt}</span>개의 검색결과 중 <span>{currentPage}</span>페이지
      </div>
    </SearchInfoBox>
  );
};

const SearchInfoBox = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  padding: 20px;
  margin: 20px 0;
  border-bottom: 2px solid black;
  color: #3e4549;

  span {
    color: black;
    font-weight: bold;
  }
`;

export default SearchInfo;
