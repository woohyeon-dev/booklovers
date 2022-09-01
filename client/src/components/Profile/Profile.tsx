import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ProfileInfo, EditProfile, ProfileBook } from '@components';
import { getUser } from '../../utils/getUser';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const [editable, setEditable] = useState<boolean>(false);
  const [update, setUpdate] = useState<boolean>(false);
  const [books, setBooks] = useState([]);
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
            <h1>읽고 싶은 책</h1>
            <BookList>
              {books.map((book) => {
                return <ProfileBook book={book} />;
              })}
            </BookList>
          </Box>
        </>
      )}
    </ProfileBox>
  );
};

const ProfileBox = styled.div`
  margin: 40px 0;
  display: grid;
  grid-template-columns: 1fr 3fr;
  padding: 20px;
  grid-gap: 20px;
  border: 1px solid ${(props) => props.theme.borderColor};
  background-color: #f7f8f9;
`;

const Box = styled.div`
  height: fit-content;
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
  margin-top: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 20px;
`;

export default Profile;
