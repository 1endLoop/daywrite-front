import React from "react";
import BasicButton from "../../components/button/BasicButton";
import P from "./signup.popup.style";

const LoginFailPopup = ({ onClose }) => {
  return (
    <P.ModalBackdrop onClick={onClose}>
      <P.ModalBox onClick={(e) => e.stopPropagation()}>
        <P.PopupTitle>일치하는 회원정보가 없습니다.</P.PopupTitle>
        <P.PopupContent>
          아직 회원이 아니신가요?
        </P.PopupContent>
        <P.ButtonWrapper>
          <BasicButton onClick={() => window.location.href = "/signup"}>
            회원가입 하러가기
          </BasicButton>
          <BasicButton onClick={onClose}>
            닫기
          </BasicButton>
        </P.ButtonWrapper>
      </P.ModalBox>
    </P.ModalBackdrop>
  );
};

export default LoginFailPopup;
