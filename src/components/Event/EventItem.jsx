import React from 'react';
import styled from 'styled-components';

// title: "이벤트 이름"
// host: "이벤트 주최자"
// date: "이벤트 날짜"
// content: "이벤트 내용"
// apply: "이벤트 신청"
// tickets: "무료"
// link: "외부이벤트 링크"
// image: "https://cf.festa.io/img/2020-3-11/0b8b10b6-dc1f-4

const Item = styled.div``;

const ImgBox = styled.div`
  img {
    width: 100%;
  }
`;

const Title = styled.p`
  overflow: hidden;
  padding: 5px;
  font-size: 1.6rem;
  color: #fff;
  word-break: keep-all;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const EventItem = ({ ticket, category, onSelectTicket }) => {
  return (
    <Item onClick={() => onSelectTicket(ticket, category)}>
      <ImgBox>
        <img src={ticket.image} alt={ticket.title} />
      </ImgBox>
      <Title>{ticket.title}</Title>
    </Item>
  );
};

export default EventItem;
