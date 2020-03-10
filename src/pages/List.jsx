import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';

const ListSection = styled.section`
  padding: 60px;
  min-height: 100vh;
`;

const SectionTitle = styled.h2`
  font-size: 3rem;
`;

const List = props => {
  const location = useLocation();
  const [category, setCategory] = useState();

  useEffect(() => {
    const name = location.pathname.replace('/list/', '');
    if (name === 'free') setCategory('무료 이벤트');
    if (name === 'charge') setCategory('유료 이벤트');
    if (name === 'other') setCategory('외부 이벤트');
  }, [location]);

  return (
    <>
      <Header />
      <ListSection>
        <SectionTitle>{category}에 참여해보세요!</SectionTitle>
      </ListSection>
    </>
  );
};

export default List;
