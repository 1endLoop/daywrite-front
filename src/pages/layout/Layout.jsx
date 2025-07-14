import React from "react";
import { Link, Outlet } from "react-router-dom";
import S from "./style";
import { useBackground } from "../../contexts/BackgroundContext";

const Layout = () => {
  const { backgroundImage } = useBackground();

  return (
    <S.Container>
      <S.Background style={{ backgroundImage: `url(${backgroundImage})` }} />

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

      <S.Wrapper>
        <Outlet />
      </S.Wrapper>
    </S.Container>
  );
};

export default Layout;

