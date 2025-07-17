import styled, { keyframes } from "styled-components";

const fadeInOut = keyframes`
  0% { opacity: 0; bottom: 20px; }
  10% { opacity: 1; bottom: 40px; }
  90% { opacity: 1; bottom: 40px; }
  100% { opacity: 0; bottom: 20px; }
`;

const ToastBox = styled.div`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 40px;
  background-color: #444;
  color: #fff;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  animation: ${fadeInOut} 2s ease-in-out forwards;
  z-index: 9999;
`;

const Toast = ({ message }) => {
  return <ToastBox>{message}</ToastBox>;
};

export default Toast;
