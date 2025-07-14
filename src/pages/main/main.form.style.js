import React from "react";
import styled, { css } from "styled-components";
import { justifyContentCenter, justifyContentStart } from "../../global/common";

const sharedStyle = `
  font-size: 20px;
  font-family: Pretendard;
  font-weight: 600;
  line-height: 30px;
  letter-spacing: 0;
  word-break: break-word;
  white-space: pre-wrap;
`;

const M = {};

M.Container = styled.div`
  width: 1200px;
  height: 550px;
  padding: 32px 32px 30px 32px;
  border-radius: 5px;
  background: white;
  box-shadow: 0px 4px 64px rgba(0, 0, 0, 0.05);

  display: flex;
  flex-direction: column;
`;

// ------------------------------------------
M.Content01 = styled.div`
  align-self: stretch;
  justify-content: space-between;
  align-items: start;
  display: inline-flex;
`;

M.TitleWrap = styled.div`
  ${justifyContentStart}
  gap: 5px;
  padding-bottom: 19px;
`;

M.TitleIconWrap = styled.div`
  gap: 18px;
  display: inline-flex;
`;

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
  /* justify-content: space-between; */
  gap: 21px;
  overflow: hidden;
`;

// 타이핑 스피드 부분 -----------------------------
M.TypingSpeedWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

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
  background: ${({ $active }) => ($active ? "#F96F3D" : "#282828")};
  opacity: ${({ $active }) => ($active ? 0.6 : 1)};
`;

// 큰 네모
M.ProgressPoint = styled.div`
  width: 7px;
  height: 7px;
  background: ${({ $active }) => ($active ? "#F96F3D" : "#BFBFBF")};
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
  background-color: #bfbfbf;
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
  color: #f96f3d;
  line-height: 24px;
  text-align: right;
  padding-left: 10px;
`;

// 본문 내용 부분 --------------------------------
M.ContentBox = styled.div`
  width: 100%;
  height: 280px;
  overflow: hidden;
  /* padding-right: 4px; */
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
`;

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
  top: 0;
  left: 0;
  pointer-events: none;
  color: transparent;
  z-index: 1;
  letter-spacing: 0;

  span {
    color: inherit;
    white-space: pre-wrap;
  }
`;

M.HiddenInput = styled.textarea`
  position: absolute;
  top: 0;
  left: 0;
  /* width: calc(100% - 20px);
  height: calc(100% - 20px); */
  width: 100%;
  height: 100%;
  padding: 0;
  border: none;
  background: transparent;
  color: transparent;
  caret-color: #282828;
  resize: none;
  font-size: 20px;
  line-height: 30px;
  font-family: Pretendard;
  z-index: 2;
  letter-spacing: 0;

  &:focus {
    outline: none;
  }
`;

// 음악, 출처, 버튼 -------------------------------------------------
M.Line = styled.div`
  align-self: stretch;
  height: 1px;
  background: #bfbfbf;
`;

M.StyledUnder01 = styled.div`
  align-self: stretch;
  justify-content: space-between;
  align-items: center;
  display: inline-flex;
`;

M.StyledUnder02 = styled.div`
  align-self: stretch;
  justify-content: space-between;
  align-items: flex-end;
  display: inline-flex;
`;

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
    background-color: #f96f3d;
  }

  &:active {
    background-color: #663c2d;
  }

  &:disabled {
    background-color: #bfbfbf;
    color: white;
    cursor: not-allowed;
  }
`;

M.StyledMusic = styled.div`
  justify-content: flex-start;
  align-items: center;
  gap: 14px;
  display: inline-flex;
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
`;

M.Album = styled.div`
  ${justifyContentStart}
  gap: 12px;
`;

M.AlbumInfo = styled.div`
  ${justifyContentStart}
  gap: 8px;
`;

M.AlbumImg = styled.img`
  width: 39px;
  height: 39px;
  border-radius: 1px;
  border: 0.5px #787878 solid;
`;

M.PlayListIconWrap = styled.div`
  ${justifyContentStart}
  gap: 30px;
`;

M.PlayIconWrap = styled.div`
  ${justifyContentCenter}
  gap: 10px;
`;

M.PlayIcon = styled.div`
  ${justifyContentCenter}
  gap: 10px;

  img {
    width: 30px;
    height: 30px;
    position: relative;
  }
`;

M.PlayListWrap = styled.div`
  ${justifyContentCenter}
  background: none;
  gap: 6px;
`;

M.ReplayBookIconWrap = styled.div`
  ${justifyContentStart}
  gap: 14px;
`;

M.ReplayBtn = styled.button`
  width: 32px;
  height: 32px;
  background: none;
  padding: 6px;
  border-radius: 50px;
  outline: 1px #bfbfbf solid;
  outline-offset: -1px;
  ${justifyContentCenter}
  gap: 10px;
`;

M.BookmarkInfoWrap = styled.div`
  ${justifyContentCenter}
  gap: 10px;
`;

M.BookInfoWrapper = styled.div`
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  display: inline-flex;
`;

M.BookInfoWrap = styled.div`
  align-self: stretch;
  ${justifyContentStart}
  gap: 6px;
`;

M.FadeWrapper = styled.div`
  opacity: ${({ $fade }) => ($fade ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
`;

export default M;
