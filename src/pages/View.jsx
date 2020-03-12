import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import qs from 'query-string';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import Header from '../components/Header';
import A11yTitle from '../components/Common/A11yTitle';
import media from '../libs/MediaQuery';

const ViewSection = styled.section`
  max-width: 1024px;
  margin: 0 auto;
  padding: 30px 0;
`;

const InfoArea = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 0 0 20px;
  margin: 0 0 40px;
  border-bottom: 1px dotted #fff;

  ${media.desktop`
    flex-direction: row;
    flex-wrap: nowrap;
  `}
`;

const ImgBox = styled.div`
  width: 100%;
  padding: 0 30px;

  img {
    width: 100%;
  }

  ${media.desktop`
    width: 70%;
    padding: 20px;
  `}
`;

const InfoBox = styled.div`
  width: 100%;
  padding: 30px;

  ${media.desktop`
    width: 30%;
    padding: 20px;
  `}
`;

const Title = styled.h3`
  margin: 0 0 20px;
  padding: 0 0 20px;
  border-bottom: 1px dotted #fff;
  font-weight: 700;
  font-size: 4rem;
  word-break: keep-all;

  ${media.desktop`
    font-size: 3rem;
  `}
`;

const DateArea = styled.div`
  margin: 0 0 30px;
`;

const DateTitle = styled.p`
  margin: 0 0 10px;
  font-weight: 700;
  font-size: 2rem;

  ${media.desktop`
    font-size: 1.8rem;
  `}
`;

const Date = styled.p`
  font-size: 1.8rem;
  word-break: keep-all;

  ${media.desktop`
    font-size: 1.6rem;
  `}
`;

const HostArea = styled.div`
  margin: 0 0 30px;
`;

const HostTitle = styled(DateTitle)``;
const Host = styled(Date)``;
const PriceArea = styled.div``;
const PriceTitle = styled(DateTitle)``;

const Price = styled.div`
  p {
    font-size: 1.8rem;
  }

  div {
    margin: 10px 0 0;
    font-size: 1.8rem;

    em {
      font-weight: 700;
      margin: 0 0 0 5px;
    }
  }

  div:first-child {
    margin: 0;
  }

  ${media.desktop`
    p {
      font-size: 1.6rem;
    }

    div {
      font-size: 1.6rem;
    }
  `}
`;

const BuyArea = styled.div`
  margin: 50px 0 0;

  button {
    width: 100%;
    padding: 20px 0;
    background: #fe2d54;
    border: none;
    font-size: 1.8rem;
  }

  a {
    display: block;
    padding: 20px 0;
    background: #fe2d54;
    border: none;
    font-size: 1.8rem;
    text-align: center;
  }
`;

const DetailArea = styled.div`
  padding: 0 15%;
  font-size: 1.8rem;
  text-align: center;

  img {
    width: 100%;
  }

  ${media.desktop`
    font-size: 1.6rem;
  `}
`;

const View = props => {
  const [detailInfo, setDetailInfo] = useState();
  const [category, setCategory] = useState();
  const location = useLocation();

  useEffect(() => {
    const { category } = qs.parse(location.search);
    setCategory(category);
  }, [location.search]);

  const getData = async detail => {
    try {
      const { data } = await axios.get(
        `https://festacrawling.xyz/festalist/${detail}`,
      );

      setDetailInfo(data.detail);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const { detail } = qs.parse(location.search);
    getData(detail);
  }, [location.search]);

  return (
    <>
      <Header />
      {detailInfo && (
        <>
          <ViewSection>
            <A11yTitle>이벤트 상세보기</A11yTitle>
            <InfoArea>
              <ImgBox>
                <img src={detailInfo.image} alt="" />
              </ImgBox>
              <InfoBox>
                <Title>{detailInfo.title}</Title>
                <DateArea>
                  <DateTitle>일시</DateTitle>
                  <Date>{detailInfo.date}</Date>
                </DateArea>
                <HostArea>
                  <HostTitle>주최</HostTitle>
                  <Host>{detailInfo.host}</Host>
                </HostArea>
                <PriceArea>
                  <PriceTitle>가격</PriceTitle>
                  <Price>
                    {category === 'free' && <p>무료</p>}
                    {category === 'exterior' && <p>외부이벤트</p>}
                    {category === 'pay' &&
                      JSON.parse(detailInfo.tickets).map(info => (
                        <div key={uuidv4()}>
                          <span>{info.name}:</span>
                          <em>{info.price}</em>
                        </div>
                      ))}
                  </Price>
                </PriceArea>
                <BuyArea>
                  {category === 'free' && <button>티켓 구매</button>}
                  {category === 'pay' && <button>티켓 구매</button>}
                  {category === 'exterior' && (
                    <a
                      href={detailInfo.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      외부이벤트
                    </a>
                  )}
                </BuyArea>
              </InfoBox>
            </InfoArea>
            <DetailArea
              dangerouslySetInnerHTML={{ __html: detailInfo.content }}
            />
          </ViewSection>
        </>
      )}
    </>
  );
};

export default View;
