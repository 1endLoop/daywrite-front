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
    // 1) 과거 키 마이그레이션: jwtToken → accessToken
    const legacy = localStorage.getItem("jwtToken");
    const current = localStorage.getItem("accessToken");
    if (!current && legacy) {
      localStorage.setItem("accessToken", legacy);
      localStorage.removeItem("jwtToken");
    }

    const token = localStorage.getItem("accessToken");

    // 토큰 없으면 즉시 비로그인 상태로 마킹하고 종료
    if (!token) {
      dispatch(setUser(null));
      dispatch(setUserStatus(false));
      dispatch(setAuthChecked(true));
      return;
    }

    (async () => {
      try {
        // 2) 자동 로그인(me) 호출 (GET/POST 둘 다 가능하지만 GET 권장)
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/jwt`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
          credentials: "include",
        });

        if (!res.ok) throw new Error("unauthorized");

        const { user } = await res.json();

        if (user) {
          dispatch(setUser(user));
          dispatch(setUserStatus(true));
        } else {
          // 사용자 정보 없으면 토큰 정리
          localStorage.removeItem("accessToken");
          dispatch(setUser(null));
          dispatch(setUserStatus(false));
        }
      } catch (e) {
        // 만료/무효 토큰 정리
        localStorage.removeItem("accessToken");
        dispatch(setUser(null));
        dispatch(setUserStatus(false));
      } finally {
        // 3) 어떤 경우든 부트스트랩 종료
        dispatch(setAuthChecked(true));
      }
    })();
  }, [dispatch]);

  // 인증 체크 끝날 때까지 라우터 렌더 보류 (깜빡임/튕김 방지)
  if (!authChecked) return null; // 필요하면 로딩 UI 넣어도 OK

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
