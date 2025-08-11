// src/App.jsx
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./global/global";
import theme from "./global/theme";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import { BackgroundProvider } from "./contexts/BackgroundContext";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setUserStatus, setAuthChecked } from "./modules/user/user";

function App() {
  const dispatch = useDispatch();
  const authChecked = useSelector((state) => state.user.authChecked);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      // 토큰이 없다면 바로 초기화하고 체크 완료
      dispatch(setUser(null));
      dispatch(setUserStatus(false));
      dispatch(setAuthChecked(true));
      return;
    }

    (async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/jwt`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("unauthorized");
        }

        const { user } = await response.json();
        if (user) {
          dispatch(setUser(user));
          dispatch(setUserStatus(true));
        } else {
          localStorage.removeItem("jwtToken");
          dispatch(setUser(null));
          dispatch(setUserStatus(false));
        }
      } catch (e) {
        // 만료/무효 토큰 처리
        localStorage.removeItem("jwtToken");
        dispatch(setUser(null));
        dispatch(setUserStatus(false));
      } finally {
        // ✅ 어떤 경우든 부트스트랩 종료 표시
        dispatch(setAuthChecked(true));
      }
    })();
  }, [dispatch]);

  // ✅ 인증 체크 끝날 때까지 라우터 렌더 보류(마이페이지 새로고침 튕김 방지)
  if (!authChecked) return null; // 필요하면 스플래시/로딩 UI 넣어도 됨

  return (
    <BackgroundProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <RouterProvider router={router} />
      </ThemeProvider>
    </BackgroundProvider>
  );
}

export default App;
