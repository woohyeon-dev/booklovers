import React from 'react';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { BookClub, Books, Footer, Community, Header, Main, Profile } from '@components';

const Home = () => {
  return (
    <>
      <Header />
      <LayoutBox>
        <Routes>
          <Route path="" element={<Main />} />
          <Route path="bookclub" element={<BookClub />} />
          <Route path="books" element={<Books />} />
          <Route path="community" element={<Community />} />
          <Route path="profile" element={<Profile />} />
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
