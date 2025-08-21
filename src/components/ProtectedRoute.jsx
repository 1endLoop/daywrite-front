// src/components/ProtectedRoute.jsx
import React, { useEffect, useRef } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { setPreviousUrl } from '../modules/user/user';

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const { isLogin, authChecked } = useSelector(
    s => ({ isLogin: s.user.isLogin, authChecked: s.user.authChecked }),
    shallowEqual
  );
  const location = useLocation();
  const savedRef = useRef(null);

  useEffect(() => {
    if (authChecked && !isLogin) {
      const toSave = location.pathname + location.search;
      if (savedRef.current !== toSave) {
        dispatch(setPreviousUrl(toSave));     // ✅ 렌더가 아닌 이펙트에서
        savedRef.current = toSave;            // 중복 디스패치 방지
      }
    }
  }, [authChecked, isLogin, location.pathname, location.search, dispatch]);

  if (!authChecked) return null; // 필요 시 로딩 UI
  if (!isLogin) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;
