import React from 'react';
import { filledButtonCSS } from '../../components/button/style';
import C from '../auth/category.container.form.style';
import BasicButton from '../../components/button/BasicButton'
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import CategorySelect from './CategorySelect';
import { Navigate, useNavigate } from 'react-router-dom';



const keywordOptions = [
  ['사랑', '기분좋은', '위로', '평온', '짜증나는'],
  ['센치한', '이별', '걱정되는', '설렘', '우울한']
];

const genreOptions = [
  ['소설', '시', '에세이', '철학', '과학'],
  ['사회', '문화', '역사', '종교']
];


const CategoryContainerForm = () => {
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  const {
    register, handleSubmit, getValues, formState: {isSubmitting, isSubmitted, errors }
  } = useForm({ mode: "onSubmit" })

  // 버튼 누르면 필사 화면으로 이동
  // 최소 선택해야 하는 조건 추가
  const navigate =useNavigate();
  
  const onSubmit = async (data) => {
    if(selectedKeywords.length === 0) {
      alert("키워드를 최소 1개 이상 선택해주세요!");
      return;
    }
    if (selectedGenres.length === 0){
      alert("장르를 최소 1개 이상 선택해주세요!")
      return;
    }

    navigate("/category/typing", {
      state: {
        keywords: selectedKeywords,
        genres : selectedGenres,
      }
    });
  };




  // 최대 3개까지 선택 허용하는
  const toggleKeyword = (item) => {
    setSelectedKeywords((prev) => {
      if (prev.includes(item)) {
        return prev.filter((i) => i !== item); 
      } else {
        if (prev.length >= 3) {
          alert('키워드는 최대 3개까지만 선택할 수 있어요!');
          return prev; 
        }
        return [...prev, item]; 
      } 
    });
  };
  const toggleGenre = (item) => {
    setSelectedGenres((prev) => {
      if(prev.includes(item)) {
        return prev.filter((i) => i !== item);
      }
      else {
        if(prev.length >= 2){
          alert('장르는 최대 2개까지만 선택할 수 있어요!');
          return prev;
        }
        return [...prev, item];
      }
    });
  }




  return (
    <C.CategoryContainer>

      <C.CategoryLeftBox>
        <C.Logo src="/assets/images/logo.png" alt="logo" />
        <C.CategorySubText>글과 음악이 함께하는 공간.</C.CategorySubText>
      </C.CategoryLeftBox>


      <C.CategoryRightBox>
        <C.CategoryForm onSubmit={handleSubmit(onSubmit)}>
        <C.CategoryWrapper>
          <C.CategoryWrap>
            <C.CategoryTitle>마음에 드는 키워드를 골라보세요</C.CategoryTitle>
            <CategorySelect
              options={keywordOptions}
              selectedOptions={selectedKeywords}
              onToggle={toggleKeyword}
            />
          </C.CategoryWrap>
          <C.CategoryWrap>
            <C.CategoryTitle>글의 장르를 골라보세요.</C.CategoryTitle>
            <CategorySelect
              options={genreOptions}
              selectedOptions={selectedGenres}
              onToggle={toggleGenre}
            />
          </C.CategoryWrap>
        </C.CategoryWrapper>

        <BasicButton customStyle={filledButtonCSS}>나에게 맞는 글 불러오기</BasicButton>
      </C.CategoryForm>
      </C.CategoryRightBox>


    </C.CategoryContainer>
  );
};

export default CategoryContainerForm;