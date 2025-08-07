import React, { createContext, useContext, useState, useEffect } from "react";

const BackgroundContext = createContext();

export const BackgroundProvider = ({ children }) => {
  const [backgroundImage, setBackgroundImage] = useState(null);

  // ✅ 앱 시작 시 로컬스토리지에서 배경 이미지 복원
  useEffect(() => {
    const savedPath = localStorage.getItem("confirmedImagePath");
    const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";

    if (savedPath) {
      const fullPath = `${API_URL}/${savedPath.startsWith("/") ? savedPath.slice(1) : savedPath}`;
      setBackgroundImage(fullPath);
    }
  }, []);

  return (
    <BackgroundContext.Provider value={{ backgroundImage, setBackgroundImage }}>
      {children}
    </BackgroundContext.Provider>
  );
};

export const useBackground = () => useContext(BackgroundContext);

