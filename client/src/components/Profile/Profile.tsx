import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ProfileInfo, EditProfile, ProfileBook } from '@components';
import { getUser } from '../../utils/getUser';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Book } from 'types/profile';

const Profile = () => {
  const [editable, setEditable] = useState<boolean>(false);
  const [update, setUpdate] = useState<boolean>(false);
  const [books, setBooks] = useState<Array<Book>>([]);
  const loggedUser = getUser(update);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedUser) {
      alert('Available after login');
      navigate('/login');
    }
    if (loggedUser?.idx) {
      (async () => {
        try {
          const res = await axios.get('/books/user', { params: { userId: loggedUser.idx } });
          setBooks(res.data);
        } catch (err) {
          // console.error(err);
        }
      })();
    }
  }, [loggedUser]);

  return (
    <ProfileBox>
      {loggedUser && (
        <>
          <Box>
            <h1>프로필</h1>
            {!editable && <ProfileInfo loggedUser={loggedUser} setEditable={setEditable} />}
            {editable && <EditProfile loggedUser={loggedUser} setEditable={setEditable} setUpdate={setUpdate} />}
          </Box>
          <Box>
            <h1>좋아요 누른 책</h1>
            <BookList>
              {books.reverse().map((book) => {
                return <ProfileBook loggedUser={loggedUser} book={book} setBooks={setBooks} />;
              })}
            </BookList>
          </Box>
        </>
      )}
    </ProfileBox>
  );
};

const ProfileBox = styled.div`
  height: fit-content;
  margin: 40px 0;
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-gap: 20px;
`;

const Box = styled.div`
  height: 593px;
  border: 1px solid ${(props) => props.theme.borderColor};
  padding: 20px;
  border-radius: 0.5rem;
  background-color: white;

  h1 {
    padding-left: 4px;
    font-size: 20px;
  }
`;

const BookList = styled.div`
  padding-right: 20px;
  margin-top: 12px;
  height: 521px;
  overflow-y: scroll;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: 214px;
  grid-gap: 20px;
  scrollbar-width: thin;

  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-track {
    background-color: #e4e4e4;
    border-radius: 100px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 100px;
    border: 6px solid rgba(0, 0, 0, 0.18);
    border-left: 0;
    border-right: 0;
    background-color: #d7d7d7;
  }
`;

export default Profile;
