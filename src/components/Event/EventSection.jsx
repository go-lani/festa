import React from 'react';
import styled from 'styled-components';

const EventArea = styled.section`
  padding: 60px;
`;

const TitleArea = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 0 10px;
  border-bottom: 2px solid #fff;
`;

const CategoryTitle = styled.p`
  font-size: 2.5rem;
`;

const More = styled.button`
  background: none;
  border: none;
  font-size: 1.4rem;
`;

const EventSection = props => {
  return (
    <EventArea>
      <TitleArea>
        <CategoryTitle>{props.title}</CategoryTitle>
        <More>전체보기</More>
      </TitleArea>
    </EventArea>
  );
};

export default EventSection;
