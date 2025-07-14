import React from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import S from './style';

const MyPageContainer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    return (
      location.pathname === `/mypage/${path}` ||
      location.pathname.startsWith(`/mypage/${path}/`)
    );
  };

  return (
    <S.Wrapper>
      <S.Sidebar>
        <S.Title>MY PAGE</S.Title>

        <S.MenuSection>
          <S.MenuItem
            active={location.pathname === '/mypage'}
            onClick={() => navigate('/mypage')}
          >
            내 프로필
          </S.MenuItem>
          <S.MenuItem
            active={isActive('typing-setting')}
            onClick={() => navigate('/mypage/typing-setting')}
          >
            타이핑 화면세팅
          </S.MenuItem>
          <S.MenuItem
            active={isActive('user-info')}
            onClick={() => navigate('/mypage/user-info')}
          >
            개인정보 수정
          </S.MenuItem>
          <S.MenuItem
            active={isActive('data')}
            onClick={() => navigate('/mypage/data')}
          >
            카테고리 데이터
          </S.MenuItem>
        </S.MenuSection>

        <S.Divider />

        <S.MenuSection>
          <S.MenuItem
            active={isActive('notice')}
            onClick={() => navigate('/mypage/notice')}
          >
            공지사항
          </S.MenuItem>
          <S.MenuItem
            active={isActive('faq')}
            onClick={() => navigate('/mypage/faq')}
          >
            FAQ
          </S.MenuItem>
          <S.MenuItem
            active={isActive('inquiry')}
            onClick={() => navigate('/mypage/inquiry')}
          >
            1:1 문의하기
          </S.MenuItem>
          <S.MenuItem
            active={isActive('terms')}
            onClick={() => navigate('/mypage/terms')}
          >
            약관
          </S.MenuItem>
        </S.MenuSection>

        <S.Bottom />
      </S.Sidebar>

      <S.Content>
        <Outlet />
      </S.Content>
    </S.Wrapper>
  );
};

export default MyPageContainer;

