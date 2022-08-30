import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { SearchResultType } from '../../types/search';
import { BookInfo } from '@components';
import { User } from '../../types/profile';

interface SearchResultProps {
  loggedUser: User | undefined;
  searchResults: Array<SearchResultType>;
  setSearchResult: Dispatch<SetStateAction<Array<SearchResultType>>>;
}

const SearchResult = ({ loggedUser, searchResults, setSearchResult }: SearchResultProps) => {
  return (
    <SearchResultBox>
      {searchResults.length > 0 &&
        searchResults.map((result: SearchResultType) => (
          <BookInfo loggedUser={loggedUser} result={result} setSearchResult={setSearchResult} />
        ))}
      {searchResults.length <= 0 && <div>요청하신 검색어에 대한 검색결과가 없습니다.</div>}
    </SearchResultBox>
  );
};

const SearchResultBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 20px;
  grid-gap: 10px;
`;

export default SearchResult;
