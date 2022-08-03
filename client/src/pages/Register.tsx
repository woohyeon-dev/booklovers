import { Button, FormContainer, Input } from '@components';
import { useInput } from '@hooks';
import axios from 'axios';
import React, { FormEvent } from 'react';
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
    nickname: '',
    email: '',
    password: '',
    re_password: '',
  });
  const { nickname, email, password, re_password } = inputValue;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password === re_password) {
      const res = await axios.post('/auth/register', { nickname, email, password });
      console.log(res.data.msg);
      navigate('/login', { replace: true });
    } else {
      alert('Passwords must match');
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <RegisterBox>
        <Input
          label="Nickname"
          name="nickname"
          type="text"
          placeholder="Enter your nickname"
          Icon={BiUser}
          required
          value={nickname}
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
        <Input
          label="Re-enter password"
          name="re_password"
          type="password"
          placeholder="Enter your password"
          Icon={AiOutlineLock}
          required
          value={re_password}
          onChange={onChange}
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
        />
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
  width: 320px;

  Button {
    margin-top: 30px;
  }

  .registerGroup {
    padding-top: 16px;
    font-size: 13px;
    height: 30px;
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
