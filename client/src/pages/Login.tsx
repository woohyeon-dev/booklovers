import React from 'react';
import styled from 'styled-components';
import { Input, Button, FormContainer } from '@components';
import { FiMail } from 'react-icons/fi';
import { AiOutlineLock, AiFillFacebook } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const Login = () => {
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {};
  return (
    <FormContainer>
      <LoginBox>
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="name@domain.com"
          onChange={handleInput}
          Icon={FiMail}
          iconWidth={15}
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
        <Button value="Sign in with Facebook" Icon={AiFillFacebook} iconColor={'#3b5998'} onClick={(e) => {}} />
      </LoginBox>
    </FormContainer>
  );
};

const LoginBox = styled.div`
  .optionGroup {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    padding: 14px 6px;
  }

  .checkLabel {
    display: flex;
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
    padding-top: 14px;
    font-size: 13px;
    height: 28px;
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
