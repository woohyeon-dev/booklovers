import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { BookClub, Search, Footer, Header, Main, Profile } from '@components';

const Home = () => {
  return (
    <>
      <Header />
      <LayoutBox>
        <Routes>
          <Route path="" element={<Main />} />
          <Route path="bookclub" element={<BookClub />} />
          <Route path="search" element={<Search />} />
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<Navigate replace to="/error" />} />
        </Routes>
        <Footer />
      </LayoutBox>
    </>
  );
};

const LayoutBox = styled.div`
  width: 1080px;
  margin: 0px auto;
  display: grid;
  grid-template-rows: minmax(calc(100vh - 150px), auto) 30px;
`;

export default Home;
