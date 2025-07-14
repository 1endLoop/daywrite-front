import styled from 'styled-components';

const P = {};

P.ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;

P.ModalBox = styled.div`
  position: relative;
  background-color: white;
  padding: 58px 68px 50px 68px;
  max-width: 90%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`;

P.CloseIcon = styled.button`
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;
  background: none;
  border: none;
  cursor: pointer;
`;

P.PopupTitle = styled.h2`
  font-size: 28px;
  margin-bottom: 16px;
  
`;

P.PopupContent = styled.p`
  width: 423px;
  color: #282828;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  word-wrap: break-word;
  text-align: left;
  margin-bottom: 32px;
`;

export default P;