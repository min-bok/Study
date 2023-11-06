### Access Token이 유효한 경우에만 접근이 가능한 마이페이지를 만들어주세요 ☺️

1. 로그인하여 Access Token을 발급받습니다.
2. 마이페이지 접속시 header에 Access Token을 담아보냅니다. Access Token이 유효한 경우에만 마이페이지에 접근이 가능합니다.
3. 마이페이지에 접속하면 "반갑습니다, {유저이메일}님!"이 화면에 출력되도록 해주세요.

### 구현되어야할 엔드 포인트는 아래와 같습니다.

```py
/account/join # 회원가입
/account/login # 로그인
/account/logout # 로그아웃
/account/mypage # 로그인한 사용자만 확인가능
```
