import React from "react";
import { useLocation } from "react-router-dom";
import { Link, Outlet } from "react-router-dom";
import S from "../archive/history.style";

const CommunityContainer = () => {
  const location = useLocation();

  return (
    <div>
      <S.TabMenu>
        <Link to="/community">
          <S.TabItem $isActive={location.pathname === "/community"}>홈</S.TabItem>
        </Link>
        <Link to="/community/list">
          <S.TabItem
            $isActive={location.pathname.startsWith("/community/list") || location.pathname.match(/^\/community\/\d+$/)}
          >
            전체 글
          </S.TabItem>
        </Link>
        <Link to="/community/my">
          <S.TabItem $isActive={location.pathname === "/community/my"}>내가 쓴 글</S.TabItem>
        </Link>
        <Link to="/community/collection">
          <S.TabItem $isActive={location.pathname === "/community/collection"}>컬렉션</S.TabItem>
        </Link>
      </S.TabMenu>
      <S.OutletWrapper>
        <Outlet />
      </S.OutletWrapper>
    </div>
  );
};

export default CommunityContainer;
