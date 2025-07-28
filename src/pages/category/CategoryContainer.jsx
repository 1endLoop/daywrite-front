import React from "react";
import CategoryContainerForm from "./CategoryContainerForm";
import S from "./style";
import Header from "../../components/Header";

const CategoryContainer = () => {
  return (
    <S.Container>
      <S.Background />

      <Header/>

      <S.ContentWrapper>
      <CategoryContainerForm />
      </S.ContentWrapper>
    </S.Container>
  );
};

export default CategoryContainer;
