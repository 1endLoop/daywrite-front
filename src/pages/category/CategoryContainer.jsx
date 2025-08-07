import React from "react";
import CategoryContainerForm from "./CategoryContainerForm";
import S from "./style";
import Header from "../../components/Header";
import { useBackground } from "../../contexts/BackgroundContext";

const CategoryContainer = () => {
  const { backgroundImage } = useBackground();

  return (
    <S.Container>
      <S.Background $bg={backgroundImage || "/assets/images/background/snow.jpg"} />

      <Header/>

      <S.ContentWrapper>
      <CategoryContainerForm />
      </S.ContentWrapper>
    </S.Container>
  );
};

export default CategoryContainer;
