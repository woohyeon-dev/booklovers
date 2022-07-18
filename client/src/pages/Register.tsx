import { Button, FormContainer, Input } from '@components';
import { useAxios, useInput } from '@hooks';
import React from 'react';
import { AiOutlineLock } from 'react-icons/ai';
import { BiUser } from 'react-icons/bi';
import { FiMail } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Register = () => {
  const navigate = useNavigate();
  const {
    props: { inputValue, onChange },
  } = useInput({
    username: '',
    email: '',
    password: '',
  });
  const { username, email, password } = inputValue;
  const { sendData } = useAxios({
    method: 'POST',
    url: `/auth`,
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    data: inputValue,
  });

  const handleInput = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendData();
    navigate('/');
  };
  return (
    <FormContainer onSubmit={handleInput}>
      <RegisterBox>
        <Input
          label="Username"
          name="username"
          type="text"
          placeholder="Enter your full name"
          Icon={BiUser}
          required
          value={username}
          onChange={onChange}
        />
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="Enter your email"
          Icon={FiMail}
          required
          value={email}
          onChange={onChange}
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          title="Email Address format is not valid."
        />
        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="Enter your password"
          Icon={AiOutlineLock}
          required
          value={password}
          onChange={onChange}
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
        />
        <div className="warningText">
          Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters
        </div>
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
    margin-bottom: 20px;
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
