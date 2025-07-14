import React from 'react';
import styled, { css } from "styled-components";
import { justifyContentCenter, justifyContentStart } from '../../global/common';

const sharedStyle = `
  font-size: 20px;
  font-family: Pretendard;
  font-weight: 600;
  line-height: 30px;
  letter-spacing: 0;
  word-break: break-word;
  white-space: pre-wrap;
`;


const M = { };

//가장 바깥
M.OuterWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  overflow-x: hidden;
  margin: 0;
  padding: 0;
`;

// 메인 컨테이너
M.Container = styled.div`
  width: 1200px;
  /* height: 550px; */
  padding: 32px 32px 32px 32px;
  border-radius: 5px;
  background: white;
  box-shadow: 0px 4px 64px rgba(0, 0, 0, 0.05);
  
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

//---------Content01---------------
M.Content01 = styled.div`
  align-self: stretch;
  justify-content: space-between;
  align-items: start;
  display: inline-flex;
`

M.TopHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0 16px;
  width: 100%;
`;

M.IconButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;

  img {
    width: 24px;
    height: 24px;
    display: block;
  }
`

M.TextBlock = styled.div`
  flex: 1;
  margin: 0 16px;
  min-width: 0;
`;

M.Heading = styled.h2`
  display: flex;
  align-items: center;
  font-size:26px;
  font-weight: 700;
  color: #282828;

  p {
    font-size: 21px;
    margin-left: 8px;
    font-weight: 500;
  }

  & > span {
    font-size: 14px;
    font-weight: 400;
    color: #787878;
  }
`;

M.TitleWrap = styled.div`
  ${justifyContentStart}
  gap: 5px;
  padding-bottom: 19px
`

M.TitleIconWrap = styled.div`
  gap: 18px;
  display: inline-flex;
  margin-left: auto ;
`

M.IcBtn = styled.button`
  all: unset;
  cursor: pointer;

  img {
    display: block;
    width: 24px;
    height: 24px;
  }
`;


// ------------------------------------------
M.Content02 = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 21px;
`

// 타이핑 스피드 부분 -----------------------------
M.TypingSpeedWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
`

// 게이지 전체 + 퍼센트
M.ProgressBarWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

// 퍼센트 왼쪽 게이지 감싸는 영역
M.ProgressBarContainer = styled.div`
  width: 1126px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-right: 14px;
`; 

// 게이지 자체
M.ProgressBar = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 14px;
`;

// 작은 네모
M.ProgressTick = styled.div`
  width: 1.5px;
  height: 7px;
  background: ${({ $active }) => ($active ? '#F96F3D' : '#282828')};
  opacity: ${({ $active }) => ($active ? 0.6 : 1)};
`;

// 큰 네모
M.ProgressPoint = styled.div`
  width: 7px;
  height: 7px;
  background: ${({ $active }) => ($active ? '#F96F3D' : '#BFBFBF')};
`;

// 퍼센트 전체 감싸는 래퍼 (가로 74px 고정)
M.ProgressPercentWrap = styled.div`
  width: 74px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 4px;
`;

// 막대
M.Bar = styled.div`
  width: 6px;
  height: 30px;
  background-color: #BFBFBF;
`;

// 회전된 삼각형
M.Triangle = styled.div`
  width: 0;
  height: 0;
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  border-bottom: 14px solid #787878;
  transform: rotate(-90deg);
`;

// 실제 퍼센트 텍스트
M.PercentText = styled.span`
  font-size: 16px;
  font-family: Pretendard;
  font-weight: 400;
  color: #F96F3D;
  line-height: 24px;
  text-align: right;
  padding-left: 10px;
`;

// 본문 내용 부분 --------------------------------
M.ContentBox = styled.div`
  width: 100%;
  height: 280px;
  overflow: hidden;
  padding-right: 4px;
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  color: #282828;
  font-size: 20px;
  font-family: Pretendard;
  font-weight: 600;
  line-height: 30px;
  word-wrap: break-word;
`;

M.UnderContent = styled.div`
  width: 100%;
  flex-direction: column;
  display: flex;
  gap: 15px;
