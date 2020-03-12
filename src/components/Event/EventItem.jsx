import React from 'react';
import styled, { css } from 'styled-components';
import media from '../../libs/MediaQuery';

const Item = styled.div`
  position: relative;
  background: #152638;
  border-width: 2px;
  border-style: solid;
  border-color: transparent;
  transition: all 0.3s;
  cursor: pointer;

  ${({ isSelect }) =>
    isSelect &&
    css`
      border-color: #ff2d54;
    `}
`;

const ImgBox = styled.div`
  overflow: hidden;
  position: relative;
  padding: 55% 0 0;

  img {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    transform: translate(-50%, -50%);
  }
`;

const Title = styled.p`
  overflow: hidden;
  padding: 10px;
  font-size: 2rem;
  color: #fff;
  word-break: keep-all;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #fff;

  ${media.desktop`
    font-size: 1.6rem;
  `}
`;

const EventItem = ({ ticket, category, onSelectTicket, selectTicket }) => {
  return (
    <Item
      isSelect={selectTicket && selectTicket.ticket.id === ticket.id}
      onClick={() => onSelectTicket(ticket, category)}
    >
      <ImgBox>
        <img src={ticket.image} alt={ticket.title} />
      </ImgBox>
      <Title>{ticket.title}</Title>
    </Item>
  );
};

export default EventItem;
