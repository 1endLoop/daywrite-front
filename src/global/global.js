// 공통 스타일
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  /* 1) reset */
  ${reset}

  /* 2) font */
  @font-face {
    font-family: 'Pretendard';
    font-weight: 900;
    font-style: normal;
    src: url(${process.env.PUBLIC_URL}/assets/fonts/Pretendard-Black.woff2) format('woff2');
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 800;
    font-style: normal;
    src: url(${process.env.PUBLIC_URL}/assets/fonts/Pretendard-ExtraBold.woff2) format('woff2');
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 700;
    font-style: normal;
    src: url(${process.env.PUBLIC_URL}/assets/fonts/Pretendard-Bold.woff2) format('woff2');
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 600;
    font-style: normal;
    src: url(${process.env.PUBLIC_URL}/assets/fonts/Pretendard-SemiBold.woff2) format('woff2');
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 500;
    font-style: normal;
    src: url(${process.env.PUBLIC_URL}/assets/fonts/Pretendard-Medium.woff2) format('woff2');
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 400;
    font-style: normal;
    src: url(${process.env.PUBLIC_URL}/assets/fonts/Pretendard-Regular.woff2) format('woff2');
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 300;
    font-style: normal;
    src: url(${process.env.PUBLIC_URL}/assets/fonts/Pretendard-Light.woff2) format('woff2');
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 200;
    font-style: normal;
    src: url(${process.env.PUBLIC_URL}/assets/fonts/Pretendard-ExtraLight.woff2) format('woff2');
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 100;
    font-style: normal;
    src: url(${process.env.PUBLIC_URL}/assets/fonts/Pretendard-thin.woff2) format('woff2');
  }

  /* 3) 초기 스타일 */


  h1 {
    font-family: 'Pretendard';
    font-size: 30px;
    font-weight: 700;
    box-sizing: border-box;
    letter-spacing: -0.16px;
    text-decoration: none;
    color : #282828;
  }

  h2 {
    font-family: 'Pretendard';
    font-size: 24px;
    font-weight: 700;
    box-sizing: border-box;
    letter-spacing: -0.16px;
    text-decoration: none;
    color : #282828;
  }

  h3 {
    font-family: 'Pretendard';
    font-size: 20px;
    font-weight: 600;
    box-sizing: border-box;
    letter-spacing: -0.16px;
    text-decoration: none;
    color : #282828;
  }

  h4 {
    font-family: 'Pretendard';
    font-size: 18px;
    font-weight: 500;
    box-sizing: border-box;
    letter-spacing: -0.16px;
    line-height: 24px;
    text-decoration: none;
    color: #282828;
  }

  h5 {
    font-family: 'Pretendard';
    font-size: 16px;
    font-weight: 400;
    box-sizing: border-box;
    letter-spacing: -0.16px;
    line-height: 24px;
    text-decoration: none;
    color: #282828;
  }

  body {
    font-family: 'Pretendard';
    font-size: 18px;
    font-weight: 400;
    box-sizing: border-box;
    letter-spacing: -0.16px;
    text-decoration: none;
    color : #282828;
  }

  small {
    font-family: 'Pretendard';
    font-size: 14px;
    font-weight: 400;
    box-sizing: border-box;
    letter-spacing: -0.16px;
    text-decoration: none;
    color : #282828;
  }

  caption {
    font-family: 'Pretendard';
    font-size: 12px;
    font-weight: 300;
    box-sizing: border-box;
    line-height: 1.3;
    text-decoration: none;
    color : #282828;
  }

  a {
    text-decoration: none;
    color : #282828;
  }

  button {
    border: none;
    cursor: pointer;
  }

`;

export default GlobalStyle;
