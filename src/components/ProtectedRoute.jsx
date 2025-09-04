// src/components/ProtectedRoute.jsx
import React, { useEffect, useRef, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { setPreviousUrl } from '../modules/user/user';

// 알림을 보여주고, 다음 렌더에서 안전하게 이동
const LoginGuard = ({ message = '로그인이 필요합니다.' }) => {
  const [ready, setReady] = useState(false);
  const shownRef = useRef(false);
  const location = useLocation();

  useEffect(() => {
    if (!shownRef.current) {
      alert(message);           // ✅ 알림 1회
      shownRef.current = true;  // StrictMode 중복 방지
      // 다음 렌더에 이동시키기
      setReady(true);
    }
  }, []);

  if (!ready) return null;
  // 이전 위치를 state로도 넘길 수 있음(선택)
  return <Navigate to="/login" replace state={{ from: location.pathname + location.search }} />;
};

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const { isLogin, authChecked } = useSelector(
    s => ({ isLogin: s.user.isLogin, authChecked: s.user.authChecked }),
    shallowEqual
  );
  const location = useLocation();
  const savedRef = useRef(null);

  // 이전 URL 저장 (중복 저장 방지)
  useEffect(() => {
    if (authChecked && !isLogin) {
      const toSave = location.pathname + location.search;
      if (savedRef.current !== toSave) {
        dispatch(setPreviousUrl(toSave));
        savedRef.current = toSave;
      }
    }
  }, [authChecked, isLogin, location.pathname, location.search, dispatch]);

  if (!authChecked) return null;     // 로딩 스피너 등을 렌더해도 됨
  if (!isLogin) return <LoginGuard />;  // ✅ 먼저 알림 띄우고 그 다음에 이동

  return children;
};

export default ProtectedRoute;