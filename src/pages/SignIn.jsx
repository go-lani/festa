import React, { useState, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';
import A11yTitle from '../components/Common/A11yTitle';
import media from '../libs/MediaQuery';

const SignInWrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  min-height: 100vh;
  padding: 100px 60px;
  background: url('/images/visual.jpg') 0 0 no-repeat;
  background-size: cover;

  ${media.mobile`
    padding: 100px 30px;
  `}
`;

const Logo = styled.h1`
  position: absolute;
  top: 20px;
  left: 60px;
  width: 100px;

  a {
    display: block;
  }

  img {
    width: 100%;
  }

  ${media.mobile`
    left: 30px;
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

const FieldSet = styled.fieldset`
  legend {
    display: block;
    width: 100%;
    font-weight: 700;
    font-size: 2rem;
    color: #486cdc;
    margin: 0 0 20px;
  }
`;

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
  const [isExist, setExist] = useState();
  const [email, setEmail] = useState();
  const introEmailInput = useRef();
  const signInPasswordInput = useRef();
  const signUpUsernameInput = useRef();
  const signUpPasswordInput = useRef();

  const writeEmail = e => {
    const email = e.target.value.trim();
    setEmail(email);
  };

  const checkUser = async () => {
    // eslint-disable-next-line no-useless-escape
    const validate = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,4}$/i;

    if (!email) return alert('이메일을 작성해주세요.');
    if (!validate.test(email)) return alert('이메일 형식을 확인해주세요.');

    console.log(email);
    try {
      const { data } = await axios.get(
        'https://festacrawling.xyz/members/check-user',
        {
          params: {
            email,
          },
        },
      );

      console.log('check', data);
      setIntro(false);
      setExist(data.isExist);
    } catch (error) {
      console.log(error);
    }
  };

  const checkSignUp = async () => {
    const username = signUpUsernameInput.current.value.trim();
    const password = signUpPasswordInput.current.value;

    if (!username || !password) return alert('작성 값을 다시 확인해주세요.');

    try {
      const { data } = await axios.post(
        'https://festacrawling.xyz/members/create-user/',
        {
          email,
          password,
        },
      );

      if (data.detail) setExist(true);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const checkSignIn = async () => {
    const password = signInPasswordInput.current.value;

    if (!password) return alert('비밀번호를 다시 확인해주세요.');

    try {
      const { data } = await axios.post(
        'https://festacrawling.xyz/members/auth-token/',
        {
          email,
          password,
        },
      );

      console.log(data);
    } catch (error) {
      if (error.response.data.detail)
        return alert('비밀번호가 틀렸습니다. 다시 확인해주세요');
    }
  };

  useEffect(() => {
    console.log(isExist);
  }, [isExist]);

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
        <Form
          onSubmit={e => {
            e.preventDefault();
          }}
        >
          {isIntro && (
            <>
              <FieldSet>
                <A11yTitle as="legend">로그인/회원가입 영역</A11yTitle>
                <InputBox>
                  <label htmlFor="email">아이디</label>
                  <Input
                    type="text"
                    ref={introEmailInput}
                    id="email"
                    onChange={writeEmail}
                  />
                </InputBox>
              </FieldSet>
              <SubmitButton type="button" onClick={checkUser}>
                로그인 또는 가입하기
              </SubmitButton>
            </>
          )}
          {!isIntro && !isExist && (
            <>
              <FieldSet>
                <legend>로그인을 해주세요</legend>
                <InputBox>
                  <label htmlFor="signin-email">이메일</label>
                  <Input
                    type="email"
                    id="signin-email"
                    value={email}
                    readOnly
                  />
                </InputBox>
                <InputBox>
                  <label htmlFor="signin-password">비밀번호</label>
                  <Input
                    type="password"
                    ref={signInPasswordInput}
                    id="signin-password"
                  />
                </InputBox>
              </FieldSet>
              <SubmitButton type="button" onClick={checkSignIn}>
                로그인
              </SubmitButton>
            </>
          )}
          {!isIntro && isExist && (
            <>
              <FieldSet>
                <legend>회원가입을 해주세요</legend>
                <InputBox>
                  <label htmlFor="signup-email">이메일</label>
                  <Input
                    type="email"
                    id="signup-email"
                    value={email}
                    readOnly
                  />
                </InputBox>
                <InputBox>
                  <label htmlFor="signup-username">사용자 이름</label>
                  <Input
                    type="text"
                    id="signup-username"
                    ref={signUpUsernameInput}
                  />
                </InputBox>
                <InputBox>
                  <label htmlFor="signup-password">비밀번호</label>
                  <Input
                    type="password"
                    id="signup-password"
                    ref={signUpPasswordInput}
                  />
                </InputBox>
              </FieldSet>
              <SubmitButton type="button" onClick={checkSignUp}>
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
