import styled from 'styled-components';
import { flexCenterColumn } from '../../global/common';

const L = {};

L.LoginContainer = styled.div`
  display: flex;
  z-index: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
  height: 100vh;
  gap: 80px; // 왼쪽-오른쪽 간격
  padding: 0 40px; // 작은 화면에서도 보이게
`;

L.Form = styled.form`
  width: 100%;
  max-width: 423px;
  padding: 53px 68px 58px;
  display: flex;
  flex-direction: column;
  /* gap: 24px; */
`;

L.Label = styled.label`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

// 왼쪽 이미지랑 로고 영역

// 로고
L.Logo = styled.img`
  width: 100%;
  height: 100%;
`;

// 로고아래 텍스트
L.LoginSubText = styled.span`
  color: #282828;
  font-size: 20px;
  font-family: Pretendard;
  font-weight: 500;
  line-height: 30px;
  word-wrap: break-word;
`;

// 로고 + 텍스트 섹션
L.LoginLeftBox = styled.div`
  width: 320px;
  ${flexCenterColumn}
  gap: 12px;
`;


// 오른쪽 흰색 로그인 영역
// 1-2-3 섹션
L.FormSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 44px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;


L.Label = styled.div`
  width: 423px;
  margin-bottom: 30px;
  
  &:last-child {
    margin-bottom: 0;
  }
`

L.LoginRightBox = styled.div`
  background-color: white;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  display: inline-flex;
  gap: 44px;
`;


// 1번섹션
L.Title = styled.h1`
  font-size: 40px;
  font-weight: bold;
  color: #282828;
  margin-bottom: 8px;
`

// 일반텍스트 스타일 (Welcome to daywrite! + 아직 회원이 아니신가요?)
L.StyledSpan = styled.p`
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

// 2번섹션
// 텍스트필드 타이틀
L.LabelText = styled.span`
  color: #282828;
  font-size: 16px;
  font-family: Pretendard;
  font-weight: 600;
  line-height: 20px;
  word-wrap: break-word;
`;

// 텍스트필드 인풋박스
L.Input = styled.input`
  width: 423px;
  padding: 17px 45px 17px 16px;
  outline: 0.5px solid ${({ hasError, isEmpty }) =>
    hasError && !isEmpty ? '#EB5757' : '#282828'};  outline-offset: -0.5px;
  border: none;
  background-color: white;
  box-sizing: border-box;
  margin-top: 9px;
  display: block;

  font-size: 16px;
  font-family: Pretendard;
  font-weight: 400;
  line-height: 24px;

  &::placeholder {
    color: #BFBFBF;
    font-size: 16px;
    font-family: Pretendard;
    font-weight: 400;
    line-height: 24px;
  }
`;

// 텍스트필드 오류시 하단 메세지
L.ConfirmMessage = styled.p`
  color: #EB5757;
  font-size: 12px;
  font-family: Pretendard;
  font-weight: 400;
  padding-top: 5px;
`

// 비밀번호 input + icon
L.PasswordWrapper = styled.div`
  position: relative;
  width: 100%;
`;

// 비밀번호 + 비밀번호확인 사이 간격
L.PasswordWrapperLabel = styled.div`
  gap: 18px;
`

// input박스 안 icon 사이즈
L.ToggleButton = styled.button`
  position: absolute;
  top: 50%;
  right: 16px;
  transform: translateY(-50%);
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

// 2번섹션 하단
// 아이디저장 + 비밀번호찾기 텍스트 스타일
L.CommonSubText = styled.span`
  color: #787878;
  font-size: 13px;
  font-family: Pretendard;
  font-weight: 500;
  line-height: 19px;
  word-wrap: break-word;
`;

// 비밀번호 하단: 아이디 저장, 비밀번호 찾기 영역
L.LoginExtras = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 24px;
`;

// 왼쪽 체크박스 영역
L.RememberMe = styled.label`
  display: flex;
  align-items: center;

  input {
    margin: 0;
  }

  span {
    ${L.CommonSubText}
  }
`;

// 오른쪽 비밀번호 찾기 버튼
L.FindPassword = styled.button`
  background: none;
  ${L.CommonSubText}
`;


// 회원가입유도 질문 + 버튼 스타일 wrap   --- 로그인에 있는 아직회원이 아니신가요? 회원가입 
L.SignupWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 24px;
`;

// 로그인유도 질문 + 버튼 스타일 wrap   --- 회원가입에 있는 이미회원이신가요? 로그인
L.LoginWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 4px;
`


// 인증 필드와 버튼을 가로로 배치하는 wrapper
L.InputWithBtn = styled.div`
  align-self: stretch;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  display: inline-flex;
`;

// 작은사이즈 버튼 스타일(인증번호 전송, 재전송, 확인 / 닉네임 중복확인)
L.SmallButton = styled.button`
  align-self: stretch;
  height: 60px;
  padding: 17px 184px;
  background: #282828;
  justify-content: center;
  align-items: center;
  display: inline-flex;
  gap: 10px;
  &:disabled {
    background-color: #BFBFBF;
    cursor: not-allowed;
  }
`;

// 작은사이즈 버튼 텍스트 스타일
L.SmallButtonText = styled.span`
  color: white;
  font-size: 13px;
  font-family: Pretendard;
  font-weight: 500;
  line-height: 19px;
  word-wrap: break-word;
`;

// 체크박스 영역 (약관 동의)
L.CheckboxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 32px;
`;

// 전체 동의 + 더보기 열기 버튼 있는 줄
L.AgreementHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// 더보기 버튼
L.ToggleMoreButton = styled.button`
  font-size: 14px;
  background: none;
  border: none;
  cursor: pointer;
  font-weight: 500;
`;

// 개별 체크 항목
L.AgreementItem = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
`;


export default L;