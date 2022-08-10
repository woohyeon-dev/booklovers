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
        <div className="optionGroup">
          <label className="checkLabel">
            <span className="labelText">아이디 저장</span>
            <input className="check" type="checkbox" />
          </label>
          <Link className="forgot" to="/forgot">
            비밀번호 찾기
          </Link>
        </div>
        <Button value="로그인" bgColor="#2c5282" color="white" onClick={(e) => {}} />
        <div className="registerGroup">
          <span>아직 가입하지 않으셨나요?</span>
          <Link className="linkBtn" to="/register">
            회원가입
          </Link>
        </div>
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
