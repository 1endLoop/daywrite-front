import React from "react";
import S from "./style";
import TypingPage from "../category/TypingPage";
import Header from "../../components/Header";
import { useBackground } from "../../contexts/BackgroundContext";

const Main = () => {
  const { backgroundImage } = useBackground()

  return (
    <S.Container>
      <S.Background $bg={backgroundImage || "/assets/images/background/snow.jpg"} />

      <Header/>

      <S.ContentWrapper>
      <TypingPage />
      </S.ContentWrapper>
    </S.Container>
  );
};

export default Main;
