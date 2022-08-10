import React from 'react';
import styled from 'styled-components';

type SearchResultType = {
  title?: string;
  link?: string;
  image?: string;
  author?: string;
  discount?: string | number;
  publisher?: string;
  pubdate?: string | number | Date;
  isbn?: string | number;
  description?: string;
};

const SearchResult = ({ searchResults }) => {
  return (
    <SearchResultBox>
      {searchResults.length > 0 &&
        searchResults.map((result: SearchResultType, index: number) => (
          <div className="wrapper" key={index}>
            <div className="coverBox">
              <img className="cover" src={result.image} />
            </div>
            <div className="info">
              <div className="title">{result.title}</div>
              <div className="description">{result.description}</div>
            </div>
          </div>
        ))}
      {searchResults.length <= 0 && <div>요청하신 검색어에 대한 검색결과가 없습니다.</div>}
    </SearchResultBox>
  );
};

const SearchResultBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;

  .wrapper {
    display: grid;
    grid-template-columns: 1fr 2.5fr;
    padding: 20px;
    grid-gap: 20px;

    &:hover {
      cursor: pointer;
      background-color: #90cdf4;
      transition: color 0.3s;
    }
  }

  .cover {
    width: 100%;
    height: 200px;
  }

  .title {
    width: 338px;
    height: 32px;
    line-height: 32px;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .description {
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 24px;
    height: 168px;
    display: -webkit-box;
    -webkit-line-clamp: 7;
    -webkit-box-orient: vertical;
  }
`;

export default SearchResult;
