import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import media from '../../libs/MediaQuery';

const DetailBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  position: relative;
  margin: 20px 0 0;
`;

const ImgArea = styled.div`
  overflow: hidden;
  width: 45%;
  padding: 10px;
  background: #fff;
  border-radius: 0 10px 10px 0;

  img {
    width: 100%;
    height: 100%;
  }

  ${media.tablet`
    width: 50%;
  `}

  ${media.mobile`
    width: 100%;
    border-radius: 0 0 10px 10px;
  `}
`;

const InfoArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 55%;
  padding: 30px;
  border-radius: 10px 0 0 10px;
  border-left: 3px dotted #eee;
  background: #fff;
  color: #222;

  ${media.tablet`
    width: 50%;
  `}

  ${media.mobile`
    width: 100%;
    border-radius: 10px 10px 0 0;
    border-left: none;
    border-top: 3px dotted #eee;
  `}
`;

const InfoTextArea = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  height: 100%;
`;

const Date = styled.p`
  margin: 0 0 20px;
  padding: 0 100px 0 0;
  font-size: 1.8rem;
  word-break: keep-all;

  ${media.mobile`
    font-size: 2rem;
    padding: 0;
  `}
`;

const Title = styled.p`
  margin: 0 0 20px;
  font-weight: 700;
  font-size: 2.8rem;
  word-break: keep-all;

  ${media.mobile`
    /* font-size: 2rem; */
    /* padding: 0; */
  `}
`;

const Host = styled.p`
  margin: 0 0 20px;
  font-size: 2rem;

  ${media.mobile`
    /* font-size: 1.6rem; */
  `}
`;

const Price = styled.p`
  margin: 0 0 20px;
  font-weight: 700;
  font-size: 1.8rem;
  color: #ff2d54;

  ${media.mobile`
    /* font-size: 1.8rem; */
  `}
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 35px;
  height: 35px;
  padding: 10px;
  border: none;
  border-radius: 50%;
  background: #ff2d54;

  img {
    width: 100%;
  }

  ${media.mobile`
    top: 10px;
    right: 10px;
    width: 30px;
    height: 30px;
  `}
`;

const ButtonArea = styled.div`
  margin: 20px 0 0;
  padding: 20px 0 0;
  border-top: 1px solid #eee;

  a {
    display: inline-block;
    padding: 10px 50px;
    background: #436eef;
    font-size: 1.8rem;
    color: #fff;
    text-align: center;
  }

  ${media.mobile`
    a {
      text-align: center;
      display: block;
      width: 100%;
      padding: 10px;
      background: #436eef;
      font-size: 1.8rem;
      color: #fff;
    }
  `}
`;

const EventDetail = ({ ticket, category, onSelectTicket }) => {
  const { id, title, host, date, image, tickets } = ticket.ticket;
  const a = tickets.split(/\((.+?)\)/g).join('');
  return (
    <DetailBox>
      <CloseButton
        type="button"
        onClick={() => onSelectTicket(ticket.ticket, category)}
      >
        <img src="/images/close-white-40x40.png" alt="닫기" />
      </CloseButton>
      <ImgArea>
        <img src={image} alt={title} />
      </ImgArea>
      <InfoArea>
        <InfoTextArea>
          <Date>{date}</Date>
          <Title>{title}</Title>
          <Host>주최자: {host}</Host>
          <Price>
            {ticket.category === 'free'
              ? '무료'
              : ticket.category === 'pay'
              ? `가격: ${tickets}`
              : '외부 이벤트'}
          </Price>
        </InfoTextArea>
        <ButtonArea>
          <Link to={`/view?category=${ticket.category}&detail=${id}`}>
            자세히 보기
          </Link>
        </ButtonArea>
      </InfoArea>
    </DetailBox>
  );
};

export default EventDetail;
