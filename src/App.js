import { ThemeProvider } from "styled-components";
import GlobalStyle from "./global/global";
import theme from "./global/theme";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import { BackgroundProvider } from "./contexts/BackgroundContext";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setUserStatus } from "./modules/user/user";

function App() {

  const dispatch = useDispatch()
  const userStatus = useSelector((state) => state.user.isLogin)

  useEffect(() => {
    
    if(localStorage.getItem("jwtToken")){

      const isAuthenticate = async () => {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/jwt`, {
          method : "POST",
          headers : {
            'Authorization' : `Bearer ${localStorage.getItem("jwtToken")}`
          }
        })

        const getAuthenticateUserData = await response.json()
        return getAuthenticateUserData

      }

      isAuthenticate()
        .then((res) => {
          const {user, message} = res;
          console.log("app에서 최초 요청", res)
          dispatch(setUser(user))
          dispatch(setUserStatus(true))
        })
    }
}, [userStatus])

return (
    <>
    <BackgroundProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <RouterProvider router={router}/>
      </ThemeProvider>
    </BackgroundProvider>
    </>
  );
}

export default App;