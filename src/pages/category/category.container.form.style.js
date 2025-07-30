import styled from "styled-components";
import { flexCenterColumn, justifyContentCenter } from '../../global/common';

const C = {};

C.CategoryContainer = styled.div`
  display: flex;
  z-index: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
  height: 100vh;
  gap: 80px; // 왼쪽-오른쪽 간격
  padding: 0 40px; // 작은 화면에서도 보이게
`

C.Form = styled.form`
  width: 100%;
  max-width: 423px;
  padding: 53px 68px 58px;
  display: flex;
  flex-direction: column;
`;

// 로고 + 텍스트 섹션
C.CategoryLeftBox = styled.div`
  width: 320px;
  ${flexCenterColumn}
  gap: 12px;
`;

// 로고
C.Logo = styled.img`
  width: 100%;
  height: 100%;
`;

// 로고아래 텍스트
C.CategorySubText = styled.span`
  color: #282828;
  font-size: 20px;
  font-family: Pretendard;
  font-weight: 500;
  line-height: 30px;
  word-wrap: break-word;
`;

C.CategoryRightBox = styled.div`
  background-color: white;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  display: inline-flex;
  gap: 44px;
`;

C.CategoryForm = styled.form`
  max-width: 423px;
  padding: 74px 80px 64px 80px;
  display: flex;
  flex-direction: column;
  gap: 64px;
`;

C.CategoryWrapper = styled.div`
  ${justifyContentCenter}
  align-self: stretch;
  flex-direction: column;
  gap: 60px;
`

C.CategoryWrap = styled.div`
  ${justifyContentCenter}
  align-self: stretch;
  flex-direction: column;
  gap: 24px;
`

C.CategoryTitle = styled.span`
  color: #282828;
  font-size: 22px;
  font-family: Pretendard;
  font-weight: 700;
  word-wrap: break-word;
`

C.OnOffBtnWrap = styled.div`
  ${justifyContentCenter}
  align-self: stretch;
  flex-direction: column;
  gap: 10px;
`

export default C;