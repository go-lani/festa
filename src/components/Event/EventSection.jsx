import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const EventArea = styled.section`
  padding: 60px;
`;

const TitleArea = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 0 10px;
  border-bottom: 2px solid #fff;

  a {
    background: none;
    border: none;
    font-size: 1.4rem;
  }
`;

const CategoryTitle = styled.h2`
  font-size: 2.5rem;
`;

const EventSection = React.memo(props => {
  const [path, setPath] = useState();

  useEffect(() => {
    if (props.category === '무료') setPath('free');
    else if (props.category === '유료') setPath('charge');
    else if (props.category === '외부') setPath('other');
  }, [props.category]);

  return (
    <EventArea>
      <TitleArea>
        <CategoryTitle>{props.category} 이벤트</CategoryTitle>
        <Link to={`/list/${path}`}>전체보기</Link>
      </TitleArea>
    </EventArea>
  );
});

export default EventSection;
