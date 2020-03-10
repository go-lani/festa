import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const EventArea = styled.section`
  padding: 60px;
`;

const TitleArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0 10px;
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

const EventSection = React.memo(props => {
  const [title, setTitle] = useState();

  useEffect(() => {
    if (props.category === 'free') setTitle('무료 이벤트');
    else if (props.category === 'pay') setTitle('유료 이벤트');
    else if (props.category === 'otherEvent') setTitle('외부 이벤트');
  }, [props.category]);

  return (
    <EventArea>
      <TitleArea>
        <CategoryTitle>{title}</CategoryTitle>
        <Link to={`/list/${props.category}`}>전체보기</Link>
      </TitleArea>
    </EventArea>
  );
});

export default EventSection;
