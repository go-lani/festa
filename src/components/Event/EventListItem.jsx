import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import media from '../../libs/MediaQuery';

const Item = styled.li`
  float: left;
  width: 23.5%;
  margin: 0 0 2% 2%;
  background: #fff;
  color: #222;
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.8);

  &:first-child {
    margin-left: 0;
  }

  a {
    display: block;
  }

  ${media.desktop`
    &:nth-child(4n + 1) {
      clear: both;
      margin-left: 0;
    }
  `}

  ${media.tablet`
    width: 49%;

    &:nth-child(2n + 1) {
      clear: both;
      margin-left: 0;
    }
  `}

  ${media.mobile`
    width: 100%;
    float: none;
    margin: 0 0 10%;
  `}
`;

const ImgBox = styled.div`
  position: relative;
  img {
    width: 100%;
  }

  ${({ end }) =>
    end &&
    css`
      &:before {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        content: '종료된 이벤트입니다.';
        background: rgba(0, 0, 0, 0.7);
        font-weight: 700;
        font-size: 1.6rem;
        color: #fff;

        ${media.mobile`
            font-size: 2.4rem;
        `}
      }
    `}
`;

const InfoBox = styled.div`
  padding: 20px;
  font-weight: 700;
  word-break: keep-all;
`;

const Date = styled.p`
  margin: 10px 0 0;
  font-size: 1.6rem;

  ${media.tablet`
    font-size: 1.8rem;
  `}

  ${media.mobile`
    font-size: 2rem;
  `}
`;

const Title = styled.p`
  display: block;
  display: -webkit-box;
  overflow: hidden;
  width: 100%;
  max-height: 56px;
  margin: 10px 0 0;
  white-space: normal;
  text-overflow: ellipsis;
  font-size: 1.8rem;
  text-align: left;
  word-wrap: break-word;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  ${media.tablet`
    font-size: 2rem;
  `}

  ${media.mobile`
    font-size: 2.2rem;
  `}
`;

const Host = styled.p`
  margin: 5px 0 0;
  font-weight: 400;
  font-size: 1.4rem;
  color: #949292;

  ${media.tablet`
    font-size: 1.6rem;
  `}

  ${media.mobile`
    font-size: 1.8rem;
  `}
`;

const PriceInfoBox = styled.div`
  border-top: 1px solid #ddd;
  padding: 20px;
`;

const Price = styled.em`
  font-weight: 700;
  font-size: 1.6rem;

  ${media.tablet`
    font-size: 1.8rem;
  `}

  ${media.mobile`
    font-size: 2rem;
  `}
`;

// "title":"이벤트 이름",
// "host":"이벤트 주최자",
// "date":"이벤트 날짜",
// "content":"이벤트 내용",
// "apply":"이벤트 신청 가능 상태: 외부등록/이벤트 종료/이벤트 신청",
// "tickets":"티켓 가격",
// "link":"외부이벤트 링크",
// "image":"이벤트 사진"

const EventListItem = ({
  id,
  title,
  host,
  date,
  content,
  apply,
  tickets,
  link,
  image,
  category,
}) => {
  return (
    <Item>
      <Link to={`/view?category=${category}&detail=${id}`}>
        <ImgBox end={apply === '이벤트 종료'}>
          <img src={image} alt={title} />
        </ImgBox>
        <InfoBox>
          <Date>{date}</Date>
          <Title>{title}</Title>
          <Host>{host}</Host>
        </InfoBox>
        <PriceInfoBox>
          <Price>
            {category === 'free'
              ? '무료'
              : category === 'pay'
              ? `₩${tickets}`
              : '외부 이벤트'}
          </Price>
        </PriceInfoBox>
      </Link>
    </Item>
  );
};

export default EventListItem;
