import React, { useState } from "react";
import styled from "styled-components";
import CategorySelect from "./CategorySelect"; // 경로 확인 필요


const Overlay = styled.div`
  position: fixed;
  top: 0; left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const PopupContainer = styled.div`
  background: white;
  /* border-radius: 12px; */
  padding: 30px;
  width: 400px;
`;

const CloseButton = styled.button`
  float: right;
  font-size: 20px;
  background: none;
  border: none;
  cursor: pointer;
`;

const SaveButton = styled.button`
  margin-top: 20px;
  width: 100%;
  background-color: #282828;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.2s, transform 0.1s;

  &:hover {
    background-color: #F96F3D /* 조금 더 밝은 회색 */
  }

  &:active {
    transform: scale(0.97); /* 살짝 눌린 느낌 */
    background-color: #282828; /* 더 진한 색 */
  }
`;

const CategoryPopup = ({ onClose, onSave, defaultKeywords = [], defaultGenres = [] }) => {
  
  const [selectedKeywords, setSelectedKeywords] = useState(defaultKeywords);
  const [selectedGenres, setSelectedGenres] = useState(defaultGenres)
  
  const keywordOptions = [
    ['사랑', '기분좋은', '위로', '평온', '짜증나는'],
    ['센치한', '이별', '걱정되는', '설렘', '우울한']
  ];
  const genreOptions = [
    ['소설', '시', '에세이', '철학', '과학'],
    ['사회', '문화', '역사', '종교']
  ];

  const MAX_KEYWORDS = 3;
  const MAX_GENRES = 2;


  const toggleKeyword = (item) => {
    setSelectedKeywords((prev) => {
      const isSelected = prev.includes(item);
      if (isSelected) {
        return prev.filter((i) => i !== item); // 선택 해제
      } else {
        if (prev.length >= MAX_KEYWORDS) {
          alert(`키워드는 최대 ${MAX_KEYWORDS}개까지 선택할 수 있어요!`);
          return prev;
        }
        return [...prev, item];
      }
    });
  };

  const toggleGenre = (item) => {
    setSelectedGenres((prev) => {
      const isSelected = prev.includes(item);
      if (isSelected) {
        return prev.filter((i) => i !== item); // 선택 해제
      } else {
        if (prev.length >= MAX_GENRES) {
          alert(`장르는 최대 ${MAX_GENRES}개까지만 선택할 수 있어요!`);
          return prev;
        }
        return [...prev, item];
      }
    });
  };




  return (
    <Overlay onClick={onClose}>
      <PopupContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>

        <h3 style={{ marginBottom: "20px" }}>카테고리 수정</h3>

        <p style={{ marginBottom: "10px" }}>마음에 드는 키워드를 골라보세요.</p>
        <CategorySelect
          options={keywordOptions}
          selectedOptions={selectedKeywords}
          onToggle={toggleKeyword}
        />

        <p style={{ margin: "20px 0 10px" }}>글의 장르를 골라보세요.</p>
        <CategorySelect
          options={genreOptions}
          selectedOptions={selectedGenres}
          onToggle={toggleGenre}
        />

        <SaveButton onClick={() => {
          if(selectedKeywords.length === 0){
            alert("키워드를 최소 1개 이상 선택해주세요!");
            return;
          }
          if ( selectedGenres.length === 0){
            alert("장르를 최소 1개 이상 선택해주세요!")
            return
          }
          onSave(selectedKeywords, selectedGenres)
        } }>
          수정
        </SaveButton>
      </PopupContainer>
    </Overlay>
  );
};

export default CategoryPopup;
