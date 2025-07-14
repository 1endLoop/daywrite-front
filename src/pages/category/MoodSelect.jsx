// src/pages/category/MoodSelect.jsx
import React, { useState } from "react";
import S from "./mood.select.popupStyle";

const moods = [
  { emoji: "😢", message: "속상한 날엔 눈물도 흘리자", color: "#FFF6E1" },
  { emoji: "🙂", message: "기분 좋은 날!", color: "#FFDCE0" },
  { emoji: "😊", message: "행복한 날에 감사하자!", color: "#FEEDDA" },
  { emoji: "😐", message: "무던한 하루도 괜찮아", color: "#DAE2ED" },
  { emoji: "😠", message: "화가 나도 괜찮아", color: "#D8F5E5" },
];

const MoodSelect = ({ onClose, onSave }) => {
  const [selected, setSelected] = useState(2); // 기본값: 가운데

  return (
    <S.Overlay>
      <S.Popup>
        <S.CloseBtn onClick={onClose}>×</S.CloseBtn>
        <S.Title>오늘의 기분은 어떤가요?</S.Title>
        <S.Body>
          <S.EmojiColumn>
            {moods.map((mood, idx) => (
              <S.EmojiItem
                key={idx}
                $active={selected === idx}
                onClick={() => setSelected(idx)}
              >
                {mood.emoji}
              </S.EmojiItem>
            ))}
          </S.EmojiColumn>
          <S.MessageBox $bgColor={moods[selected].color}>
            {moods[selected].message.split("\n").map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </S.MessageBox>
        </S.Body>
        <S.SaveButton onClick={() => onSave(moods[selected])}>저장</S.SaveButton>
      </S.Popup>
    </S.Overlay>
  );
};

export default MoodSelect;
