// src/pages/community/CommunityContainer.jsx
import React from "react";
import { useLocation, Link, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import S from "../archive/history.style";

const CommunityContainer = () => {
  const location = useLocation();

  // 로그인 사용자 파생
  const auth = useSelector((s) => s.user || s.auth || {});
  const rawUser = auth.user || auth.data || auth.profile || auth.currentUser || null;
  const userId = rawUser?._id || rawUser?.id || rawUser?.userId || null;

  const handleMyClick = (e) => {
    if (!userId) {
      e.preventDefault(); // 링크 이동 차단
      window.alert("로그인 시 사용할 수 있어요!");
    }
  };

  const isHome = location.pathname === "/community";
  const isList =
    location.pathname.startsWith("/community/list") ||
    !!location.pathname.match(/^\/community\/\d+$/);
  const isMy = location.pathname === "/community/my";
  const isCollection = location.pathname === "/community/collection";

  return (
    <div>
      <S.TabMenu>
        <Link to="/community">
          <S.TabItem $isActive={isHome}>홈</S.TabItem>
        </Link>

        <Link to="/community/list">
          <S.TabItem $isActive={isList}>전체 글</S.TabItem>
        </Link>

        {/* 비로그인 시 이동 차단 + 알럿 */}
        <Link to="/community/my" onClick={handleMyClick}>
          <S.TabItem $isActive={isMy}>내가 쓴 글</S.TabItem>
        </Link>

        <Link to="/community/collection">
          <S.TabItem $isActive={isCollection}>컬렉션</S.TabItem>
        </Link>
      </S.TabMenu>

      <S.OutletWrapper>
        <Outlet />
      </S.OutletWrapper>
    </div>
  );
};

export default CommunityContainer;