import { ThemeProvider } from "styled-components";
import theme from "./global/theme";
import GlobalStyle from "./global/global";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import { BackgroundProvider } from "./contexts/BackgroundContext";

function App() {
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