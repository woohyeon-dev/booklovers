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
            <span>북러버스</span>
          </Link>
          {pathname.startsWith('login') && (
            <>
              <div className="title">로그인.</div>
              <div className="subTitle">회원가입 시 입력한 정보로 로그인하세요.</div>
            </>
          )}
          {pathname.startsWith('register') && (
            <>
              <div className="title">회원가입.</div>
              <div className="subTitle">계정을 만듭니다.</div>
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
  /* -webkit-user-select: none;
  user-select: none; */

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
