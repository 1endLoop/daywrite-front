// contexts/BackgroundContext.jsx
import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";

const BackgroundContext = createContext(null);
export const useBackground = () => useContext(BackgroundContext);

export const BackgroundProvider = ({ children }) => {
  const [backgroundImage, setBackgroundImage] = useState(null);

  // ✅ 유저 정보 안전하게 추출(여러 슬라이스/키 대응)
  const store = useSelector((s) => s);
  const userSlice = store.user || store.auth || {};
  const rawUser =
    userSlice.user ||
    userSlice.data ||
    userSlice.profile ||
    userSlice.currentUser ||
    userSlice.info ||
    null;

  const authChecked = userSlice.authChecked ?? true; // 없으면 true
  const userId = rawUser?._id ?? rawUser?.id ?? rawUser?.userId ?? "guest";

  const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";
  const nsKey = useMemo(() => (k) => `pref:${userId}:${k}`, [userId]);
  const norm = (p) => (p?.startsWith("/") ? p.slice(1) : p);

  // ✅ 유저가 정해지고(부트 완료) 나서 계정별 경로로 복원
  useEffect(() => {
    if (!authChecked) return; // 부트 끝나고 실행
    const saved = localStorage.getItem(nsKey("confirmedImagePath")); // 계정별 키
    if (saved) {
      setBackgroundImage(`${API_URL}/${norm(saved)}`);
    } else {
      setBackgroundImage(null); // src="" 방지
    }
  }, [authChecked, nsKey, API_URL]);

  return (
    <BackgroundContext.Provider value={{ backgroundImage, setBackgroundImage }}>
      {children}
    </BackgroundContext.Provider>
  );
};


