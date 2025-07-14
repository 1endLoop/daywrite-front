import React from "react";
import { useLocation } from "react-router-dom";
import { Link, Outlet } from "react-router-dom";
import S from "./history.style";

const ArchiveContainer = () => {
  const location = useLocation();

  return (
    <div>
      <S.TabMenu>
        <Link to="/archive/history">
          <S.TabItem $isActive={location.pathname === "/archive/history"}>
            HISTORY
          </S.TabItem>
        </Link>
        <Link to="/archive/calendar">
          <S.TabItem $isActive={location.pathname === "/archive/calendar"}>
            CALENDAR
          </S.TabItem>
        </Link>
        <Link to="/archive/bookmark">
          <S.TabItem $isActive={location.pathname === "/archive/bookmark"}>
            BOOKMARK
          </S.TabItem>
        </Link>
        <Link to="/archive/liked">
          <S.TabItem $isActive={location.pathname === "/archive/liked"}>
            LIKED
          </S.TabItem>
        </Link>
      </S.TabMenu>
      <S.OutletWrapper>
        <Outlet />
      </S.OutletWrapper>
    </div>
  );
};

export default ArchiveContainer;
