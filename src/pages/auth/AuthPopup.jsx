import React from 'react';
import BasicButton from '../../components/button/BasicButton';
import P from "./auth.popup.style";
import { filledButtonCSS, outlineButtonCSS } from '../../components/button/style';

const AuthPopup = ({ 
  title, 
  content,
  leftbtn,
  rightbtn,
  gosignup,
  gosearch,
  onClose, 
  onConfirm,
  onCancel,
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
          {/* 왼쪽 닫기버튼 */}
          {showCancel && (
            <BasicButton
              type="button"
              customStyle={outlineButtonCSS}
              onClick={onCancel ?? onClose} // onCancel 있으면 실행, 없으면 닫기
            >
              {leftbtn}
            </BasicButton>
          )}

          {/* 오른쪽 기능버튼 */}
          {rightbtn && (
            <BasicButton
              type="button"
              customStyle={filledButtonCSS}
              onClick={onConfirm}
            >
              {rightbtn}
            </BasicButton>
          )}

          {/* 로그인 실패시 뜨는 팝업 */}
          {/* 회원정보 찾기 버튼 */}
          {gosearch && (
            <BasicButton
              type="button"
              customStyle={outlineButtonCSS}
              onClick={() => window.location.href = "/search/id"}
            >
              {gosearch}
            </BasicButton>
          )}

          {/* 회원가입 유도버튼 */}
          {gosignup && (
            <BasicButton 
              type="button"
              customStyle={filledButtonCSS}
              onClick={() => window.location.href = "/signup"}
            >
              {gosignup}
            </BasicButton>
          )}


        </P.ButtonWrapper>
        </P.ModalBox>
    </P.ModalBackdrop>
  );
};

export default AuthPopup;
