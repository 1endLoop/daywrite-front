import React, { useState } from 'react';
import S from './style'; // ✅ 정확한 파일명 & 경로 확인!


const EditUserInfo = () => {
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <S.EditUserInfoContainer>
      <S.SectionTitle>개인정보 수정</S.SectionTitle>

      <S.SliderRow>
        <S.Label>프로필 사진</S.Label>
        <S.ProfileHeader>
          <S.Avatar src="/assets/images/profiles/profile.jpg" alt="프로필" />
          <S.ButtonGroup>
            <S.PhotoButton>사진 변경</S.PhotoButton>
            <S.BlackButton>취소</S.BlackButton>
          </S.ButtonGroup>
        </S.ProfileHeader>
      </S.SliderRow>

      <S.SliderRow>
        <S.Label>이메일</S.Label>
        <S.Email>
          abcd@gmail.com <span style={{ color: '#f86f3d', fontSize: '12px' }}>이메일 인증 완료</span>
        </S.Email>
      </S.SliderRow>

      <S.SliderRow>
        <S.Label>닉네임</S.Label>
        <S.InputRow>
          <S.Input
            placeholder="닉네임을 입력해주세요."
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <S.ConfirmButton>중복확인</S.ConfirmButton>
        </S.InputRow>
      </S.SliderRow>

      <S.SliderRow>
        <S.Label>비밀번호</S.Label>
        <S.Input
          type="password"
          placeholder="최소 8자리 이상(영문, 숫자, 특수문자 중 2가지 이상 조합)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </S.SliderRow>

      <S.SliderRow>
        <S.Label>비밀번호 확인</S.Label>
        <S.Input
          type="password"
          placeholder="확인을 위해 비밀번호를 재입력해주세요."
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </S.SliderRow>

      <S.Withdraw>회원탈퇴</S.Withdraw>

      <S.ButtonGroup2 style={{ marginTop: '10px' }}>
        <S.OrangeButton>적용</S.OrangeButton>
        <S.OutlinedButton>취소</S.OutlinedButton>
      </S.ButtonGroup2>
    </S.EditUserInfoContainer>
  );
};

export default EditUserInfo;