`

// 실시간 컬러변경 -------------------------------------------------
M.TypingTextDisplay = styled.div`
  font-size: 20px;
  font-family: Pretendard;
  font-weight: 600;
  line-height: 30px;
  white-space: pre-wrap;
  word-wrap: break-word;
  z-index: 1;
`;


M.TypingOverlay = styled.div`
  position: absolute;
  pointer-events: none;
  color: transparent;
  z-index: 1;

  span {
    color: inherit;
    white-space: pre-wrap;
  }
`;

M.HiddenInput = styled.textarea`
  position: absolute;
  width: calc(100% - 20px);
  height: calc(100% - 20px);
  border: none;
  background: transparent;
  color: transparent;
  caret-color: #282828;
  resize: none;
  font-size: 20px;
  line-height: 30px;
  font-family: Pretendard;
  z-index: 2;

  &:focus {
    outline: none;
  }
`;



// 음악, 출처, 버튼 -------------------------------------------------
M.Line = styled.div`
  align-self: stretch;
  height: 1px;
  background: #BFBFBF;
`

M.StyledUnder01 = styled.div`
  align-self: stretch;
  justify-content: space-between;
  align-items: center;
  display: inline-flex;
`

M.StyledUnder02 = styled.div`
  align-self: stretch;
  justify-content: space-between;
  align-items: flex-end;
  display: inline-flex;
`

M.SaveBtn = styled.div`
  width: 150px;
  height: 50px;
  background: #282828;
  justify-content: center;
  align-items: center;
  display: inline-flex;

  color: white;
  font-size: 18px;
  font-family: Pretendard;
  font-weight: 600;
  line-height: 30px;

  &:hover {
    background-color: #F96F3D;
  }

  &:active {
    background-color: #663C2D;
  }

  &:disabled {
    background-color: #BFBFBF;
    color: white;
    cursor: not-allowed;
  }
`

M.StyledMusic = styled.div`
  justify-content: flex-start;
  align-items: center;
  gap: 14px;
  display: inline-flex;
`


M.Album = styled.div`
  ${justifyContentStart}
  gap: 12px;
`

M.AlbumInfo = styled.div`
  ${justifyContentStart}
  gap: 8px;
`

M.AlbumImg = styled.img`
  width: 39px;
  height: 39px;
  border-radius: 1px;
  border: 0.50px #787878 solid;
`;

M.PlayListIconWrap = styled.div`
  ${justifyContentStart}
  gap: 30px;
`

M.PlayIconWrap = styled.div`
  ${justifyContentCenter}
  gap: 10px;
`

M.PlayIcon = styled.div`
  ${justifyContentCenter}
  gap: 10px;

  img{
  width: 30px;
  height: 30px;
  position: relative;
    }
`

M.PlayListWrap = styled.button`
  ${justifyContentCenter}
  background: none;
  gap: 6px;
`

M.ReplayBookIconWrap = styled.div`
  ${justifyContentStart}
  gap: 14px;
`

M.ReplayBtn = styled.button`
  width: 32px;
  height: 32px;
  background: none;
  padding: 6px;
  border-radius: 50px;
  outline: 1px #BFBFBF solid;
  outline-offset: -1px;
  ${justifyContentCenter}
  gap: 10px;
`


M.FadeWrapper = styled.div`
  opacity: ${({ $fade }) => ($fade ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
`
//-----------


M.CategoryInfoWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

M.SelectedInfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

M.SelectedTitle = styled.h5`
  font-size: 14px;
  font-weight: 500;
  color: #787878;
  display: flex;
  align-items: center;
  gap: 6px;
`;

M.EditIcon = styled.img`
  width: 14px;
  height: 14px;
  /* display: block; */
`;

M.KeywordList = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-size: 16px;
  color: #282828;
  font-weight: 600;

  span::after {
    content: "|";
    margin: 0 4px;
    color: #BFBFBF;
    margin-left: 4px;
  }

  span:last-child::after {
    content: "";
  }
`;


// 내가 선택한 카테고리 옆 edit 버튼
M.EditIconWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: 6px;

  img {
    display: block;
  }

  span {
    font-size: 12px;
    color: #787878;
    font-weight: 400;
    cursor: pointer;
    text-decoration: none;
  }
`;




export default M;