import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ProfileMenu } from '@components';
import profile from '../../assets/profile.jpeg';
import { useUser } from '../../utils/getUser';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

const Header = () => {
  const [visibleMenu, setVisibleMenu] = useState(false);
  const loggedUser = useUser();

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
          {!loggedUser && (
            <>
              <Link className="nav" to="/login">
                Login
              </Link>
              <Link className="nav" to="/register">
                Sign up
              </Link>
            </>
          )}
          {loggedUser && (
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
