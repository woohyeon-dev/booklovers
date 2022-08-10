import React, { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { RiEdit2Line, RiLogoutCircleRLine } from 'react-icons/ri';
import axios from 'axios';

const ProfileMenu = () => {
  const handleLogout = async (e: MouseEvent<HTMLDivElement>) => {
    try {
      const res = await axios.post('/auth/logout');
      console.log(res.data.msg);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ProfileMenuBox>
      <Link to="/profile" className="list">
        <RiEdit2Line className="icon" />
        프로필관리
      </Link>
      <div className="list" onClick={handleLogout}>
        <RiLogoutCircleRLine className="icon" />
        로그아웃
      </div>
    </ProfileMenuBox>
  );
};

const ProfileMenuBox = styled.div`
  background-color: white;
  border: 1px solid black;
  position: absolute;
  top: 50px;
  right: 0px;

  .list {
    display: block;
    display: flex;
    align-items: center;
    width: 148px;
    padding: 12px 24px 12px 12px;
    touch-action: manipulation;

    &:hover {
      background-color: #dee0e3;
      color: #1890ff;
      cursor: pointer;
      transition: color 0.3s;
    }
  }

  .icon {
    margin-right: 8px;
    width: 20px;
    height: 20px;
  }
`;

export default ProfileMenu;
