import React from "react";
import { useLocation } from "react-router-dom";
import S from "./style";
import LoginForm from "./LoginForm";
import SignUpForm from './SignUpForm';
import Search from "./Search";
import Header from "../../components/Header";


const Auth = () => {
  const { pathname } = useLocation();
  const isLoginPage = pathname === "/login";
  const isSignUpPage = pathname === "/signup";
  const isSearchPage = pathname.startsWith("/search");

  return (
    <S.Container>
      <S.Background />

      <Header/>
      
      <S.ContentWrapper>
        {isLoginPage && <LoginForm />}
        {isSignUpPage && <SignUpForm />}
        {isSearchPage && <Search />}
      </S.ContentWrapper>
    </S.Container>
  );
};

export default Auth;