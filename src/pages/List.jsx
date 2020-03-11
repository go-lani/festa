import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import { v4 as uuidv4 } from 'uuid';
import EventListItem from '../components/Event/EventListItem';
import media from '../libs/MediaQuery';

const ListSection = styled.section`
  padding: 60px;
  min-height: 100vh;

  ${media.mobile`
    padding: 30px;
  `}
`;

const SectionTitle = styled.h2`
  margin: 0 0 40px;
  font-size: 3rem;
  word-break: keep-all;
`;

const EventList = styled.ul`
  &:after {
    display: block;
    content: '';
    clear: both;
  }
`;

// "title":"이벤트 이름",
// "host":"이벤트 주최자",
// "date":"이벤트 날짜",
// "content":"이벤트 내용",
// "apply":"이벤트 신청 가능 상태: 외부등록/이벤트 종료/이벤트 신청",
// "tickets":"티켓 가격",
// "link":"외부이벤트 링크",
// "image":"이벤트 사진"

const dummyDatas = [
  {
    id: 1,
    title: '환상적인 이벤트입니다',
    host: '이철환 컴퍼니',
    date: '2020년 05월 09일 오전 9:00',
    content: '환상적인 이벤트에 당신을 초대합니다',
    apply: '이벤트 신청',
    tickets: '230,000',
    link: 'https://www.naver.com',
    image:
      'https://cf.festa.io/img/2020-3-11/0b8b10b6-dc1f-47a5-bdb6-a07c264a5290.jpg',
  },
  {
    id: 2,
    title: '환상적인 이벤트입니다2',
    host: '이철환 컴퍼니',
    date: '2020년 05월 09일 오전 9:00',
    content: '환상적인 이벤트에 당신을 초대합니다',
    apply: '외부등록',
    tickets: '230,000',
    link: 'https://www.naver.com',
    image:
      'https://cf.festa.io/img/2020-3-11/0b8b10b6-dc1f-47a5-bdb6-a07c264a5290.jpg',
  },
  {
    id: 3,
    title: '환상적인 이벤트입니다3',
    host: '이철환 컴퍼니',
    date: '2020년 05월 09일 오전 9:00',
    content: '환상적인 이벤트에 당신을 초대합니다',
    apply: '이벤트 종료',
    tickets: '230,000',
    link: 'https://www.naver.com',
    image:
      'https://cf.festa.io/img/2020-3-11/0b8b10b6-dc1f-47a5-bdb6-a07c264a5290.jpg',
  },
  {
    id: 4,
    title: '환상적인 이벤트입니다4',
    host: '이철환 컴퍼니',
    date: '2020년 05월 09일 오전 9:00',
    content: '환상적인 이벤트에 당신을 초대합니다',
    apply: '외부등록',
    tickets: '1,000,000',
    link: 'https://www.naver.com',
    image:
      'https://cf.festa.io/img/2020-3-11/0b8b10b6-dc1f-47a5-bdb6-a07c264a5290.jpg',
  },
  {
    id: 5,
    title: '환상적인 이벤트입니다5',
    host: '이철환 컴퍼니',
    date: '2020년 05월 09일 오전 9:00',
    content: '환상적인 이벤트에 당신을 초대합니다',
    apply: '이벤트 신청',
    tickets: '10,000,000',
    link: 'https://www.naver.com',
    image:
      'https://cf.festa.io/img/2020-3-11/0b8b10b6-dc1f-47a5-bdb6-a07c264a5290.jpg',
  },
];

const List = props => {
  const location = useLocation();
  const [categoryTitle, setCategoryTitLE] = useState();
  const [category, setCategory] = useState();

  useEffect(() => {
    const name = location.pathname.replace('/list/', '');

    setCategory(name);

    if (name === 'free') setCategoryTitLE('무료 이벤트');
    if (name === 'pay') setCategoryTitLE('유료 이벤트');
    if (name === 'outerEvent') setCategoryTitLE('외부 이벤트');
  }, [location]);

  return (
    <>
      <Header />
      <ListSection>
        <SectionTitle>{categoryTitle}에 참여해보세요!</SectionTitle>
        <EventList>
          {dummyDatas.map(data => (
            <EventListItem key={uuidv4()} {...data} category={category} />
          ))}
        </EventList>
      </ListSection>
    </>
  );
};

export default List;
