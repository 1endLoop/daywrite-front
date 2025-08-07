import React from "react";
import { Outlet } from "react-router-dom";
import S from "./style";
import { useBackground } from "../../contexts/BackgroundContext";
import Header from "../../components/Header";

const Layout = () => {
  const { backgroundImage } = useBackground();

  return (
    <S.Container>
       <S.Background $bg={backgroundImage || "/assets/images/background/snow.jpg"} />

      <Header/>

      <S.Wrapper>
        <Outlet />
      </S.Wrapper>
    </S.Container>
  );
};

export default Layout;

