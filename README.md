# Festa

## 멤버
이철환(프론트엔드 개발), 박홍빈(백엔드 개발), 이도현(백엔드 개발), 오형근(백엔드 개발)

## 주제
크롤링한 Festa 데이터를 활용하여 Festa Clone

## 선정이유
Festa는 이벤트를 주최하고, 이벤트 참여 신청을 할 수 있는 사이트입니다.
하지만 각 종 이벤트를 확인해볼 수 있는데, 따로 알람 기능이 없어 매번 원하는 이벤트가 개최하는지 수시로 확인해야 되는 불편함이 있어
사용자가 원하는 키워드를 등록하면 키워드에 해당하는 이벤트 개최 시 이메일 알림을 제공해주는 기능을 추가하면 어떨까라고 생각하여 선정하였습니다.

## 로그인 페이지
- 최초 입력시 계정이 존재하는지 체크 후 로그인/회원가입 분기처리
- 회원가입 입력 후 > 로그인 UI 전환

## 메인 페이지
- 무료/유료/외부 이벤트 카테고리 분류하여 노출
- 이벤트 클릭 시 이벤트 상세 정보 노출
- 자세히 보기 클릭 시 해당 카테고리 상세페이지로 라우팅

## 리스트 페이지
- query string에 따른 리스트 노출
- pagination 처리

## 상세 페이지
- 해당 컨텐츠의 id 값을 가지고 상세 데이터를 노출

## 키워드 설정 팝업
- 로그인이 되어있는지 체크 후 노출, 미 로그인시 얼럿 노출
- 최초 해당 유저가 등록한 키워드를 노출
- 해당 유저의 키워드를 등록 및 삭제


## 활용 스펙

### Front-end 주요 스펙
1. HTML5
2. CSS3
3. Javascript
4. React

### Front-end 추가 스펙
1. react-router-dom
2. react-error-boundary
3. styled-components
4. uuid
5. axios
6. react-slick
7. slick-carousel
8. query-string
9. react-loader-spinner

### Back-end 주요 스펙

#### 애플리케이션
1. Python(Django, Django-Rest-Framework)

#### 서버 및 서버 배포
1. AWS(RDS, EC2, S3, SecretsManager)
2. Docker
3. Nginx
4. Gunicorn
5. Certbot, letsencrypt(인증기관)

#### 크롤링
1. Selenium
2. Scrapy