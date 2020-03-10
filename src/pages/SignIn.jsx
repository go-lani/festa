import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import A11yTitle from '../components/Common/A11yTitle';
import media from '../libs/MediaQuery';

const SignInWrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  min-height: 100vh;
  padding: 100px 30px;
  background: url('/images/visual.jpg') 0 0 no-repeat;
  background-size: cover;
`;

const Logo = styled.h1`
  position: absolute;
  top: 15px;
  left: 30px;
  width: 100px;

  img {
    width: 100%;
  }

  ${media.mobile`
    width: 80px;
  `}
`;

const FormArea = styled.div`
  max-width: 500px;
  width: 100%;
  padding: 30px;
  background: #1d1e26;
  color: #fff;

  ${media.mobile`
    padding: 20px;
  `}
`;

const Greeting = styled.strong`
  display: block;
  font-weight: 700;
  font-size: 3rem;

  ${media.mobile`
    font-size: 2.8rem;
  `}
`;

const Form = styled.form`
  margin: 20px 0 0;
`;

const FieldSet = styled.fieldset``;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;

  & + & {
    margin: 20px 0 0;
  }

  label {
    font-size: 1.6rem;
  }
`;

const Input = styled.input`
  margin: 10px 0 0;
  padding: 0 10px;
  border-style: solid;
  border-color: #fff;
  border-width: 0 0 2px;
  background: transparent;
  height: 40px;
  font-size: 1.4rem;

  ${({ readOnly }) =>
    readOnly &&
    css`
      border-color: transparent;
      color: #636363;
      background: #dedede;
      cursor: default;
    `}
`;

const SubmitButton = styled.button`
  width: 100%;
  margin: 25px 0 0;
  border: none;
  background: #ff2d54;
  padding: 5px 0;
  font-size: 1.6rem;
  line-height: 34px;
`;

const SignIn = props => {
  const [isIntro, setIntro] = useState(true);
  const [isExist, setExist] = useState(true);
  const [email, setEmail] = useState();

  const writeEmail = e => {
    const email = e.target.value.trim();
    setEmail(email);
  };
  return (
    <SignInWrapper>
      <Logo>
        <Link to="/">
          <img src="/images/logo.png" alt="Festa!" />
        </Link>
      </Logo>
      <A11yTitle>로그인 페이지</A11yTitle>
      <FormArea>
        <Greeting>우리 함께 해볼까요?</Greeting>
        <Form>
          {isIntro && (
            <>
              <FieldSet>
                <A11yTitle as="legend">로그인/회원가입 영역</A11yTitle>
                <InputBox>
                  <label htmlFor="email">아이디</label>
                  <Input type="email" id="email" onChange={writeEmail} />
                </InputBox>
              </FieldSet>
              <SubmitButton onClick={() => setIntro(false)}>
                로그인 또는 가입하기
              </SubmitButton>
            </>
          )}
          {!isIntro && isExist && (
            <>
              <FieldSet>
                <A11yTitle as="legend">로그인 영역</A11yTitle>
                <InputBox>
                  <label htmlFor="email">이메일</label>
                  <Input type="email" id="email" value={email} readOnly />
                </InputBox>
                <InputBox>
                  <label htmlFor="email">비밀번호</label>
                  <Input type="password" id="password" />
                </InputBox>
              </FieldSet>
              <SubmitButton onClick={() => setIntro(false)}>
                로그인
              </SubmitButton>
            </>
          )}
          {!isIntro && !isExist && (
            <>
              <FieldSet>
                <A11yTitle as="legend">회원가입 영역</A11yTitle>
                <InputBox>
                  <label htmlFor="email">이메일</label>
                  <Input type="email" id="email" value={email} readOnly />
                </InputBox>
                <InputBox>
                  <label htmlFor="email">사용자 이름</label>
                  <Input type="text" id="username" />
                </InputBox>
                <InputBox>
                  <label htmlFor="email">비밀번호</label>
                  <Input type="password" id="password" />
                </InputBox>
              </FieldSet>
              <SubmitButton onClick={() => setIntro(false)}>
                가입하기
              </SubmitButton>
            </>
          )}
        </Form>
      </FormArea>
    </SignInWrapper>
  );
};

export default SignIn;
