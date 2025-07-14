import React from 'react';
import BasicButton from '../../components/button/BasicButton';
import P from "./main.popup.style";
import { filledButtonCSS } from '../../components/button/style';

const MainPopup = ({ type, onClose, onConfirm }) => {
  return (
    <P.ModalBackdrop onClick={onClose}>
      <P.ModalBox onClick={(e) => e.stopPropagation()}>
        <P.PopupTitle>
          {type === 'guest' ? '로그인 필요' : '마이페이지 안내'}
          <P.CloseIcon onClick={onClose}>
            <img src={process.env.PUBLIC_URL + '/assets/images/icons/close.png'} alt="닫기" />
          </P.CloseIcon>
        </P.PopupTitle>

        <P.PopupContent>
          {type === 'guest'
            ? '로그인 시 이용 가능한 서비스입니다.'
            : '마이페이지에서 설정이 가능합니다.'}
        </P.PopupContent>

        <P.ButtonWrap>
          {type === 'guest' ? (
            <BasicButton 
              customStyle={filledButtonCSS} 
              onClick={onConfirm}
              style={{ width: '300px' }}
            >
              로그인
            </BasicButton>
          ) : (
            <>
              <BasicButton 
                customStyle={filledButtonCSS} 
                onClick={onConfirm}
                style={{ width: '300px' }}
              >
                마이페이지로 이동
              </BasicButton>
              <BasicButton onClick={onClose}>닫기</BasicButton>
            </>
          )}
        </P.ButtonWrap>
      </P.ModalBox>
    </P.ModalBackdrop>
  );
};

export default MainPopup;