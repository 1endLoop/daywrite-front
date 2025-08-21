// contexts/BackgroundContext.jsx
import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { useSelector, shallowEqual } from "react-redux";

const BackgroundContext = createContext(null);
export const useBackground = () => useContext(BackgroundContext);

export const BackgroundProvider = ({ children }) => {
  const [backgroundImage, setBackgroundImage] = useState(null);

  // ✅ 루트 전체가 아니라, 필요한 값만 골라서 선택 (shallowEqual로 불필요 렌더 방지)
  const { rawUser, authChecked } = useSelector(
    (s) => {
      const userSlice = s.user ?? s.auth ?? {};
      const rawUser =
        userSlice.user ??
        userSlice.data ??
        userSlice.profile ??
        userSlice.currentUser ??
        userSlice.info ??
        null;

      return {
        rawUser,
        authChecked: userSlice.authChecked ?? true, // 없으면 true로 간주
      };
    },
    shallowEqual
  );

  const userId = rawUser?._id ?? rawUser?.id ?? rawUser?.userId ?? "guest";

  const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";
  const nsKey = useMemo(() => (k) => `pref:${userId}:${k}`, [userId]);
  const norm = (p) => (p?.startsWith("/") ? p.slice(1) : p);

  // ✅ 유저 부트스트랩(authChecked) 이후에만 복원
  useEffect(() => {
    if (!authChecked) return;

    const saved = localStorage.getItem(nsKey("confirmedImagePath"));
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