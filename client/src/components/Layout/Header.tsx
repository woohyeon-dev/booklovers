import React, { useState } from 'react';
import { Link, NavLink, useMatch } from 'react-router-dom';
import styled from 'styled-components';
import { ProfileMenu } from '@components';
import profile from '../../assets/profile.jpeg';
import { getUser } from '../../utils/getUser';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

const Header = () => {
  const [visibleMenu, setVisibleMenu] = useState(false);
  const loggedUser = getUser();
  const searchMatch = useMatch('/search');
  const bookclubMatch = useMatch('/bookclub');

  return (
    <HeaderBox>
      <HeaderContainer>
        <LogoLink to="">북러버스</LogoLink>
        <Navbar>
          <Nav to="/search" style={{ color: searchMatch ? '#3c40c6' : '' }}>
            도서검색
          </Nav>
          <Nav to="/bookclub" style={{ color: bookclubMatch ? '#3c40c6' : '' }}>
            북클럽
          </Nav>
          {!loggedUser && (
            <>
              <Nav to="/login">로그인</Nav>
              <Nav to="/register">회원가입</Nav>
            </>
          )}
          {loggedUser && (
            <>
              <Profile
                as="div"
                onClick={() => {
                  setVisibleMenu((current: boolean) => !current);
                }}
              >
                <img src={profile} alt="" style={{ width: '24px', height: '24px' }} />
                <span>{loggedUser.nickname}</span>님
                <MdOutlineKeyboardArrowDown />
                {visibleMenu && <ProfileMenu />}
              </Profile>
            </>
          )}
        </Navbar>
      </HeaderContainer>
    </HeaderBox>
  );
};

const HeaderBox = styled.div`
  background-color: ${(props) => props.theme.headerColor};
  height: 120px;
  position: sticky;
  z-index: 10;
  top: 0;
  border-bottom: 2px solid ${(props) => props.theme.borderColor};
`;

const HeaderContainer = styled.div`
  background-color: ${(props) => props.theme.headerColor};
  border-bottom: 2px solid ${(props) => props.theme.borderColor};
  width: 1080px;
  height: 120px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  font-family: 'Unreal_science_orbit';
  font-size: 55px;
  font-weight: bold;
  padding: 6px;
`;

const Navbar = styled.div`
  width: auto;
  padding: 0;
  display: flex;
`;

const Nav = styled(NavLink)`
  height: 26px;
  line-height: 26px;
  padding: 0 20px;
  font-size: 18px;

  &:last-child {
    padding-right: 0;
  }
`;

const Profile = styled(Nav)`
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  &:hover {
    cursor: pointer;
  }

  & > span {
    margin-left: 6px;
    max-width: 76px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export default Header;
