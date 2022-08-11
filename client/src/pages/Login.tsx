import React, { FormEvent } from 'react';
import styled from 'styled-components';
import { Input, Button, FormContainer } from '@components';
import { FiMail } from 'react-icons/fi';
import { AiOutlineLock, AiFillFacebook } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { useInput } from '@hooks';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const {
    props: { inputValue, onChange },
  } = useInput({
    email: '',
    password: '',
  });
  const { email, password } = inputValue;
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/login', inputValue);
      axios.defaults.headers.common['Authorization'] = res.data.accessToken ? `Bearer ${res.data.accessToken}` : null;
      navigate('/', { replace: true });
    } catch (err) {
      alert(err.response.data.msg);
    }
  };
  return (
    <FormContainer onSubmit={handleSubmit}>
      <LoginBox>
        <Input
          label="이메일"
          name="email"
          type="email"
          placeholder="이메일을 입력해주세요"
          Icon={FiMail}
          iconWidth={15}
          value={email}
          onChange={onChange}
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          title="Email Address format is not valid."
        />
        <Input
          label="비밀번호"
          name="password"
          type="password"
          placeholder="비밀번호를 입력해주세요(최소 8자)"
          Icon={AiOutlineLock}
          value={password}
          onChange={onChange}
        />
        <OptionGroup>
          <CheckLabel>
            <span>아이디 저장</span>
            <input type="checkbox" />
          </CheckLabel>
          <ForgotLink to="/forgot">비밀번호 찾기</ForgotLink>
        </OptionGroup>
        <Button value="로그인" bgColor="#2c5282" color="white" onClick={(e) => {}} />
        <RegisterGroup>
          <span>아직 가입하지 않으셨나요?</span>
          <RegisterLink to="/register">회원가입</RegisterLink>
        </RegisterGroup>
        <div className="divider text-gray-500">or</div>
        <Button
          value="페이스북으로 이용하기"
          Icon={AiFillFacebook}
          iconColor="#3b5998"
          border="1px solid black"
          type="button"
          onClick={(e) => {}}
        />
      </LoginBox>
    </FormContainer>
  );
};

const LoginBox = styled.div`
  width: 320px;
`;

const OptionGroup = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  padding: 14px 6px;
`;

const CheckLabel = styled.label`
  display: flex;

  & > span {
    line-height: 16px;
  }

  & > input {
    height: 16px;
    width: 16px;
    margin-left: 8px;
    cursor: pointer;
  }
`;

const ForgotLink = styled(Link)`
  font-weight: bold;
  color: #2c5282;
  text-decoration: underline;
  text-underline-position: under;
`;

const RegisterGroup = styled.div`
  padding-top: 14px;
  font-size: 13px;
  height: 28px;
  text-align: center;
`;

const RegisterLink = styled(Link)`
  font-weight: bold;
  color: #2c5282;
  margin-left: 6px;
  text-decoration: underline;
  text-underline-position: under;
`;

export default Login;
