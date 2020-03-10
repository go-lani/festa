import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';

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

      <div>{category}</div>
    </>
  );
};

export default List;
