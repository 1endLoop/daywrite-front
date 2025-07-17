import React from 'react';
import BasicButton from '../../components/button/BasicButton';
import P from "./signup.popup.style";
import { filledButtonCSS, outlineButtonCSS } from '../../components/button/style';

const SignUpPopup = ({ 
  title, 
  content, 
  onClose, 
  onConfirm, 
  showCancel = false 
}) => {
  return (
    <P.ModalBackdrop onClick={onClose}>
      <P.ModalBox onClick={e => e.stopPropagation()}>
        <P.PopupTitle>{title}
          <P.CloseIcon onClick={onClose}>
            <img src={process.env.PUBLIC_URL + '/assets/images/icons/close.png'} alt="닫기" />
          </P.CloseIcon>
        </P.PopupTitle>
        <P.PopupContent>{content}</P.PopupContent>
        <P.ButtonWrapper>
          {showCancel && (
            <BasicButton
              type="button"
              customStyle={outlineButtonCSS}
              onClick={onClose}
            >
              취소
            </BasicButton>
          )}
          <BasicButton
            type="button"
            customStyle={filledButtonCSS}
            onClick={onConfirm}
          >
            확인
          </BasicButton>
        </P.ButtonWrapper>
        </P.ModalBox>
    </P.ModalBackdrop>
  );
};

export default SignUpPopup;
