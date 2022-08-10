import axios from 'axios';
import { RadioGroup } from '@components';
import React, { FormEvent, useState } from 'react';
import styled from 'styled-components';

const SearchForm = ({ setSearchWord, setSearchResult, setTotalCnt }) => {
  const [word, setQuery] = useState('');
  const [searchType, setSearchType] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.get(`/api/v1/search/book.json`, {
        params: { query: word },
        headers: {
          'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID!,
          'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET!,
        },
      });
      console.log(res.data);
      setSearchResult(res.data.items);
      setTotalCnt(res.data.total);
      setSearchWord(word);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <SearchFormBox>
      <form onSubmit={handleSubmit}>
        <RadioGroup options={['제목', 'ISBN']} value={searchType} onChange={() => {}} />
        <input
          className="searchInput"
          type="text"
          placeholder="책 제목을 입력하세요"
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          required
        />
        <button>검색</button>
      </form>
    </SearchFormBox>
  );
};

const SearchFormBox = styled.div`
  font-size: 18px;
  background-color: #f7f8f9;
  border: 1px solid #d5d7db;

  form {
    margin: 0 auto;
    display: flex;
    padding: 20px;
    width: fit-content;
  }

  .radioGroup {
    background-color: white;
    border: 1px solid #d5d7db;
  }

  .searchInput {
    background-color: white;
    width: 500px;
    height: 44px;
    padding: 0 14px;
    margin: 0 14px;
    border: 1px solid #d5d7db;
    border-radius: 0.5rem;
  }

  button {
    background-color: #3e4549;
    border-radius: 0.5rem;
    font-size: 16px;
    color: white;
    height: 44px;
    padding: 0 14px;
  }
`;

export default SearchForm;
