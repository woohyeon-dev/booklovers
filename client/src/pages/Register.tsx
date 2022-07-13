import { Button, FormContainer, Input } from '@components';
import React from 'react';
import { AiOutlineLock } from 'react-icons/ai';
import { BiUser } from 'react-icons/bi';
import { FiMail } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Register = () => {
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {};
  return (
    <FormContainer>
      <RegisterBox>
        <Input
          label="Username"
          name="username"
          type="text"
          placeholder="Enter your full name"
          onChange={handleInput}
          Icon={BiUser}
          required
        />
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="Enter your email"
          onChange={handleInput}
          Icon={FiMail}
          required
        />
        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="Enter your password"
          onChange={handleInput}
          Icon={AiOutlineLock}
          required
        />
        <div className="warningText">Password must be at least 8 characters</div>
        <Button value="Create account" bgColor="#2c5282" color="white" onClick={(e) => {}} />
        <div className="registerGroup">
          <span>Aleady have an account?</span>
          <Link className="linkBtn" to="/login">
            Log in
          </Link>
        </div>
      </RegisterBox>
    </FormContainer>
  );
};

const RegisterBox = styled.div`
  .warningText {
    height: 36px;
    font-size: 13px;
    padding-top: 6px;
    padding-left: 6px;
    padding-bottom: 16px;
    word-spacing: 2px;
  }

  .registerGroup {
    padding-top: 16px;
    font-size: 13px;
    height: 30px;
    margin-bottom: 40px;
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

export default Register;
