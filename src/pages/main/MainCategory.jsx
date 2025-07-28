import React from "react";
import S from "./style";
import TypingPage from "../category/TypingPage";
import Header from "../../components/Header";

const Main = () => {
  return (
    <S.Container>
      <S.Background />

      <Header/>

      <S.ContentWrapper>
      <TypingPage />
      </S.ContentWrapper>
    </S.Container>
  );
};

export default Main;
