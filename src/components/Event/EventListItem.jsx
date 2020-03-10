import React from 'react';
import styled from 'styled-components';

const Item = styled.li`
  background: red;
`;

// "title":"이벤트 이름",
// "host":"이벤트 주최자",
// "date":"이벤트 날짜",
// "content":"이벤트 내용",
// "apply":"이벤트 신청 가능 상태: 외부등록/이벤트 종료/이벤트 신청",
// "tickets":"티켓 가격",
// "link":"외부이벤트 링크",
// "image":"이벤트 사진"

const EventListItem = props => {
  return <Item>타이틀</Item>;
};

export default EventListItem;
