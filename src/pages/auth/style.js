import styled from 'styled-components';

const S = {};

// 전체 뷰 고정
S.Container = styled.div`
  width: 100%;
  min-height: 100dvh; /* 모바일 높이 대응 */
  position: relative;
  background: transparent; /* 배경 가리지 않도록 */
`;

/* 배경 이미지 (컨텍스트 값 반영) */
S.Background = styled.div`
  position: fixed;        /* 스크롤과 무관하게 고정 */
  inset: 0;
  background-image: url(${p => p.$bg || '/assets/images/background/snow.jpg'}); /* ← 변경 포인트 */
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  z-index: -1;            /* 내용/헤더 뒤로 보내기 */
`;

/* 고정 헤더 (컴포넌트 Header를 쓰면 이건 안 써도 됨) */
S.Header = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
`;

S.HeaderContent = styled.div`
  width: 1250px;
  margin: 0 auto;
  padding: 24px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

S.Logo = styled.img`
  height: 30px;
`;

S.Nav = styled.nav`
  display: flex;
  gap: 50px;

  a {
    font-size: 20px;
    font-weight: 400;
    color: #282828;
    text-decoration: none;

    &:hover {
      color: #f26c44;
    }
  }
`;

S.Login = styled.div`
  margin-right: 8px;
  a {
    font-size: 20px;
    font-weight: 400;
    color: #282828;
    text-decoration: none;

    &:hover {
      color: #f26c44;
    }
  }
`;

/* 로그인/회원가입 영역 */
S.ContentWrapper = styled.div`
  position: relative;
  z-index: 1;            /* 배경 위에 오도록 */
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100dvh;
`;

export default S;
