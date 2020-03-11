import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import A11yTitle from '../components/Common/A11yTitle';
import EventSection from '../components/Event/EventSection';
import media from '../libs/MediaQuery';

const VisualArea = styled.section`
  display: flex;
  align-items: center;
  height: 80vh;
  margin: -70px 0 0;
  padding: 70px 60px;
  background: url('/images/visual.jpg') center bottom no-repeat;
  background-size: cover;

  img {
    width: 100%;
  }

  ${media.mobile`
    margin: -110px 0 0;
    padding: 110px 30px;
  `}
`;

const VisualTitle = styled.strong`
  font-weight: 700;
  font-size: 6rem;

  ${media.tablet`
    font-size: 5.2rem;
  `}

  ${media.mobile`
    font-size: 4.6rem;
  `}
`;

const dummy = {
  free: [
    {
      id: 1,
      title: '이벤트 이름',
      host: '이벤트 주최자',
      date: '이벤트 날짜',
      content: '이벤트 내용',
      apply: '이벤트 신청',
      tickets: '무료',
      link: '외부이벤트 링크',
      image:
        'https://cf.festa.io/img/2020-3-11/0b8b10b6-dc1f-47a5-bdb6-a07c264a5290.jpg',
    },
    {
      id: 2,
      title: '이벤트 이름',
      host: '이벤트 주최자',
      date: '이벤트 날짜',
      content: '이벤트 내용',
      apply: '이벤트 종료',
      tickets: '무료',
      link: '외부이벤트 링크',
      image:
        'https://cf.festa.io/img/2020-3-11/0b8b10b6-dc1f-47a5-bdb6-a07c264a5290.jpg',
    },
    {
      id: 3,
      title: '이벤트 이름',
      host: '이벤트 주최자',
      date: '이벤트 날짜',
      content: '이벤트 내용',
      apply: '이벤트 종료',
      tickets: '무료',
      link: '외부이벤트 링크',
      image:
        'https://cf.festa.io/img/2020-3-11/0b8b10b6-dc1f-47a5-bdb6-a07c264a5290.jpg',
    },
    {
      id: 4,
      title: '이벤트 이름',
      host: '이벤트 주최자',
      date: '이벤트 날짜',
      content: '이벤트 내용',
      apply: '이벤트 신청',
      tickets: '무료',
      link: '외부이벤트 링크',
      image:
        'https://cf.festa.io/img/2020-3-11/0b8b10b6-dc1f-47a5-bdb6-a07c264a5290.jpg',
    },
    {
      id: 5,
      title: '이벤트 이름',
      host: '이벤트 주최자',
      date: '이벤트 날짜',
      content: '이벤트 내용',
      apply: '이벤트 신청',
      tickets: '무료',
      link: '외부이벤트 링크',
      image:
        'https://cf.festa.io/img/2020-3-11/0b8b10b6-dc1f-47a5-bdb6-a07c264a5290.jpg',
    },
  ],
  pay: [
    {
      id: 6,
      title: '이벤트 이름',
      host: '이벤트 주최자',
      date: '이벤트 날짜',
      content: '이벤트 내용',
      apply: '이벤트 신청',
      tickets: '100,000',
      link: '외부이벤트 링크',
      image:
        'https://cf.festa.io/img/2020-3-11/0b8b10b6-dc1f-47a5-bdb6-a07c264a5290.jpg',
    },
    {
      id: 7,
      title: '이벤트 이름',
      host: '이벤트 주최자',
      date: '이벤트 날짜',
      content: '이벤트 내용',
      apply: '이벤트 종료',
      tickets: '100,000',
      link: '외부이벤트 링크',
      image:
        'https://cf.festa.io/img/2020-3-11/0b8b10b6-dc1f-47a5-bdb6-a07c264a5290.jpg',
    },
    {
      id: 8,
      title: '이벤트 이름',
      host: '이벤트 주최자',
      date: '이벤트 날짜',
      content: '이벤트 내용',
      apply: '이벤트 종료',
      tickets: '100,000',
      link: '외부이벤트 링크',
      image:
        'https://cf.festa.io/img/2020-3-11/0b8b10b6-dc1f-47a5-bdb6-a07c264a5290.jpg',
    },
    {
      id: 9,
      title: '이벤트 이름',
      host: '이벤트 주최자',
      date: '이벤트 날짜',
      content: '이벤트 내용',
      apply: '이벤트 신청',
      tickets: '100,000',
      link: '외부이벤트 링크',
      image:
        'https://cf.festa.io/img/2020-3-11/0b8b10b6-dc1f-47a5-bdb6-a07c264a5290.jpg',
    },
    {
      id: 10,
      title: '이벤트 이름',
      host: '이벤트 주최자',
      date: '이벤트 날짜',
      content: '이벤트 내용',
      apply: '이벤트 신청',
      tickets: '100,000',
      link: '외부이벤트 링크',
      image:
        'https://cf.festa.io/img/2020-3-11/0b8b10b6-dc1f-47a5-bdb6-a07c264a5290.jpg',
    },
  ],
  otherEvent: [
    {
      id: 11,
      title: '이벤트 이름',
      host: '이벤트 주최자',
      date: '이벤트 날짜',
      content: '이벤트 내용',
      apply: '외부 이벤트',
      tickets: '100,000',
      link: '외부이벤트 링크',
      image:
        'https://cf.festa.io/img/2020-3-11/0b8b10b6-dc1f-47a5-bdb6-a07c264a5290.jpg',
    },
    {
      id: 12,
      title: '이벤트 이름',
      host: '이벤트 주최자',
      date: '이벤트 날짜',
      content: '이벤트 내용',
      apply: '외부 이벤트',
      tickets: '100,000',
      link: '외부이벤트 링크',
      image:
        'https://cf.festa.io/img/2020-3-11/0b8b10b6-dc1f-47a5-bdb6-a07c264a5290.jpg',
    },
    {
      id: 13,
      title: '이벤트 이름',
      host: '이벤트 주최자',
      date: '이벤트 날짜',
      content: '이벤트 내용',
      apply: '외부 이벤트',
      tickets: '100,000',
      link: '외부이벤트 링크',
      image:
        'https://cf.festa.io/img/2020-3-11/0b8b10b6-dc1f-47a5-bdb6-a07c264a5290.jpg',
    },
    {
      id: 14,
      title: '이벤트 이름',
      host: '이벤트 주최자',
      date: '이벤트 날짜',
      content: '이벤트 내용',
      apply: '외부 이벤트',
      tickets: '100,000',
      link: '외부이벤트 링크',
      image:
        'https://cf.festa.io/img/2020-3-11/0b8b10b6-dc1f-47a5-bdb6-a07c264a5290.jpg',
    },
    {
      id: 15,
      title: '이벤트 이름',
      host: '이벤트 주최자',
      date: '이벤트 날짜',
      content: '이벤트 내용',
      apply: '외부 이벤트',
      tickets: '100,000',
      link: '외부이벤트 링크',
      image:
        'https://cf.festa.io/img/2020-3-11/0b8b10b6-dc1f-47a5-bdb6-a07c264a5290.jpg',
    },
  ],
};

const Home = props => {
  const [selectTicket, setSelectTicket] = useState();

  const onSelectTicket = (ticket, category) => {
    setSelectTicket(prev => {
      if (prev) {
        if (prev.ticket) {
          if (prev.ticket.id === ticket.id) return null;
          else return { ticket, category };
        }
      } else {
        return { ticket, category };
      }
    });
  };

  return (
    <>
      <Header />
      <VisualArea>
        <A11yTitle>비주얼 영역</A11yTitle>
        <VisualTitle>
          이벤트를 만나는
          <br />
          가장 쉬운 방법!
        </VisualTitle>
      </VisualArea>
      <EventSection
        category="free"
        ticketData={dummy.free}
        selectTicket={selectTicket}
        onSelectTicket={onSelectTicket}
      />
      <EventSection
        category="pay"
        ticketData={dummy.pay}
        selectTicket={selectTicket}
        onSelectTicket={onSelectTicket}
      />
      <EventSection
        category="otherEvent"
        ticketData={dummy.otherEvent}
        selectTicket={selectTicket}
        onSelectTicket={onSelectTicket}
      />
    </>
  );
};

export default Home;
