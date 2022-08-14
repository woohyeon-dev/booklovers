import axios from 'axios';
import { RadioGroup } from '@components';
import React, { Dispatch, FormEvent, SetStateAction, useEffect, useState } from 'react';
import styled from 'styled-components';
import { RadioChangeEvent } from 'antd';
import { SearchResultType } from '../../types/search';
interface SearchFormProps {
  start: number;
  searchWord: string;
  setSearchWord: Dispatch<SetStateAction<string>>;
  setSearchResult: Dispatch<SetStateAction<Array<SearchResultType>>>;
  setTotalCnt: Dispatch<SetStateAction<number>>;
}

const SearchForm = ({ start, searchWord, setSearchWord, setSearchResult, setTotalCnt }: SearchFormProps) => {
  const [word, setWord] = useState('');
  const [searchType, setSearchType] = useState('제목');
  const [placeholder, setPlaceholder] = useState('제목을 입력하세요');
  const [requestQuery, setRequestQuery] = useState('d_titl');

  useEffect(() => {
    (async () => {
      const res = await axios.get('/api/v1/search/book_adv', {
        params: { [requestQuery]: searchWord, start },
        headers: {
          'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID!,
          'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET!,
        },
      });
      console.log(res.data);
      setSearchResult(res.data.items);
    })();
  }, [start]);

  const handleSearchType = (e: RadioChangeEvent) => {
    const { value } = e.target;
    setSearchType(value);
    setPlaceholder(`${value}을 입력하세요`);
    if (value === '제목') {
      setRequestQuery('d_titl');
    } else {
      setRequestQuery('d_isbn');
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.get('/api/v1/search/book_adv', {
        params: { [requestQuery]: word, start },
        headers: {
          'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID!,
          'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET!,
        },
      });
      console.log(res.data);
      setWord('');
      setSearchResult(res.data.items);
      setTotalCnt(res.data.total);
      setSearchWord(word);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <SearchFormBox>
      <Form onSubmit={handleSubmit}>
        <RadioGroup options={['제목', 'ISBN']} value={searchType} onChange={handleSearchType} />
        <Input
          className="searchInput"
          type="text"
          placeholder={placeholder}
          onChange={(e) => {
            setWord(e.target.value);
          }}
          required
        />
        <Btn>검색</Btn>
      </Form>
    </SearchFormBox>
  );
};

const SearchFormBox = styled.div`
  font-size: 18px;
  background-color: ${(props) => props.theme.headerColor};
  border: 1px solid ${(props) => props.theme.borderColor};
`;

const Form = styled.form`
  margin: 0 auto;
  display: flex;
  padding: 20px;
  width: fit-content;
`;

const Input = styled.input`
  background-color: white;
  width: 500px;
  height: 44px;
  padding: 0 14px;
  margin: 0 14px;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 0.5rem;
`;

const Btn = styled.button`
  background-color: #3e4549;
  border-radius: 0.5rem;
  font-size: 16px;
  color: white;
  height: 44px;
  padding: 0 14px;
`;

export default SearchForm;
