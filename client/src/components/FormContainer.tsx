import React, { FormEvent } from 'react';
import styled from 'styled-components';
import BackgroundImage from '../assets/book.jpeg';
import favicon from '../assets/favicon.ico';
import { Link, useLocation } from 'react-router-dom';

interface FormContainerProps {
  onSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  children: JSX.Element | JSX.Element[];
}

function FormContainer({ onSubmit, children }: FormContainerProps) {
  const pathname = useLocation().pathname.replace('/', '');
  return (
    <FormContainerBox>
      <LoginContainer>
        <Img src={BackgroundImage} alt="" />
        <LoginForm onSubmit={onSubmit}>
          <LogoLink to="/">
            <img className="logoIcon" src={favicon} alt="" />
            <span>북러버스</span>
          </LogoLink>
          {pathname.startsWith('login') && (
            <>
              <Title>로그인.</Title>
              <SubTitle>회원가입 시 입력한 정보로 로그인하세요.</SubTitle>
            </>
          )}
          {pathname.startsWith('register') && (
            <>
              <Title>회원가입.</Title>
              <SubTitle>계정을 만듭니다.</SubTitle>
            </>
          )}
          {children}
        </LoginForm>
      </LoginContainer>
    </FormContainerBox>
  );
}

const FormContainerBox = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
`;

const LoginContainer = styled.div`
  width: 820px;
  height: 560px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 10px 30px -10px;
`;

const Img = styled.img`
  width: 460px;
  height: 560px;
`;

const LoginForm = styled.form`
  width: 360px;
  height: 560px;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const LogoLink = styled(Link)`
  display: flex;
  font-family: 'Unreal_science_orbit';
  font-weight: bold;

  & > img {
    height: 16px;
    margin-right: 6px;
  }
`;

const Title = styled.div`
  font-size: 36px;
  font-weight: bold;
  display: flex;
  align-items: flex-end;
  height: 100%;
`;

const SubTitle = styled.div`
  color: #aab1b8;
  padding-top: 10px;
  padding-bottom: 4px;
`;

export default FormContainer;
