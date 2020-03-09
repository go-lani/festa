import React from 'react';
import Header from '../components/Header';
import styled from 'styled-components';
import media from '../libs/MediaQuery';
import EventSection from '../components/Event/EventSection';

const VisualArea = styled.section`
  display: flex;
  align-items: center;
  height: 80vh;
  margin: -70px 0 0;
  padding: 70px;
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
  return (
    <>
      <Header />
      <VisualArea>
        <VisualTitle>
          이벤트를 만나는
          <br />
          가장 쉬운 방법!
        </VisualTitle>
      </VisualArea>
      <EventSection title="무료 이벤트" />
      <EventSection title="유료 이벤트" />
      <EventSection title="외부 이벤트" />
    </>
  );
};

export default Home;
