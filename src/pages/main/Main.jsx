import React from "react";
import S from "./style";
import MainContainer from "./MainContainer";
import Header from "../../components/Header";
import { useBackground } from "../../contexts/BackgroundContext";


const Main = () => {

  const { backgroundImage } = useBackground()
  return (
    <S.Container>
      <S.Background $bg={backgroundImage || "/assets/images/background/snow.jpg"} />

      <Header/>

      <S.ContentWrapper>
      <MainContainer />
      </S.ContentWrapper>
    </S.Container>
  );
};

export default Main;
