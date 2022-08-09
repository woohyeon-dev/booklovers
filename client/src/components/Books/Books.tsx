import axios from 'axios';
import React, { FormEvent, useState } from 'react';
import styled from 'styled-components';

const Books = () => {
  const [query, setQuery] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.get(`/api/v1/search/book.json`, {
        params: { query },
        headers: {
          'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID!,
          'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET!,
        },
      });
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <BooksBox>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter the book name"
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          required
        />
        <button>search</button>
      </form>
    </BooksBox>
  );
};

const BooksBox = styled.div``;

export default Books;
