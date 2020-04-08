![festa-mock](https://user-images.githubusercontent.com/28818698/78741780-3c7af300-7995-11ea-9e69-a14058b98f60.png)

<hr />

# Festa Code Review

**구현항목**

1. 로그인 페이지
   - 최초 입력 시 계정이 존재하는지 체크 후 로그인/회원가입 분기 처리
   - 회원가입 후 로그인 UI 전환
   - 로그인 후 상태 값 저장 및 메인 페이지 전환
2. 메인 페이지
   - 무료/유료/외부 이벤트 카테고리 분류하여 노출
   - 이벤트 클릭 시 이벤트 상세 정보 노출
   - 자세히 보기 클릭 시 해당 카테고리 리스트 페이지 라우팅
3. 리스트 페이지
   - Query String에 따른 리스트 노출
   - pagination 처리
4. 상세 페이지
   - 해당 콘텐츠의 id 값에 대한 상세 데이터 노출
5. 키워드 팝업
   - 로그인이 되어있는지 체크 후 노출, 미 로그인 시 경고창 노출
   - 최초 해당 유저가 등록한 키워드를 노출
   - 키워드 등록 및 삭제

------

## 1. 로그인 페이지

### 1-1. 최초 입력 시 계정이 존재하는지 체크 후 로그인/회원가입 분기 처리

![festa-source02](https://user-images.githubusercontent.com/28818698/78741833-5ddbdf00-7995-11ea-86b5-58908f9c9919.png)

<br />

#### 1-1-1 최초 접근시 SignIn Intro 노출

/src/pages/SignIn.jsx

```jsx
const SignIn = props => {
  	const history = useHistory();
    const introEmailInput = useRef();
  	const [email, setEmail] = useState();
    const [isIntro, setIntro] = useState(true);
    ...
    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            history.push('/');
            return alert('이미 로그인되어 있습니다.');
        }
    }, [history]);
	...
    const writeEmail = e => {
        const email = e.target.value.trim();
        setEmail(email);
    };
    ...
    return (
        ...
        <Form
            onSubmit={e => {
                e.preventDefault();
            }}
            >
            {isIntro && (
                <>
                <FieldSet>
                    <A11yTitle as="legend">로그인/회원가입 영역</A11yTitle>
                    <InputBox>
                        <label htmlFor="email">아이디</label>
                        <Input
                            type="text"
                            ref={introEmailInput}
                            id="email"
                            onChange={writeEmail}
                            />
                    </InputBox>
                </FieldSet>
                <SubmitButton type="button" onClick={checkUser}>
                    로그인 또는 가입하기
                </SubmitButton>
                </>
            )}
            ...
        </Form>
        ...
    )
}
```

1. SignIn 페이지 접근시 Didmount 시점에 localStorage에 token값의 여부를 판단
2. isIntro 라는 state를 사용하여 intro UI을 노출시켰습니다.

2. 시멘틱한 마크업을 구현하기 위해 Form 태그를 사용했지만 기본 기능인 onSubmit 기능은 따로 필요하지 않아 onSubmit의 기본 기능을 블로킹해주었습니다.
3. email input에 change 이벤트가 일어날때 `email`이라는 상태에 값을 앞, 뒤 띄어쓰기를 제거하여 저장하였습니다.

 <br />

#### 1-1-2 이메일 존재 여부에 따른 UI 분기 처리

/src/pages/SignIn.jsx

```jsx
...

const [isExist, setExist] = useState();

...

const checkUser = async () => {
    const validate = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,4}$/i;

    if (!email) return alert('이메일을 작성해주세요.');
    if (!validate.test(email)) return alert('이메일 형식을 확인해주세요.');

    try {
        const { data } = await axios.get(
            'https://festacrawling.xyz/members/check-user',
            {
                params: {
                    email,
                },
            },
        );

        setIntro(false);
        setExist(data.isExist);
    } catch (error) {
        console.log(error);
    }
};

...
```

1. 로그인 또는 가입하기 버튼을 클릭하면 checkUser라는 함수가 호출되는데 이때 `email`상태에 값이 있는지 체크하여 1차로 유/무를 판단하였습니다.

2. 만약 email의 값이 있다면 정규표현식을 사용하여 email 형식인지 아닌지 유효성 검사를 해주었습니다.

3. 값의 유/무와 유효성 검사를 통과했다면 api를 호출하여 가입을 원하는 email의 존재 유무를 체크해주었습니다.

   - 존재하는 이메일의 경우 Response 값

     ![1586248236545](https://user-images.githubusercontent.com/28818698/78741893-82d05200-7995-11ea-93b9-ada9ae6e6cbc.png)

   - 존재하지 않은 이메일의 경우 Response 값

     ![1586248171713](https://user-images.githubusercontent.com/28818698/78741896-84017f00-7995-11ea-8152-5e2a4a5c701b.png)

4. Response 값을 받아 `Exist`라는 상태에 저장하여 해당 상황에 맞는 UI를 표현해주었습니다.

   /src/pages/SignIn.jsx

   ```jsx
   ...
   <Form
       onSubmit={e => {
           e.preventDefault();
       }}
       >
       ...
       {!isIntro && isExist && (
           <>
           <FieldSet>
               <legend>로그인을 해주세요</legend>
               <InputBox>
                   <label htmlFor="signin-email">이메일</label>
                   <Input
                       type="email"
                       id="signin-email"
                       value={email}
                       readOnly
                       />
               </InputBox>
               <InputBox>
                   <label htmlFor="signin-password">비밀번호</label>
                   <Input
                       type="password"
                       ref={signInPasswordInput}
                       id="signin-password"
                       />
               </InputBox>
           </FieldSet>
           <SubmitButton type="button" onClick={checkSignIn}>
               로그인
           </SubmitButton>
           </>
       )}
       {!isIntro && !isExist && (
           <>
           <FieldSet>
               <legend>회원가입을 해주세요</legend>
               <InputBox>
                   <label htmlFor="signup-email">이메일</label>
                   <Input
                       type="email"
                       id="signup-email"
                       value={email}
                       readOnly
                       />
               </InputBox>
               <InputBox>
                   <label htmlFor="signup-username">사용자 이름</label>
                   <Input
                       type="text"
                       id="signup-username"
                       ref={signUpUsernameInput}
                       />
               </InputBox>
               <InputBox>
                   <label htmlFor="signup-password">비밀번호</label>
                   <Input
                       type="password"
                       id="signup-password"
                       ref={signUpPasswordInput}
                       />
               </InputBox>
           </FieldSet>
           <SubmitButton type="button" onClick={checkSignUp}>
               가입하기
           </SubmitButton>
           </>
       )}
   </Form>
   ...
   ```

<br />

### 1-2. 회원가입 후 로그인 UI로 전환

/src/pages/SignIn.jsx

```jsx
...
const signUpUsernameInput = useRef();
const signUpPasswordInput = useRef();

const checkSignUp = async () => {
    const username = signUpUsernameInput.current.value.trim();
    const password = signUpPasswordInput.current.value;

    if (!username || !password) return alert('작성 값을 다시 확인해주세요.');

    try {
        const { data } = await axios.post(
            'https://festacrawling.xyz/members/create-user/',
            {
                email,
                username,
                password,
            },
        );

        if (data.detail) setExist(true);
    } catch (error) {
        console.log(error.response.data);
    }
};
...
```

1. input의 값을 받아와서 빈 값일 경우 경고창 노출
2. 값이 있는 경우 해당 하는 값과 `email` 상태의 값을 활용하여 서버에 요청하여 저장
3. `exist`의 상태 값을 true로 바꾸어 로그인 UI로 전환

<br />

### 1-3.  로그인 후 상태 값 저장 및 메인 페이지 전환

/src/pages/SignIn.jsx

```jsx
...
const history = useHistory();
const { addUser } = useContext(UserContext);
...
const checkSignIn = async () => {
    const password = signInPasswordInput.current.value;

    if (!password) return alert('비밀번호를 다시 확인해주세요.');

    try {
        const { data } = await axios.post(
            'https://festacrawling.xyz/members/auth-token/',
            {
                email,
                password,
            },
        );

        localStorage.setItem('token', data.token);

        addUser({
            username: data.user.username,
            email: data.user.email,
        });

        history.push('/');
    } catch (error) {
        if (error.response.data.detail)
            return alert('비밀번호가 틀렸습니다. 다시 확인해주세요');
    }
};
...
```

1. password의 값 유/무 체크

2. `email`과 `password`의 값을 서버에 전달하여 비밀번호가 유효한지 체크(이때, 이메일을 체크하지 않는 이유는 이미 회원가입 루트 또는 인트로 페이지에서 해당 계정의 유/무를 체크하였기때문에 별도로 필요하지 않다고 판단했습니다.)

3. 만약 올바른 요청이 되었다면 다음과 같은 Response 데이터를 전달해줍니다.

   ![1586251739707](https://user-images.githubusercontent.com/28818698/78741937-9c719980-7995-11ea-8f0b-0d3f3d6b6194.png)

4. `token`은 localStroage에 저장해주었고, username과 email은 전역적으로 사용하기 위해 Context API를 활용하여 전역 상태로 저장했습니다.

   /src/App.jsx

   ```jsx
   function App() {
     ...
     const [user, setUser] = useState({
       username: null,
       email: null,
     });

     const userState = {
       user,
       addUser: info => {
         setUser(info);
       },
       removeUser: () => {
         setUser({
           username: null,
           email: null,
         });
       },
     };

     ...
     return (
         ...
         <UserContext.Provider value={userState}>
             ...
         </UserContext.Provider>
         ...
     );
   }
   ```

   ![festa-source04](https://user-images.githubusercontent.com/28818698/78741962-a98e8880-7995-11ea-9457-f34da82df59c.png)

5. history.push로 메인 화면으로 전환합니다.

6. 올바른 요청이 아니라면 경고창으로 비밀번호가 틀렸다는 것을 알렸습니다.

<br />

## 2. 메인 페이지

### 2-1. 무료/유료/외부 이벤트 카테고리 분류하여 노출

#### 2-1-1. 컨텐츠(무료/유료/외부 이벤트) 렌더링

/src/pages/Home.jsx

```jsx
const Home = props => {
  const [allTicket, setAllTicket] = useState({
    free: null,
    pay: null,
    exterior: null,
  });

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
      ...
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
```

1. useEffect를 통하여 컴포넌트가 최초 렌더링 되었을때 `renderTicket` 함수를 호출하여 모든 티켓 정보를 `allTicket`이라는 상태에 객체로 저장하여 관리했습니다. 이때 `setAllTicket`에서 prev state를 사용한 이유는 useEffect에서 `renderTicket` 함수를 호출할때 의존성 배열을 없애기 위함입니다.

2. 각각의 카테고리 섹션은 하나의 컴포넌트로 관리하였습니다.

   /src/components/Event/EventSection.jsx

   ```jsx
   ...
   const EventSection = React.memo(
     ({ category, ticketData, onSelectTicket, selectTicket }) => {
       const [title, setTitle] = useState();

       useEffect(() => {
         if (category === 'free') setTitle('무료 이벤트');
         else if (category === 'pay') setTitle('유료 이벤트');
         else if (category === 'exterior') setTitle('외부 이벤트');
       }, [category]);

       return (
         <EventArea>
           <TitleArea>
             <CategoryTitle>{title}</CategoryTitle>
             <Link to={`/list/${category}?page=1`}>전체보기</Link>
           </TitleArea>
           <EventSlider
             ticketItems={ticketData}
             onSelectTicket={onSelectTicket}
             category={category}
             selectTicket={selectTicket}
           />
           {selectTicket && category === selectTicket.category && (
             <EventDetail
               ticket={selectTicket}
               onSelectTicket={onSelectTicket}
               category={category}
             />
           )}
         </EventArea>
       );
     },
   );
   ```

   2-1. useEffect내에서 props로 받아온 category를 `title`상태로 다시 가공한 이유는 API 호출할때는 영문으로 하였고, 화면상에서는 국문으로 노출시키기 위해서 재가공을 하였습니다.

   2-2. react-slick 라이브러리를 활용한 EventSlider에 `ticketItems`를 넘겨주었습니다.

   2-3. EventDetail 컴포넌트는 이벤트 티켓 클릭시 상세정보를 보여주는 컴포넌트입니다. EventSection 컴포넌트마다 내부에 들어가 있는 이유는 UI 구조상 내부에 존재하는 것이 레이아웃을 표현하기 수월하다고 생각하여 각 EventSection 마다 존재하도록 구현하였습니다.

3. 카테고리 섹션의 props

   - `category` : 섹션 타이틀을 표시하기 위한 props
   - `ticketData`: 각각의 ticket의 데이터를 전달
   - `selectTicket`: 선택된 ticket에 대한 데이터를 전달
   - `onSelectTicket`: 선택한 ticket에 대한 정보를 담기 위한 함수 전달

<br />

### 2-2.  이벤트 클릭 시 이벤트 상세 정보 노출

![festa-source06](https://user-images.githubusercontent.com/28818698/78741970-b01d0000-7995-11ea-800a-ae019aa88dcf.png)

/src/pages/Home.jsx

```jsx
...
const Home = props => {
  const [selectTicket, setSelectTicket] = useState();
  ...
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
  ...
  return (
    <>
      ...
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
```

/src/components/Event/EventItem.jsx

```jsx
...
const EventItem = ({ ticket, category, onSelectTicket, selectTicket }) => {
  return (
    <Item
      isSelect={selectTicket && selectTicket.ticket.id === ticket.id}
      onClick={() => onSelectTicket(ticket, category)}
    >
      <ImgBox>
        <img src={ticket.image} alt={ticket.title} />
      </ImgBox>
      <Title>{ticket.title}</Title>
    </Item>
  );
};
```

1. Home.jsx로 부터 Props로 전달받은 onSelectTicket 함수에 파라미터로 `ticket(현재 ticket의 정보)`와 `category(EventSection별로 Detail 컴포넌트를 포함하고있어 category를 구분하여 해당 category의 Detail만 노출하기 위함)`를 전달하였습니다. ContextAPI를 활용하여 onSelectTicket을 Props로 전달하지 않은 이유는 해당 프로젝트의 규모가 크다고 가정하였을때 공통적으로 쓰이지 않을 함수라고 판단하였기 때문입니다.

<br />

### 2-3.  자세히 보기 클릭 시 해당 카테고리 리스트 페이지 라우팅

![festa-source07](https://user-images.githubusercontent.com/28818698/78741990-be6b1c00-7995-11ea-9df9-9182e1fd6338.png)

/src/components/Event/EventSection.jsx

```jsx
...
const EventSection = React.memo(
  ({ category, ticketData, onSelectTicket, selectTicket }) => {
    ...
    return (
      <EventArea>
        <TitleArea>
          <CategoryTitle>{title}</CategoryTitle>
          <Link to={`/list/${category}?page=1`}>전체보기</Link>
        </TitleArea>
        <EventSlider
          ticketItems={ticketData}
          onSelectTicket={onSelectTicket}
          category={category}
          selectTicket={selectTicket}
        />
        {selectTicket && category === selectTicket.category && (
          <EventDetail
            ticket={selectTicket}
            onSelectTicket={onSelectTicket}
            category={category}
          />
        )}
      </EventArea>
    );
  },
);
```

1. react-router-dom의 Link 컴포넌트를 활용하여 라우팅 처리하였습니다.

<br />

## 3. 리스트 페이지

![1586313026262](https://user-images.githubusercontent.com/28818698/78742009-cb880b00-7995-11ea-98b8-c5e53751989a.png)

### 3-1. Query String 및 Path 파라미터에 따른 리스트 노출

#### 3-1-1. list render

/src/pages/List.jsx

```jsx
...
const renderList = useCallback(async () => {
    const { page } = qs.parse(location.search);
    const name = location.pathname.replace('/list/', '');
    setCategory(name);

    if (name === 'free') setCategoryTitle('무료 이벤트');
    if (name === 'pay') setCategoryTitle('유료 이벤트');
    if (name === 'exterior') setCategoryTitle('외부 이벤트');

    try {
        if (category) {
            setLoading(true);
            const { data } = await axios.get(
                'https://festacrawling.xyz/festalist',
                {
                    params: {
                        category,
                        page,
                        size: 8,
                    },
                },
            );

            if (data.count > 8) {
                if (data.count % 8) {
                    const totalCount = Math.floor(data.count / 8) + 1;
                    renderPager(totalCount);
                } else {
                    renderPager(Math.floor(data.count / 8));
                }
            } else {
                renderPager(1);
            }

            setTicketLists(data.results);
        }
    } catch (error) {
        console.log(error);
    }
}, [category, location.pathname, location.search, renderPager]);
...

useEffect(() => {
    renderList();
}, [renderList]);
```

1. path 파라미터를 해석하여 `category` 상태에 넣어주고, query string 파라미터를 해석하여 page의 카운트를 뽑아서 이를 데이터 요청에 사용했습니다. size는 8개씩 받아오게끔 제한을 두었습니다.

2. 데이터의 생김새는 다음과 같습니다.

   ![1586309744276](https://user-images.githubusercontent.com/28818698/78742020-d6db3680-7995-11ea-8fa9-849d53c8d95e.png)

   `count`: 데이터의 총 개수

   `next`: next page 요청 url

   `previous`: previous page 요청 url

   `result`: 현재 요청에 대한 data

3. 페이저 함수 호출
   1. data.count의 총 갯수를 파악하여 최소 값(8개) 보다 작다면 renderPager 함수를 호출할때 파라미터로 1을 넘겨주고,
   2. 8로 나누었을때 나머지가 있다면 data.count에 8을 나누어 + 1 값을 renderPager 함수의 파라미터로 넘겨주었습니다.
   3. 8로 나누었을때 나머지가 없다면 data.count에 8을 나눈 값을 renderPager 함수의 파라미터로 넘겨주었습니다.
4. `ticketLists` 상태에 results 값을 저장했습니다.

<br />

#### 3-1-2. pager render

/src/pages/List.jsx

```jsx
...
const renderPager = useCallback(
    total => {
        const { page } = qs.parse(location.search);
        const totalPager = [];
        let num = total % 5 ? Math.floor(total / 5) + 1 : Math.floor(total / 5);

        for (let i = 1; i <= num; i++) {
            const detail = [];

            if (total % 5) {
                if (i === num) {
                    for (let j = 1; j <= total % 5; j++) {
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
        setCurrentPager(totalPager[Math.ceil(page / 5 - 1)]);
        setPageCount(Math.ceil(page / 5 - 1));

        setTimeout(() => {
            setLoading(false);
        }, 500);
    },
    [location.search],
);
...
```

1.  함수를 호출하며 인수로 전달받은 total(데이터를 8개씩 나눈 카운트)를 받아서 5(pagination의 화면에 표시될 최대 개수)를 나누어 줍니다.

   1. 나머지가 없다면 나눈 값을 저장
   2. 나머지가 있다면 나눈 값 + 1을 저장 (예를들어. 6이 들어왔을때 최대 페이징은 5개 노출인데  1이 넘치게 되므로 +1 을 해주는 것)

2. totalPager 변수에 계산된 num 만큼 for 문을 실행하여 `totalPager`, `currentPager`, `pageCount`를 계산하여 상태로 저장해줬습니다.

   1. 예를들어 num이 2이고 total이 6이라고 가정했을 경우

      ```jsx
      ...
      // num이 2, total이 6일 경우
      for (let i = 1; i <= num; i++) {
          const detail = [];
          if (total % 5) {
              if (i === num) {
              	// i = 2, num = 2 이므로 두번째 순환에선 이곳을 순환
                  for (let j = 1; j <= total % 5; j++) {
                      detail.push((i - 1) * 5 + j);
                  	// total(6) % 5은 1이므로 1번 순환하여 [6]
                  	// 두번째 순환 detail = [6]
                  }
              } else {
                  // i = 1, num = 2 이므로 첫번째 순환에선 이곳을 순환
                  for (let j = 1; j <= 5; j++) {
                      detail.push((i - 1) * 5 + j);
                  	// 첫번째 순환 detail = [1, 2, 3, 4, 5]
                  }
              }
          } else {
              for (let j = 1; j <= 5; j++) {
                  detail.push((i - 1) * 5 + j);
              }
          }
          totalPager.push(detail);
          // 첫번째 순환 totalPager = [[1,2,3,4,5]]
          // 두번째 순환 totalPager = [[1,2,3,4,5], [6]]
      }
      ...
      ```

3. 마지막으로 상태에 저장후 0.5초 딜레이를 주어 loading을 false하여 UI를 표현해주었습니다.

<br />

### 3-2. pagination 처리

![festa-source09](https://user-images.githubusercontent.com/28818698/78742026-de9adb00-7995-11ea-9050-e9f5a496e734.png)

#### 3-2-1. 이전, 다음 page 처리

/src/pages/List.jsx

```jsx
...
const prevPage = () => {
    if (!pageCount) return alert('첫 페이지입니다');

    setPageCount((prev) => prev - 1);
};

const nextPage = () => {
    if (totalPager.length === pageCount + 1)
        return alert('마지막 페이지입니다');

    setPageCount((prev) => prev + 1);
};

const changePage = useCallback(
    (count) => {
        const name = location.pathname.replace('/list/', '');
        history.push(`/list/${name}?page=${count}`);
    },
    [location.pathname, history],
);

useEffect(() => {
    if (pageCount !== undefined) setCurrentPager(totalPager[pageCount]);
}, [pageCount, totalPager]);

useEffect(() => {
    const { page } = qs.parse(location.search);

    setPageNumber(+page);
}, [location.search]);

...
    <Pagenation>
    <PrevButton onClick={prevPage}>이전</PrevButton>
    <PagingList>
        {currentPager &&
            currentPager.map((pager) => {
            return (
                <Paging key={uuidv4()}>
                    <Pager
                        isSelect={pager === pageNumber}
                        onClick={() => changePage(pager)}
                        >
                        {pager}
                    </Pager>
                </Paging>
            );
        })}
    </PagingList>
    <NextButton onClick={nextPage}>다음</NextButton>
</Pagenation>
    ...
```

1. 이전, 다음 버튼 클릭시 `setPageCount`를 호출하여 이전 값을 받아 +- 해주었습니다.

2. 변경된 pageCount를 useEffect로 감지하여 `currentPager`의 상태도 변경해주어 UI가 그려지게 작업했습니다.

3. pager 클릭시 changePage 함수를 호출하며 파라미터로 페이저의 number를 전달했습니다.

   1. number를 인수로 받은 changePage 함수 내부에서는 history.push 를 통해 url을 변경하였습니다.

4. url이 변경되면 location.pathname을 의존성배열로 감지하여 renderlist 함수가 재호출되어 리렌더링되는 식으로 구현했습니다.

   ```jsx
   const renderList = useCallback(async () => {
       ...
   }, [category, location.pathname, location.search, renderPager]);

   useEffect(() => {
       renderList();
   }, [renderList]);
   ```

<br />

## 4. 상세 페이지

### 4-1. 해당 콘텐츠의 id 값에 대한 상세 데이터 노출

![festa-source10](https://user-images.githubusercontent.com/28818698/78742030-e22e6200-7995-11ea-87d3-f2e6f16e5a4f.png)

/src/components/Event/EventListItem.jsx

```jsx
<Item>
    <Link to={`/view?category=${category}&detail=${id}`}>
        <ImgBox image={image} isEnd={apply === '이벤트 종료'} />
        <InfoBox>
            <Date>{date}</Date>
            <Title>{title}</Title>
            <Host>{host}</Host>
        </InfoBox>
        <PriceInfoBox>
            <Price>
                {category === 'free' && <em>무료</em>}
                {category === 'exterior' && <em>외부이벤트</em>}
                {category === 'pay' &&
                    priceInfo.map(info => (
                    <div>
                        <em>{info.price}</em>
                    </div>
                ))[0]}
            </Price>
        </PriceInfoBox>
    </Link>
</Item>
```

1. 해당 리스트 아이템을 클릭할때 react-router-dom의 Link 컴포넌트를 활용하여 url을 라우팅 처리하였습니다.

   /src/App.jsx

   ```jsx
   <BrowserRouter>
       <Switch>
           <Route path="/list" component={List}></Route>
           <Route path="/view" component={View}></Route>
           <Route path="/signin" component={SignIn}></Route>
           <Route exact path="/" component={Home}></Route>
           <Route component={NotFound} />
       </Switch>
   </BrowserRouter>
   ```

/src/pages/View.jsx

```jsx
...
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
```

1. query string을 통하여 detail Id를 받아 서버에 요청을 하여 데이터를 받았습니다.
2. 받은 데이터를 해당 카테고리에 맞게 분기처리하여 UI를 구현했습니다.

​	<br />

## 5. 키워드 팝업

![festa-source11](https://user-images.githubusercontent.com/28818698/78742058-f4a89b80-7995-11ea-8650-f36fe0a2bdb0.png)

### 5-1. 로그인이 되어있는지 체크 후 노출, 미 로그인 시 경고창 노출

/src/components/Header/index.jsx

```jsx
...
const Header = props => {
  const { user } = useContext(UserContext);
  const [isSignIn, setSignIn] = useState(false);
  const [isMain, setIsMain] = useState();
  const [keyWordVisible, setKeyWordVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (localStorage.getItem('token') && user.username && user.email)
      setSignIn(true);
    else setSignIn(false);
  }, [user]);

  useEffect(() => {
    const { pathname } = location;

    if (pathname === '/') setIsMain(true);
    else setIsMain(false);
  }, [location]);

  const setAlram = () => {
    if (isSignIn) setKeyWordVisible(true);
    else alert('로그인이 필요한 기능입니다.');
  };

  const hideKeywordPopup = () => {
    setKeyWordVisible(false);
  };

  const signOut = async () => {
    const token = localStorage.getItem('token');

    try {
      const { data } = await axios.get(
        'https://festacrawling.xyz/members/logout-user/',
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        },
      );

      if (data.detail === '로그아웃 하셨습니다.') {
        localStorage.removeItem('token');
        setSignIn(false);
      }
    } catch (error) {
      console.log(error.response.data.detail);
    }
  };

  return (
    <>
      <HeaderWrapper isMain={isMain}>
        <Logo>
          <Link to="/">
            <img src="/images/logo.png" alt="Festa!" />
          </Link>
        </Logo>
        <Menu>
          <KeywordAlarm onClick={setAlram}>
            <img src="/images/alram.png" alt="알람설정" />
          </KeywordAlarm>
          <LoginMenu>
            {isSignIn ? (
              <>
                <Greeting>
                  <Member>{user.username}</Member>님 어서오세요!
                </Greeting>
                <SignOut type="button" onClick={signOut}>
                  로그아웃
                </SignOut>
              </>
            ) : (
              <Link to="/signin" className="signin-button">
                로그인
              </Link>
            )}
          </LoginMenu>
        </Menu>
      </HeaderWrapper>
      <KeywordPopup visible={keyWordVisible} hide={hideKeywordPopup} />
    </>
  );
};
export default Header;
```

1. useEffect를 통해서 렌더링시 localStorage 와 ContextAPI내  상태를 체크하여 로그인 여부를 `isSignIn` 상태에 boolean값으로 저장했습니다.
2. 알림 버튼을 누르면 `setAlram` 함수가 호출되는데 내부에서 if 문으로 isSignIn의 값을 통하여 분기처리하였습니다.
   1. isSinIn이 true라면 keyWordVisible의 값을 true로 바꿔 팝업을 노출
   2. isSinIn이 false라면 alert

<br />

### 5-2. 최초 해당 유저가 등록한 키워드를 노출

/src/components/Header/KeywordPopup.jsx

```jsx
...
const token = localStorage.getItem('token');
const [keywords, setKeywords] = useState();

const getKeyword = useCallback(async () => {
    try {
        const { data } = await axios.get(
            'https://festacrawling.xyz/festalist/keyword/',
            {
                headers: {
                    Authorization: `Token ${token}`,
                },
            },
        );

        setKeywords(data.keywords);
    } catch (error) {
        console.log(error);
    }
}, [token]);

useEffect(() => {
    if (visible) {
        getKeyword();
    }
}, [visible, getKeyword]);
...
```

1. 팝업 컴포넌트가 Didmount되면 useEffect가 실행되면서 getKeyword 함수가 호출됩니다.
2. getKeyword 함수내에서 token 값을 이용하여 계정에 등록되어있는 키워드를 받아와 `keywords` 상태에 저장하여 활용했습니다.

<br />

### 5-3. 키워드 등록 및 삭제

/src/components/Header/KeywordPopup.jsx

```jsx
...
const addKeyword = useCallback(
    async keyword => {
        try {
            const { data } = await axios.post(
                'https://festacrawling.xyz/festalist/keyword/',
                {
                    keyword,
                },
                {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                },
            );

            if (keywords.length === data.keywords.length)
                return alert('이미 등록된 키워드입니다.');

            setKeywords(data.keywords);
        } catch (error) {
            console.log(error);
        }
    },
    [keywords, token],
);

const deleteKeyword = async id => {
    try {
        const { data } = await axios.delete(
            `https://festacrawling.xyz/festalist/keyword/${id}/`,
            {
                headers: {
                    Authorization: `Token ${token}`,
                },
            },
        );

        setKeywords(data.keywords);
    } catch (error) {
        console.log(error);
    }
};

const submitKeyword = () => {
    const keyword = keywordInput.current.value.trim();
    if (keyword === '') return alert('키워드를 입력해주세요');

    addKeyword(keyword);
    keywordInput.current.value = '';
    keywordInput.current.focus();
};

return (
    <Popup visible={visible} hide={hide}>
        <Title>알림 받으실 키워드를 등록해주세요</Title>
        <RegisterBox>
            <Input type="text" ref={keywordInput} placeholder="ex) node.js" />
            <SubmitButton type="button" onClick={submitKeyword}>
                등록
            </SubmitButton>
        </RegisterBox>
        <KeywordListBox>
            <Notice>현재 등록하신 키워드</Notice>
            <KeywordList>
                {keywords &&
                    keywords.map(keyword => (
                    <Keyword key={uuidv4()}>
                        {keyword.keyword}
                        <button type="button" onClick={() => deleteKeyword(keyword.id)}>
                            <img src="/images/close-white-40x40.png" alt="삭제" />
                        </button>
                    </Keyword>
                ))}
            </KeywordList>
        </KeywordListBox>
    </Popup>
);
...
```

#### 5-3-1. 키워드 등록

1. 키워드를 등록할때는 `submitKeyword` 함수가 호출되어 유효성 검사합니다.
2. 검사에 통과되면 해당 값을 `addKeyword` 함수의 파라미터로 넘기면서 호출합니다.
3. `addKeyword` 함수 내부에서 token과 함께 keyword를 넘겨주는데 이때 따로 중복된 키워드가 있는지 여부를 서버쪽에서 에러메시지를 전달하지 않고, 중복된 키워드를 오버라이딩해주는 로직으로 구현되어있어 length로 접근하여 중복된 키워드를 체크하였습니다.
4. 올바르게 등록이 되었다면 `setKeywords`를 통해 추가된 keyword를 등록했습니다.

<br />

#### 5-3-2. 키워드 삭제

1. 각각의 키워드에는 id 값이 있는 이를 활용하여 token 값과 함께 서버에 요청을 보내 삭제했습니다.
2. 삭제된 배열을 response data로 넘겨주는데 이를 `setKeywords` 통해 `keywords` 상태에 저장하여 사용했습니다.