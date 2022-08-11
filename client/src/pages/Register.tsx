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
      alert('비밀번호가 일치하지 않습니다.');
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <RegisterBox>
        <Input
          label="닉네임"
          name="nickname"
          type="text"
          placeholder="사용하실 닉네임을 입력해주세요"
          Icon={BiUser}
          required
          value={nickname}
          onChange={onChange}
        />
        <Input
          label="이메일"
          name="email"
          type="email"
          placeholder="사용하실 이메일을 입력해주세요"
          Icon={FiMail}
          required
          value={email}
          onChange={onChange}
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          title="이메일 주소 형식이 잘못되었습니다."
        />
        <Input
          label="비밀번호"
          name="password"
          type="password"
          placeholder="사용하실 비밀번호를 입력해주세요"
          Icon={AiOutlineLock}
          required
          value={password}
          onChange={onChange}
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          title="비밀번호는 하나 이상의 숫자와 대소문자를 포함해야 하고 8자 이상이어야 합니다."
        />
        <Input
          label="비밀번호 확인"
          name="re_password"
          type="password"
          placeholder="비밀번호를 한번 더 입력해주세요"
          Icon={AiOutlineLock}
          required
          value={re_password}
          onChange={onChange}
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          title="비밀번호는 하나 이상의 숫자와 대소문자를 포함해야 하고 8자 이상이어야 합니다."
        />
        <Btn value="회원가입" bgColor="#2c5282" color="white" onClick={(e) => {}} />
        <LoginGroup>
          <span>이미 계정이 있으신가요?</span>
          <LoginLink to="/login">로그인</LoginLink>
        </LoginGroup>
      </RegisterBox>
    </FormContainer>
  );
};

const RegisterBox = styled.div`
  width: 320px;
`;

const Btn = styled(Button)`
  margin-top: 20px;
`;

const LoginGroup = styled.div`
  padding-top: 16px;
  font-size: 13px;
  height: 30px;
  text-align: center;
`;

const LoginLink = styled(Link)`
  font-weight: bold;
  color: #2c5282;
  margin-left: 6px;
  text-decoration: underline;
  text-underline-position: under;
`;

export default Register;
