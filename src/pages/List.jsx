import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import qs from 'query-string';
import styled from 'styled-components';
import Header from '../components/Header';
import { v4 as uuidv4 } from 'uuid';
import EventListItem from '../components/Event/EventListItem';
import media from '../libs/MediaQuery';
import axios from 'axios';

const ListSection = styled.section`
  padding: 60px;
  min-height: 100vh;

  ${media.mobile`
    padding: 30px;
  `}
`;

const SectionTitle = styled.h2`
  margin: 0 0 40px;
  font-size: 3rem;
  word-break: keep-all;
`;

const EventList = styled.ul`
  &:after {
    display: block;
    content: '';
    clear: both;
  }
`;

const Pagenation = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px 0 0;
`;

const PageButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border: 1px solid #436eef;
  text-indent: -9999em;
  background-color: transparent;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 40% auto;
`;

const PrevButton = styled(PageButton)`
  background-image: url('/images/arr-white-left-30x26.png');
`;

const NextButton = styled(PageButton)`
  background-image: url('/images/arr-white-right-30x26.png');
`;

const PagingList = styled.ul`
  overflow: hidden;
  margin: 0 10px;
`;

const Paging = styled.li`
  float: left;
  & + & {
    margin: 0 0 0 5px;
  }
`;

const Pager = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border: 1px solid #436eef;
  background: none;
  font-size: 1.4rem;
  color: #fff;
`;

const List = props => {
  const location = useLocation();
  const [categoryTitle, setCategoryTitLE] = useState();
  const [category, setCategory] = useState();
  const [ticketLists, setTicketLists] = useState();
  const [totalPager, setTotalPager] = useState();
  const [currentPager, setCurrentPager] = useState();
  const [pageCount, setPageCount] = useState(0);

  const renderPager = useCallback(
    total => {
      console.log(total);
      const totalPager = [];
      let num = 12 % 5 ? Math.floor(12 / 5) + 1 : Math.floor(12 / 5);
      console.log(num);

      for (let i = 1; i <= num; i++) {
        const detail = [];

        if (12 % 5) {
          if (i === num) {
            for (let j = 1; j <= 12 % 5; j++) {
              detail.push((i - 1) * 5 + j);
            }
          } else {
            for (let j = 1; j <= 5; j++) {
              detail.push((i - 1) * 5 + j);
            }
          }
        } else {
          for (let j = 1; j <= 5; j++) {
            detail.push((i - 1) * 5 + j);
          }
        }
        totalPager.push(detail);
      }

      setTotalPager(totalPager);
      setCurrentPager(totalPager[pageCount]);
    },
    [pageCount],
  );

  const renderList = useCallback(async () => {
    const { page } = qs.parse(location.search);
    const name = location.pathname.replace('/list/', '');

    setCategory(name);

    if (name === 'free') setCategoryTitLE('무료 이벤트');
    if (name === 'pay') setCategoryTitLE('유료 이벤트');
    if (name === 'exterior') setCategoryTitLE('외부 이벤트');

    try {
      if (category) {
        const { data } = await axios.get(
          'https://festacrawling.xyz/festalist',
          {
            params: {
              page,
              size: 8,
            },
          },
        );

        console.log(data);

        if (data.data.count % 8) {
          const totalCount = Math.floor(data.data.count / 8) + 1;
          // renderPager(totalCount);
        }

        setTicketLists(data.data.results);
      }
    } catch (error) {
      console.log(error);
    }
  }, [category, location.pathname, location.search, renderPager]);

  useEffect(() => {
    renderPager();
  }, [renderPager]);

  const prevPage = () => {
    if (!pageCount) return alert('첫 페이지입니다');

    setPageCount(prev => prev - 1);
    setCurrentPager(totalPager[pageCount]);
  };

  const nextPage = () => {
    if (totalPager.length === pageCount + 1)
      return alert('마지막 페이지입니다');
    setPageCount(prev => prev + 1);
    setCurrentPager(totalPager[pageCount]);
  };

  return (
    <>
      <Header />
      <ListSection>
        <SectionTitle>{categoryTitle}에 참여해보세요!</SectionTitle>
        <EventList>
          {ticketLists &&
            ticketLists.map(ticket => (
              <EventListItem key={uuidv4()} {...ticket} category={category} />
            ))}
        </EventList>
        <Pagenation>
          <PrevButton onClick={prevPage}>이전</PrevButton>
          <PagingList>
            {currentPager &&
              currentPager.map(pager => (
                <Paging key={uuidv4()}>
                  <Pager>{pager}</Pager>
                </Paging>
              ))}
          </PagingList>
          <NextButton onClick={nextPage}>다음</NextButton>
        </Pagenation>
      </ListSection>
    </>
  );
};

export default List;
