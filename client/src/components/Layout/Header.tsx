import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ProfileMenu } from '@components';
import profile from '../../assets/profile.jpeg';
import { getUser } from '../../utils/getUser';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

const Header = () => {
  const [visibleMenu, setVisibleMenu] = useState(false);
  const loggedUser = getUser();

  return (
    <HeaderBox>
      <div className="headerContainer">
        <Link className="headerLogoBox" to="">
          북러버스
        </Link>
        <div className="navbar">
          <Link className="nav" to="/search">
            도서검색
          </Link>
          <Link className="nav" to="/bookclub">
            북클럽
          </Link>
          {!loggedUser && (
            <>
              <Link className="nav" to="/login">
                로그인
              </Link>
              <Link className="nav" to="/register">
                회원가입
              </Link>
            </>
          )}
          {loggedUser && (
            <>
              <div
                className="nav profile"
                onClick={() => {
                  setVisibleMenu((current: boolean) => !current);
                }}
              >
                <img src={profile} alt="" style={{ width: '24px', height: '24px' }} />
                <span>{loggedUser.nickname}</span>님
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
    background-color: white;
    border-bottom: 2px solid #f7f8f9;
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
    font-size: 55px;
    font-weight: bold;
    padding: 6px;
  }

  .navbar {
    width: auto;
    padding: 0;
  }

  .nav {
    height: 26px;
    margin: 0 20px;
    padding: 4px;
    font-size: 18px;

    &:last-child {
      margin-right: 0;
    }
  }

  .profile {
    position: relative;
    display: flex;
    justify-content: flex-end;
    font-size: 16px;
    &:hover {
      cursor: pointer;
    }
  }

  .profile > span {
    margin: 0 2px 0px 6px;
    max-width: 76px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export default Header;
