import React from 'react';
import styled from 'styled-components';
import BackgroundImage from '../assets/book.jpeg';
import { Input, Button } from '@components';
import { BiUser } from 'react-icons/bi';
import { AiOutlineLock } from 'react-icons/ai';
import Logo from '../../public/Logo.png';
import { Link } from 'react-router-dom';

const Login = () => {
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {};
  return (
    <LoginBox>
      <div className="loginContainer">
        <img className="image" src={BackgroundImage} alt="" />
        <form className="loginFormBox">
          <div className="logo">
            <img className="logoIcon" src={Logo} alt="" />
            BookLovers
          </div>
          <div className="title">Log in.</div>
          <div className="subTitle">Log in with your data that you entered during your registration.</div>
          <Input
            label="Your e-mail"
            name="email"
            type="email"
            placeholder="name@domain.com"
            onChange={handleInput}
            Icon={BiUser}
          />
          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="at least 8 characters"
            onChange={handleInput}
            Icon={AiOutlineLock}
          />
          <div className="optionGroup">
            <label className="checkLabel">
              <span className="labelText">Remember me</span>
              <input className="check" type="checkbox" />
            </label>
            <Link className="forgot" to="/forgot">
              Forgot password?
            </Link>
          </div>
          <Button value="Log in" bgColor="#2c5282" color="white" onClick={(e) => {}} />
          <div className="registerGroup">
            <span>Don't have an account?</span>
            <Link className="linkBtn" to="/register">
              Sign up
            </Link>
          </div>
          <div className="divider text-gray-500">or</div>
          <Button value="Sign in with Facebook" onClick={(e) => {}} />
        </form>
      </div>
    </LoginBox>
  );
};

const LoginBox = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  -webkit-user-select: none;
  user-select: none;

  .loginContainer {
    width: 880px;
    height: 580px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 10px 30px -10px;
  }

  .image {
    width: 460px;
    height: 540px;
    margin-right: 20px;
  }

  .loginFormBox {
    width: 360px;
    height: 540px;
    padding: 10px 0;
  }

  .logo {
    display: flex;
    width: 360px;
    margin-bottom: 40px;
    font-family: 'Unreal_science_orbit';
    font-weight: bold;
  }

  .logo > img {
    margin-right: 6px;
  }

  .title {
    font-size: 30px;
    font-weight: bold;
  }

  .subTitle {
    color: #aab1b8;
    margin-top: 10px;
    margin-bottom: 24px;
  }

  .optionGroup {
    display: flex;
    justify-content: space-between;
    padding: 0 6px;
    font-size: 14px;
  }

  .checkLabel {
    display: flex;
    margin-bottom: 16px;
  }

  .labelText {
    line-height: 16px;
  }

  .check {
    height: 16px;
    width: 16px;
    margin-left: 8px;
    cursor: pointer;
  }

  .forgot {
    font-weight: bold;
    color: #2c5282;
    text-decoration: underline;
    text-underline-position: under;
  }

  .registerGroup {
    width: 360px;
    margin: 16px 0;
    font-size: 14px;
    text-align: center;
  }

  .linkBtn {
    font-weight: bold;
    color: #2c5282;
    margin-left: 6px;
    text-decoration: underline;
    text-underline-position: under;
  }
`;

export default Login;
