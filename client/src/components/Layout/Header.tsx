import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ProfileMenu } from '@components';
import profile from '../../assets/profile.jpeg';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import axios from 'axios';
import { refreshToken } from '../../utils/refreshToken';

const Header = () => {
  const [visibleMenu, setVisibleMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      await axios.get('/auth/user');
      setIsLoggedIn(true);
    } catch (err) {
      if (err.response.data.code === 2) {
        // Access token does not exist
        // Aceess token 재발급해야 함
        const result = await refreshToken();
        // Access token 재발급후 다시 요청
        if (result !== 'guest') {
          try {
            await axios.get('/auth/user');
            setIsLoggedIn(true);
          } catch (err) {
            setIsLoggedIn(false);
            console.error(err);
          }
        } else {
          setIsLoggedIn(false);
        }
      } else {
        setIsLoggedIn(false);
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
          {!isLoggedIn && (
            <>
              <Link className="nav" to="/login">
                Login
              </Link>
              <Link className="nav" to="/register">
                Sign up
              </Link>
            </>
          )}
          {isLoggedIn && (
            <>
              <div
                className="nav profile"
                onClick={() => {
                  setVisibleMenu((current) => !current);
                }}
              >
                <img src={profile} alt="" style={{ width: '24px', height: '24px' }} />
                <MdOutlineKeyboardArrowDown />
                {visibleMenu && <ProfileMenu />}
              </div>
            </>
          )}
        </div>
      </div>
    </HeaderBox>
  );
};

const HeaderBox = styled.div`
  height: 120px;
  position: sticky;
  z-index: 10;
  top: 0;
  background-color: white;
  border-bottom: 2px solid #f7f8f9;

  .headerContainer {
    width: 1080px;
    height: 120px;
    margin: 0 auto;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .headerLogoBox {
    display: flex;
    align-items: center;
    font-family: 'Unreal_science_orbit';
    font-size: 55px;
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

    &:last-child {
      margin-right: 0;
    }
  }

  .profile {
    font-size: 16px;
    &:hover {
      cursor: pointer;
    }
  }

  .profile > img {
    margin-right: 4px;
  }
`;

export default Header;
