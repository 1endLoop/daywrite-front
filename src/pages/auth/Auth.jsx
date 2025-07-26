import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import S from "./style";
import LoginForm from "./LoginForm";
import SignUpForm from './SignUpForm';
import { useDispatch, useSelector } from "react-redux";
import { setUser, setUserStatus } from "../../modules/user/user";
import Search from "./Search";


const Auth = () => {
  const { pathname } = useLocation();
  const isLoginPage = pathname === "/login";
  const isSignUpPage = pathname === "/signup";
  const isSearchPage = pathname.startsWith("/search");

  const isLogin = useSelector((state) => state.user.isLogin); // 로그인 여부
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");     // 저장된 토큰 삭제
    dispatch(setUser(null));                 // 유저 정보 초기화
    dispatch(setUserStatus(false));          // 로그인 상태 false
    navigate("/");                           // 홈으로 이동
  };

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
            {isLogin ? (
              <button onClick={handleLogout} style={{all: 'unset', cursor: 'pointer'}}>
                logout
              </button>
            ) : (
              <Link to="/login">login</Link>
            )}
          </S.Login>

        </S.HeaderContent>
      </S.Header>
      <S.ContentWrapper>
        {isLoginPage && <LoginForm />}
        {isSignUpPage && <SignUpForm />}
        {isSearchPage && <Search />}
      </S.ContentWrapper>
    </S.Container>
  );
};

export default Auth;