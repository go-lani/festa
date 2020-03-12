import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import A11yTitle from '../components/Common/A11yTitle';
import EventSection from '../components/Event/EventSection';
import media from '../libs/MediaQuery';
import axios from 'axios';

const VisualArea = styled.section`
  display: flex;
  align-items: center;
  height: 80vh;
  margin: -70px 0 0;
  padding: 70px 60px;
  background: url('/images/visual.jpg') center bottom no-repeat;
  background-size: cover;

  img {
    width: 100%;
  }

  ${media.mobile`
    margin: -110px 0 0;
    padding: 110px 30px;
  `}
`;

const VisualTitle = styled.strong`
  font-weight: 700;
  font-size: 6rem;

  ${media.tablet`
    font-size: 5.2rem;
  `}

  ${media.mobile`
    font-size: 4.6rem;
  `}
`;

const Home = props => {
  const [selectTicket, setSelectTicket] = useState();
  const [allTicket, setAllTicket] = useState({
    free: null,
    pay: null,
    exterior: null,
  });

  const onSelectTicket = (ticket, category) => {
    setSelectTicket(prev => {
      if (prev) {
        if (prev.ticket) {
          if (prev.ticket.id === ticket.id) return null;
          else return { ticket, category };
        }
      } else {
        return { ticket, category };
      }
    });
  };

  const renderTicket = async category => {
    const { data } = await axios.get('https://festacrawling.xyz/festalist', {
      params: {
        category,
        page: 1,
        size: 10,
      },
    });

    setAllTicket(prev => ({ ...prev, [category]: data.results }));
  };

  useEffect(() => {
    renderTicket('free');
    renderTicket('pay');
    renderTicket('exterior');
  }, []);

  return (
    <>
      <Header />
      <VisualArea>
        <A11yTitle>비주얼 영역</A11yTitle>
        <VisualTitle>
          이벤트를 만나는
          <br />
          가장 쉬운 방법!
        </VisualTitle>
      </VisualArea>
      <EventSection
        category="free"
        ticketData={allTicket && allTicket.free}
        selectTicket={selectTicket}
        onSelectTicket={onSelectTicket}
      />
      <EventSection
        category="pay"
        ticketData={allTicket && allTicket.pay}
        selectTicket={selectTicket}
        onSelectTicket={onSelectTicket}
      />
      <EventSection
        category="exterior"
        ticketData={allTicket && allTicket.exterior}
        selectTicket={selectTicket}
        onSelectTicket={onSelectTicket}
      />
    </>
  );
};

export default Home;
