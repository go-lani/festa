import React from 'react';
import styled from 'styled-components';

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
