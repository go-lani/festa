import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import EventListItem from '../components/Event/EventListItem';

const ListSection = styled.section`
  padding: 60px;
  min-height: 100vh;
`;

const SectionTitle = styled.h2`
  font-size: 3rem;
  margin: 0 0 40px;
`;

const EventList = styled.ul``;

const List = props => {
  const location = useLocation();
  const [category, setCategory] = useState();

  useEffect(() => {
    const name = location.pathname.replace('/list/', '');

    if (name === 'free') setCategory('무료 이벤트');
    if (name === 'pay') setCategory('유료 이벤트');
    if (name === 'outerEvent') setCategory('외부 이벤트');
  }, [location]);

  return (
    <>
      <Header />
      <ListSection>
        <SectionTitle>{category}에 참여해보세요!</SectionTitle>
        <EventList>
          <EventListItem />
        </EventList>
      </ListSection>
    </>
  );
};

export default List;
