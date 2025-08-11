import React from "react";
import S from "./style";
import LoginForm from "./LoginForm";
import SignUpForm from './SignUpForm';
import Search from "./Search";
import Header from "../../components/Header";
import { useLocation } from "react-router-dom";
import { useBackground } from "../../contexts/BackgroundContext";


const Auth = () => {
  const { backgroundImage } = useBackground()
  const { pathname } = useLocation();
  const isLoginPage = pathname === "/login";
  const isSignUpPage = pathname === "/signup";
  const isSearchPage = pathname.startsWith("/search");

  return (
    <S.Container>
      <S.Background $bg={backgroundImage || "/assets/images/background/snow.jpg"} />

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