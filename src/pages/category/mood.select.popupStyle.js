import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Popup = styled.div`
  background: white;
  width: 380px;
  padding: 30px;
  position: relative;
  text-align: center;
`
;

const CloseBtn = styled.button`
  position: absolute;
  top: 12px;
  right: 16px;
  font-size: 20px;
  background: none;
  border: none;
  cursor: pointer;
`;

const Title = styled.h3`
  font-size: 18px;
  margin-bottom: 20px;
  color: #282828;
`;

const Body = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EmojiColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-right: 20px;
  max-height: 150px;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const EmojiItem = styled.div`
  font-size: 26px;
  cursor: pointer;
  opacity: ${({ $active }) => ($active ? 1 : 0.4)};
  transform: scale(${({ $active }) => ($active ? 1.2 : 1)});
  transition: all 0.2s ease-in-out;
`;

const MessageBox = styled.div`
  background: ${({ $bgColor }) => $bgColor || "#f0f0f0"};
  color: #282828;
  font-size: 18px;
  font-weight: 700;
  padding: 16px;
  border-radius: 8px;
  text-align: center;
  white-space: pre-line;
  width: 220px; 
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background 0.2s ease;
`;


const SaveButton = styled.button`
  margin-top: 24px;
  background: #282828;
  color: white;
  padding: 10px 24px;
  border: none;
  /* border-radius: 6px; */
  /* cursor: pointer; */

  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.2s, transform 0.1s;

  &:hover {
    background-color: #F96F3D /* 조금 더 밝은 회색 */
  }

  &:active {
    transform: scale(0.97); /* 살짝 눌린 느낌 */
    background-color: #282828; /* 더 진한 색 */
  }
`;

const S = {
  Overlay,
  Popup,
  CloseBtn,
  Title,
  Body,
  EmojiColumn,
  EmojiItem,
  MessageBox,
  SaveButton,
};

export default S;
