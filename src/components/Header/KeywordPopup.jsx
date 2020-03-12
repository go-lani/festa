import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import Popup from '../Popup';
import axios from 'axios';

const Title = styled.p`
  margin: 0 0 30px;
  font-size: 2.5rem;
  line-height: 40px;
  word-break: keep-all;
`;

const RegisterBox = styled.div`
  display: flex;
  margin: 0 -40px 0 0;
`;

const Input = styled.input`
  width: 85%;
  margin: 0 2% 0 0;
  padding: 0 10px;
  border-style: solid;
  border-color: #fff;
  border-width: 0 0 2px;
  background: none;
  font-size: 1.6rem;
`;

const SubmitButton = styled.button`
  min-width: 13%;
  padding: 10px 0;
  border: none;
  border-radius: 3px;
  background: #ff2d54;
  font-size: 1.6rem;
  color: #fff;
  text-align: center;
`;

const KeywordListBox = styled.div`
  margin: 40px 0 0;
`;

const Notice = styled.p`
  font-size: 1.8rem;
`;

const KeywordList = styled.ul`
  overflow: hidden;
  margin: 20px 0 0;
`;

const Keyword = styled.li`
  display: flex;
  align-items: center;
  float: left;
  margin: 0 15px 15px 0;
  padding: 4px 10px;
  background: #436eef;
  font-size: 1.6rem;
`;

const initialKeyword = [
  {
    keyword: 'Java',
  },
  {
    keyword: 'JavaScript',
  },
];

const KeywordPopup = ({ visible, hide }) => {
  const keywordInput = useRef();
  const [keywords, setKeywords] = useState(initialKeyword);

  const getKeyword = async () => {
    const token = localStorage.getItem('token');

    try {
      const { data } = await axios.get(
        'https://festacrawling.xyz/festalist/keyword/',
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        },
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (visible) {
      getKeyword();
    }
  }, [visible]);

  const enterKeyword = ({ target, keyCode }) => {
    const keyword = target.value.trim();
    if (keyword === '' || keyCode !== 13) return;

    setKeywords(prev => prev.concat({ keyword }));
    target.value = '';
  };

  const submitKeyword = () => {
    const keyword = keywordInput.current.value.trim();
    if (keyword === '') return;

    setKeywords(prev => prev.concat({ keyword }));
    keywordInput.current.value = '';
    keywordInput.current.focus();
  };

  return (
    <Popup visible={visible} hide={hide}>
      <Title>알림 받으실 키워드를 등록해주세요</Title>
      <RegisterBox>
        <Input
          type="text"
          ref={keywordInput}
          placeholder="ex) node.js"
          onKeyUp={enterKeyword}
        />
        <SubmitButton type="button" onClick={submitKeyword}>
          등록
        </SubmitButton>
      </RegisterBox>
      <KeywordListBox>
        <Notice>현재 등록하신 키워드</Notice>
        <KeywordList>
          {keywords &&
            keywords.map(keyword => (
              <Keyword key={uuidv4()}>{keyword.keyword}</Keyword>
            ))}
        </KeywordList>
      </KeywordListBox>
    </Popup>
  );
};

export default KeywordPopup;
