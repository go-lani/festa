import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import media from '../../libs/MediaQuery';
import KeywordPopup from './KeywordPopup';

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 1;
  padding: 15px 60px;
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.7) 10%,
    rgba(0, 0, 0, 0)
  );

  ${({ isMain }) =>
    !isMain &&
    css`
      background: #000;
      background-image: none;
    `}

  ${media.mobile`
    height: 110px;
    padding: 15px 30px;
    flex-direction: column;
      background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.7) 80%,
      rgba(0, 0, 0, 0)
    );
  `}
`;

const Logo = styled.h1`
  width: 100px;
  a {
    display: block;

    img {
      width: 100%;
    }
  }

  ${media.mobile`
    width: 80px;
    align-self: flex-start;
  `}
`;

const Menu = styled.div`
  display: flex;
  align-items: center;

  & > * {
    margin: 0 15px 0 0;

    &:last-child {
      margin: 0;
    }
  }

  ${media.mobile`
    align-self: flex-end;
    margin: 20px 0 0;
  `}
`;

const KeywordAlarm = styled.button`
  position: relative;
  width: 35px;
  height: 35px;
  padding: 5px;
  border: none;
  border-radius: 50%;
  background: none;

  &:before {
    position: absolute;
    content: '';
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    opacity: 0;
    border-radius: 50%;
    transform: scale(0);
    transition: all 0.3s;
    background: #436eef;
  }

  &:hover {
    &:before {
      opacity: 1;
      transform: scale(1);
    }
  }

  img {
    position: relative;
    z-index: 2;
    width: 100%;
  }
`;

const LoginMenu = styled.div`
  display: flex;
  align-items: center;

  & > * {
    margin: 0 15px 0 0;

    &:last-child {
      margin: 0;
    }
  }

  .signin-button {
    min-width: 68px;
    padding: 8px 10px;
    border: none;
    border-radius: 3px;
    background: #436eef;
    font-size: 1.6rem;
  }
`;

const Greeting = styled.p`
  font-size: 1.6rem;
  word-break: keep-all;
`;

const Member = styled.em`
  display: inline-block;
  font-weight: 700;
`;

const SignOut = styled.button`
  min-width: 68px;
  padding: 8px 10px;
  border: none;
  border-radius: 3px;
  background: #436eef;
  font-size: 1.6rem;
`;

const Header = props => {
  const [isSignIn, setSignIn] = useState(true);
  const [isMain, setIsMain] = useState();
  const [keyWordVisible, setKeyWordVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const { pathname } = location;

    if (pathname === '/') setIsMain(true);
    else setIsMain(false);
  }, [location]);

  const setAlram = () => {
    if (isSignIn) setKeyWordVisible(true);
    else alert('로그인이 필요한 기능입니다.');
  };

  const hideKeywordPopup = () => {
    setKeyWordVisible(false);
  };

  return (
    <>
      <HeaderWrapper isMain={isMain}>
        <Logo>
          <Link to="/">
            <img src="/images/logo.png" alt="Festa!" />
          </Link>
        </Logo>
        <Menu>
          <KeywordAlarm onClick={setAlram}>
            <img src="/images/alram.png" alt="알람설정" />
          </KeywordAlarm>
          <LoginMenu>
            {isSignIn ? (
              <>
                <Greeting>
                  <Member>이철환</Member>님 어서오세요!
                </Greeting>
                <SignOut>로그아웃</SignOut>
              </>
            ) : (
              <Link to="/signin" className="signin-button">
                로그인
              </Link>
            )}
          </LoginMenu>
        </Menu>
      </HeaderWrapper>
      <KeywordPopup visible={keyWordVisible} hide={hideKeywordPopup} />
    </>
  );
};

export default Header;
