import React from 'react';
import { Link } from "react-router-dom";
import S from "./style";
import SignUpForm from './SignUpForm';

const Signup = () => {
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
      <SignUpForm />
      </S.ContentWrapper>
    </S.Container>
  );
};

export default Signup;