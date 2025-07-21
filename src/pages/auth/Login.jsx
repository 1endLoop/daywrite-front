import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import S from "./style";
import LoginForm from "./LoginForm";
import axios from "axios";

const Login = () => {
  // const navigate = useNavigate();
  // const [userInfo, setUserInfo] = useState(null);
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   const checkLoginStatus = async () => {
  //     const jwtToken = localStorage.getItem('jwtToken');

  //     if (!jwtToken) {
  //       // 토큰이 없으면 로그인 페이지로 리다이렉트
  //       navigate('/login');
  //       return;
  //     }

  //     // 토큰이 있으면 유저 정보 가져오기
  //     try {
  //       const response = await axios.get('/api/userinfo', { // 유저 정보를 가져올 API 엔드포인트
  //         headers: {
  //           Authorization: `Bearer ${jwtToken}`, // JWT 토큰을 Authorization 헤더에 담아 전송
  //         },
  //       });
  //       setUserInfo(response.data); // 가져온 유저 정보를 상태에 저장
  //     } catch (error) {
  //       console.error('유저 정보를 가져오는 데 실패했습니다:', error);
  //       // 토큰이 유효하지 않거나 만료된 경우 (서버에서 401 Unauthorized 등의 응답을 줄 때)
  //       // localStorage에서 토큰 삭제 후 로그인 페이지로 리다이렉트
  //       localStorage.removeItem('jwtToken');
  //       navigate('/login');
  //     }
  //   };

  //   checkLoginStatus();
  // }, [navigate]); // navigate가 변경될 때마다 useEffect를 다시 실행하지 않도록 의존성 배열에 추가


  return (
    <S.Container>
      <S.Background />

      <S.Header>
        <S.HeaderContent>
          <Link to="/">
            <S.Logo src="/assets/images/logo.png" alt="logo" />
          </Link>

          <S.Nav>
            <Link to="/category">category</Link>
            <Link to="/archive">archive</Link>
            <Link to="/community">community</Link>
            <Link to="/mypage">my page</Link>
          </S.Nav>
          
          <S.Login>
            <Link to="/login">login</Link>
          </S.Login>
        </S.HeaderContent>
      </S.Header>
      <S.ContentWrapper>
      <LoginForm />
      </S.ContentWrapper>
    </S.Container>
  );
};

export default Login;

