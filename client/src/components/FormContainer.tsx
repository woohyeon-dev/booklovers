import React from 'react';
import styled from 'styled-components';
import BackgroundImage from '../assets/book.jpeg';
import favicon from '../assets/favicon.ico';
import { Link, useLocation } from 'react-router-dom';

function FormContainer({ onSubmit, children }) {
  const pathname = useLocation().pathname.replace('/', '');
  return (
    <FormContainerBox>
      <div className="loginContainer">
        <img className="image" src={BackgroundImage} alt="" />
        <form className="loginFormBox" onSubmit={onSubmit}>
          <Link to="/" className="logo">
            <img className="logoIcon" src={favicon} alt="" />
            <span>BookLovers</span>
          </Link>
          {pathname.startsWith('login') && (
            <>
              <div className="title">Log in.</div>
              <div className="subTitle">Log in with your data that you entered during your registration.</div>
            </>
          )}
          {pathname.startsWith('register') && (
            <>
              <div className="title">Register.</div>
              <div className="subTitle">Create your account.</div>
            </>
          )}
          {children}
        </form>
      </div>
    </FormContainerBox>
  );
}

const FormContainerBox = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  -webkit-user-select: none;
  user-select: none;

  .loginContainer {
    width: 820px;
    height: 560px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 10px 30px -10px;
  }

  .image {
    width: 460px;
    height: 560px;
  }

  .loginFormBox {
    width: 360px;
    height: 560px;
    padding: 20px;
    display: flex;
    flex-direction: column;
  }

  .logo {
    display: flex;
    font-family: 'Unreal_science_orbit';
    font-weight: bold;
  }

  .logo > img {
    height: 16px;
    margin-right: 6px;
  }

  .title {
    font-size: 36px;
    font-weight: bold;
    display: flex;
    align-items: flex-end;
    height: 100%;
  }

  .subTitle {
    color: #aab1b8;
    padding-top: 10px;
    padding-bottom: 4px;
  }
`;

export default FormContainer;
