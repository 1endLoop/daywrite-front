import styled from 'styled-components';
import { flexCenterColumn, flexCenterRow, justifyContentLeft } from '../../global/common';

const S = {};

S.LoginContainer = styled.div`
  display: flex;
  z-index: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 110px);
  gap: 80px;
  padding: 0 40px;
`;


// 스크롤되어야 하는 내부 영역 (폼 영역)
S.ScrollSection = styled.div`
  overflow-y: auto;
  overflow-x: hidden; 
  padding: 0 16px 70px 0;
  box-sizing: border-box;
  width: 100%;
  height: 540px;
  scrollbar-gutter: stable;
`;

S.Form = styled.form`
  width: 100%;
  max-width: 440px;
  padding: 53px 46px 58px 68px;
  display: flex;
  flex-direction: column;
`;

// 왼쪽 이미지랑 로고 영역
// 로고
S.Logo = styled.img`
  width: 100%;
  height: 100%;
`;

// 로고아래 텍스트
S.LoginSubText = styled.span`
  color: #282828;
  font-size: 20px;
  font-family: Pretendard;
  font-weight: 500;
  line-height: 30px;
  word-wrap: break-word;
`;

// 로고 + 텍스트 섹션
S.LoginLeftBox = styled.div`
  width: 320px;
  ${flexCenterColumn}
  gap: 12px;
`;


// 오른쪽 흰색 로그인 영역
// 1-2-3 섹션
S.FormSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 44px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

S.Label = styled.label`
  width: 100%;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;

  &:last-child {
    margin-bottom: 0;
  }
`;

S.InsideLabel = styled.div`
  width: 423px;
  margin-bottom: 18px;
  display: flex;
  flex-direction: column;

  &:last-child {
    margin-bottom: 0;
  }
`

S.LoginRightBox = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 44px;

  height: 700px;
  max-height: 700px;
  min-height: 700px;
  overflow: hidden;
`;

S.Title = styled.h1`
  font-size: 40px;
  font-weight: bold;
  color: #282828;
  margin-bottom: 8px;
`

// 일반텍스트 스타일 (Welcome to daywrite! + 아직 회원이 아니신가요?)
S.StyledSpan = styled.p`
  color: #282828;
  font-size: 16px;
  font-family: Pretendard;
  font-weight: 400;
  line-height: 24px;
  word-wrap: break-word;

  &.signup {
    color: #282828;
    font-size: 16px;
    font-family: Pretendard;
    font-weight: 600;
    line-height: 24px;
    word-wrap: break-word;
    background: none;
  }
`

// 텍스트필드 타이틀
S.LabelText = styled.span`
  color: #282828;
  font-size: 16px;
  font-family: Pretendard;
  font-weight: 600;
  line-height: 20px;
  word-wrap: break-word;
`;

// 텍스트필드 인풋박스
S.Input = styled.input`
  width: 100%;
  max-width: 423px;
  height: 60px;
  padding: 17px 16px;
  outline: 0.5px solid ${({ hasError, isEmpty }) =>
    hasError && !isEmpty ? '#EB5757' : '#282828'};  
  outline-offset: -0.5px;
  border: none;
  background-color: white;
  box-sizing: border-box;
  margin-top: 9px;
  display: block;

  font-size: 16px;
  font-family: Pretendard;
  font-weight: 400;
  line-height: 24px;

  color: ${({ verified }) => (verified ? '#BFBFBF' : '#282828')};

  &::placeholder {
    color: #BFBFBF;
    font-size: 16px;
    font-family: Pretendard;
    font-weight: 400;
    line-height: 24px;
  }

  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px white inset !important;
    box-shadow: 0 0 0 1000px white inset !important;
    -webkit-text-fill-color: ${({ verified }) => (verified ? '#BFBFBF' : '#282828')} !important;
  }
`;

// 텍스트필드 오류시 하단 메세지
S.ConfirmMessage = styled.p`
  color: #EB5757;
  font-size: 12px;
  font-family: Pretendard;
  font-weight: 400;
  padding-top: 5px;
`

// 비밀번호 input + icon
S.PasswordWrapper = styled.div`
  position: relative;
  width: 100%;
`;

// input박스 안 icon 사이즈
S.ToggleButton = styled.button`
  position: absolute;
  top: 50%;
  right: 16px;
  transform: translateY(-30%);
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


// 회원가입유도 질문 + 버튼 스타일 wrap   --- 로그인에 있는 아직회원이 아니신가요? 회원가입 
S.SignupWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 24px;
`;

// 로그인유도 질문 + 버튼 스타일 wrap   --- 회원가입에 있는 이미회원이신가요? 로그인
S.LoginWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 4px;
`;

// 인증 필드와 버튼을 가로로 배치하는 wrapper
S.InputWithBtn = styled.div`
  display: flex;
  gap: 10px;
  align-items: flex-end;
  width: 100%;
  max-width: 423px;
  padding-right: 0;
`;

// 작은사이즈 버튼 스타일(인증번호 전송, 재전송, 확인 / 닉네임 중복확인)
S.SmallButton = styled.button`
  width: 78px;
  height: 60px;
  background: #282828;
  justify-content: center;
  align-items: center;
  display: inline-flex;
  &:disabled {
    background-color: #BFBFBF;
    cursor: not-allowed;
  }
`;

// 작은사이즈 버튼 텍스트 스타일
S.SmallButtonText = styled.span`
  color: white;
  font-size: 13px;
  font-family: Pretendard;
  font-weight: 500;
  line-height: 19px;
  word-wrap: break-word;
`;

// 모두 필수 입력란입니다.
S.StyledSpanSub = styled.span`
  color: #787878;
  font-size: 13px;
  font-family: Pretendard;
  font-weight: 500;
  line-height: 19px;
  word-wrap: break-word;
`;

// 모두 필수 입력란입니다 + 동의 체크란 영역 wrap


// 체크박스 영역 (약관 동의)
S.CheckboxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 10px 0 30px 0;
`;

// 전체 동의 + 더보기 열기 버튼 있는 줄
S.AgreementHeader = styled.div`
  ${justifyContentLeft}
`;

// 개별 체크 항목
S.AgreementItem = styled.label`
  font-size: 14px;
  padding-left: 14px;

  display: flex;
  flex-direction: column;
  gap: 6px;
`;

// 전체 > 버튼 스타일
S.TermsDetailButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  padding: 0;
  font-size: 14px;
  color: #888;
  cursor: pointer;

  img {
    width: 14px;
    height: 14px;
    display: block;
  }
`;

// 팝업 뒷배경 오버레이
S.PopupOverlay = styled.div`
  background: rgba(0, 0, 0, 0.30);
  backdrop-filter: blur(4px);
  position: fixed;
  /* top: 0;
  left: 0; */
  width: 100%;
  height: 100%;
  z-index: 9998;
`;

// 팝업 사이즈
S.PopupBox = styled.div`
  ${flexCenterColumn};
  width: 423px;
  padding: 58px 68px 50px 68px;
  background: white;
`

// 팝업 Header
S.PopupHeader = styled.div`
  align-self: stretch;
  justify-content: space-between;
  align-items: flex-start;
  display: inline-flex;
`

// 팝업 Content
S.PopupContent = styled.div`
  color: #282828;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  word-wrap: break-word;
`

// 팝업 타이틀
S.PopupTitle = styled.h3`
  color: #282828;
  font-size: 32px;
  font-weight: 700;
  line-height: 42px;
`;

// 팝업 닫기버튼
S.CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  position: absolute;
  top: 20px;
  right: 20px;

  img {
    width: 30px;
    height: 30px;
  }
`


export default S;