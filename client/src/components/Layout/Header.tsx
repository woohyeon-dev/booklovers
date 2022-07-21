import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { refreshToken } from '../../utils/refreshToken';
import profile from '../../assets/profile.jpeg';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

let currentPath = '';

const Header = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');
  let location = useLocation();
  // 새로고침
  useEffect(() => {
    if (currentPath === location.pathname) window.location.reload();
    currentPath = location.pathname;
  }, [location]);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const user = await axios.get('/auth/user');
      setNickname(user.data.nickname);
    } catch (err) {
      if (err.response.data.code == 2) {
        // Access token does not exist
        // Aceess token 재발급해야 함
        const result = await refreshToken();
        // Access token 재발급후 다시 요청
        if (result !== 'guest') {
          try {
            const user = await axios.get('/auth/user');
            setNickname(user.data.nickname);
          } catch (err) {
            console.error(err);
          }
        } else {
          alert('로그인 후 이용가능합니다');
          navigate('/login');
        }
      } else {
        console.error(err);
      }
    }
  };

  return (
    <HeaderBox>
      <div className="headerContainer">
        <Link className="headerLogoBox" to="">
          BookLovers
        </Link>
        <div className="navbar">
          <Link className="nav" to="/books">
            Books
          </Link>
          <Link className="nav" to="/bookclub">
            Book Club
          </Link>
          <Link className="nav" to="/community">
            Community
          </Link>
          {nickname && (
            <>
              <Link className="nav" to="/login">
                Login
              </Link>
              <Link className="nav" to="/register">
                Sign up
              </Link>
            </>
          )}
          {!nickname && (
            <>
              <Link className="nav profile" to="/profile">
                <img src={profile} alt="" />
                <MdOutlineKeyboardArrowDown />
              </Link>
            </>
          )}
        </div>
      </div>
    </HeaderBox>
  );
};

const HeaderBox = styled.div`
  height: 120px;
  border-bottom: 2px solid #f7f8f9;
  -webkit-user-select: none;
  user-select: none;

  .headerContainer {
    width: 1080px;
    height: 120px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .headerLogoBox {
    display: flex;
    align-items: center;
    font-family: 'Unreal_science_orbit';
    font-size: 50px;
    padding: 4px;
  }

  .navbar {
    width: auto;
    padding: 0;
  }

  .nav {
    margin: 0 20px;
    padding: 4px;
    font-size: 18px;
  }

  .nav:last-child {
    margin-right: 0;
  }

  .profile > img {
    margin-right: 4px;
  }
`;

export default Header;
