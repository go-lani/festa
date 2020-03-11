import React from 'react';
import styled, { css } from 'styled-components';

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

  &:hover {
    img {
      transform: scale(1.04);
    }
  }
`;

const ImgBox = styled.div`
  overflow: hidden;
  img {
    width: 100%;
    transform: scale(1);
    transition: all 0.8s;
  }
`;

const Title = styled.p`
  overflow: hidden;
  padding: 10px;
  font-size: 1.6rem;
  color: #fff;
  word-break: keep-all;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #fff;
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
