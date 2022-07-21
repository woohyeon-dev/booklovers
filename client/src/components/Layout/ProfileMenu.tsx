import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { RiEdit2Line, RiLogoutCircleRLine } from 'react-icons/ri';

const ProfileMenu = () => {
  const handleLogout = (e: React.MouseEvent<HTMLDivElement>) => {};
  return (
    <ProfileMenuBox>
      <Link to="/profile" className="list">
        <RiEdit2Line className="icon" />
        Edit Profile
      </Link>
      <div className="list" onClick={handleLogout}>
        <RiLogoutCircleRLine className="icon" />
        Logout
      </div>
    </ProfileMenuBox>
  );
};

const ProfileMenuBox = styled.div`
  background-color: white;
  border: 1px solid black;
  position: absolute;
  top: 90px;
  right: -10px;

  .list {
    display: block;
    display: flex;
    align-items: center;
    padding: 12px 24px 12px 12px;
    &:hover {
      background-color: #dee0e3;
    }
  }

  .icon {
    margin-right: 8px;
    width: 20px;
    height: 20px;
  }
`;

export default ProfileMenu;
