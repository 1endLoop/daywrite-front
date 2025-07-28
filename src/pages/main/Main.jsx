import React from "react";
import S from "./style";
import MainContainer from "./MainContainer";
import Header from "../../components/Header";

const Main = () => {
  return (
    <S.Container>
      <S.Background />

      <Header/>

      <S.ContentWrapper>
      <MainContainer />
      </S.ContentWrapper>
    </S.Container>
  );
};

export default Main;
