// components/button/PostTypeToggle.jsx
import React from "react";
import styled from "styled-components";

const PostTypeToggle = ({ isOriginal, onToggle }) => {
  return (
    <ToggleWrapper>
      <Slider active={isOriginal} />
      <Option active={isOriginal} onClick={() => onToggle(true)} position="left">
        창작글
      </Option>
      <Option active={!isOriginal} onClick={() => onToggle(false)} position="right">
        참조글
      </Option>
    </ToggleWrapper>
  );
};

export default PostTypeToggle;

// ✅ 스타일 영역 (기존 ToggleButton 복붙 후 텍스트만 수정)
const ToggleWrapper = styled.div`
  font-family: Pretendard;
  font-weight: 500;
  position: relative;
  width: 160px;
  height: 36px;
  background-color: #f96f3d;
  border-radius: 999px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px;
  box-sizing: border-box;
  cursor: pointer;
`;

const Slider = styled.div`
  position: absolute;
  top: 4px;
  left: ${({ active }) => (active ? "4px" : "calc(50%)")};
  width: calc(50% - 5px);
  height: 28px;
  background-color: #ffffff;
  border-radius: 999px;
  transition: left 0.3s ease;
  z-index: 1;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

const Option = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: 500;
  color: ${({ active }) => (active ? "#f96f3d" : "#ffffff")};
  z-index: 2;
  user-select: none;
  position: relative;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;