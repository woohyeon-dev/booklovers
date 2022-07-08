import React from 'react';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { BookClub, Catalog, Footer, Forum, Header, Main, MyInfo } from '@components';

const Home = () => {
  return (
    <HomeBox>
      <Header />
      <Routes>
        <Route path="" element={<Main />} />
        <Route path="bookclub" element={<BookClub />} />
        <Route path="catalog" element={<Catalog />} />
        <Route path="forum" element={<Forum />} />
        <Route path="myinfo" element={<MyInfo />} />
      </Routes>
      <Footer />
    </HomeBox>
  );
};

const HomeBox = styled.div``;

export default Home;
