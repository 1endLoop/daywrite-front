// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setPreviousUrl } from '../modules/user/user';

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const { isLogin, authChecked } = useSelector((state) => state.user);
  const location = useLocation();

  // ✅ 아직 인증 부트스트랩 중이면 아무것도 렌더하지 않아서 튕김 방지
  if (!authChecked) return null; // 필요하면 로딩 컴포넌트로 대체

  if (!isLogin) {
    // ✅ 가려던 경로 저장 → 로그인 성공 시 복귀
    const toSave = location.pathname + location.search;
    dispatch(setPreviousUrl(toSave));
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
