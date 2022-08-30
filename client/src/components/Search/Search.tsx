import React, { useState } from 'react';
import styled from 'styled-components';
import { SearchResultType } from '../../types/search';
import { SearchForm, SearchInfo, SearchResult, Pagination } from '@components';
import { getUser } from '../../utils/getUser';

const Search = () => {
  const [searchWord, setSearchWord] = useState('');
  const [totalCnt, setTotalCnt] = useState(0);
  const [searchResult, setSearchResult] = useState<Array<SearchResultType>>([]);
  const [start, setStart] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const loggedUser = getUser();

  return (
    <SearchBox>
      <SearchForm
        start={start}
        searchWord={searchWord}
        loggedUser={loggedUser}
        setStart={setStart}
        setSearchWord={setSearchWord}
        setSearchResult={setSearchResult}
        setTotalCnt={setTotalCnt}
      />
      <SearchInfo searchWord={searchWord} totalCnt={totalCnt} currentPage={currentPage} />
      <SearchResult loggedUser={loggedUser} searchResults={searchResult} setSearchResult={setSearchResult} />
      <Pagination currentPage={currentPage} totalCnt={totalCnt} setCurrentPage={setCurrentPage} setStart={setStart} />
    </SearchBox>
  );
};

const SearchBox = styled.div`
  margin: 40px 0;
`;

export default Search;
