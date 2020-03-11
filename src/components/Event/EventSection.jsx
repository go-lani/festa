import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import EventSlider from './EventSlider';
import media from '../../libs/MediaQuery';
import EventDetail from './EventDetail';

const EventArea = styled.section`
  padding: 30px;

  ${media.desktop`
    padding: 60px;
  `}
`;

const TitleArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0 10px;
  margin: 0 0 20px;
  border-bottom: 2px solid #fff;

  a {
    padding: 5px;
    position: relative;
    background: none;
    border: none;
    font-size: 1.4rem;

    &:before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      border-radius: 4px;
      z-index: -1;
      background: #436eef;
      opacity: 0;
      transform: scale(0);
      transition: all 0.3s;
    }

    &:hover {
      &:before {
        opacity: 1;
        transform: scale(1);
      }
    }
  }
`;

const CategoryTitle = styled.h2`
  font-size: 2.5rem;
`;

const EventSection = React.memo(
  ({ category, ticketData, onSelectTicket, selectTicket }) => {
    const [title, setTitle] = useState();

    useEffect(() => {
      if (category === 'free') setTitle('무료 이벤트');
      else if (category === 'pay') setTitle('유료 이벤트');
      else if (category === 'outerEvent') setTitle('외부 이벤트');
    }, [category]);

    return (
      <EventArea>
        <TitleArea>
          <CategoryTitle>{title}</CategoryTitle>
          <Link to={`/list/${category}`}>전체보기</Link>
        </TitleArea>
        <EventSlider
          ticketItems={ticketData}
          onSelectTicket={onSelectTicket}
          category={category}
          selectTicket={selectTicket}
        />
        {selectTicket && category === selectTicket.category && (
          <EventDetail
            ticket={selectTicket}
            onSelectTicket={onSelectTicket}
            category={category}
          />
        )}
      </EventArea>
    );
  },
);

export default EventSection;
