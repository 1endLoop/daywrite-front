import React, { useState, useEffect } from 'react';
import S from './style';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../modules/user/user';

const EditUserInfo = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);

  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isNicknameValid, setIsNicknameValid] = useState(null);

  useEffect(() => {
    if (user) {
      setNickname(user.nickname || '');
      setPreviewImage(user.profileImageUrl || '/assets/images/profiles/profile.jpg');
    }
  }, [user]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleNicknameCheck = async () => {
    if (!nickname) {
      alert("닉네임을 입력해주세요.");
      return;
    }

    if (nickname === user.nickname) {
      alert("현재 사용 중인 닉네임입니다.");
      setIsNicknameValid(true);
      return;
    }

    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/check-nickname?nickname=${encodeURIComponent(nickname)}`
      );

      const data = await res.json();

      if (res.ok) {
        alert(data.message || "사용 가능한 닉네임입니다.");
        setIsNicknameValid(true);
      } else {
        alert(data.message || "이미 사용 중인 닉네임입니다.");
        setIsNicknameValid(false);
      }
    } catch (err) {
      console.error("닉네임 확인 오류:", err);
      alert("닉네임 중복 확인 중 오류가 발생했습니다.");
      setIsNicknameValid(false);
    }
  };

  const handleSubmit = async () => {
    if (!nickname) return alert("닉네임을 입력해주세요.");
    if (password && password !== confirmPassword) return alert("비밀번호가 일치하지 않습니다.");
    if (nickname !== user.nickname && isNicknameValid !== true) {
      return alert("닉네임 중복 확인이 필요합니다.");
    }

    const formData = new FormData();
    formData.append("nickname", nickname);
    if (password) formData.append("password", password);
    if (profileImage) formData.append("profileImage", profileImage);

    console.log(`${process.env.REACT_APP_BACKEND_URL}/api/users/${user._id}`);

    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/${user._id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
        body: formData,
      });

      const contentType = res.headers.get("content-type");
      if (!res.ok) {
        if (contentType && contentType.includes("application/json")) {
          const error = await res.json();
          throw new Error(error.message || "수정 실패");
        } else {
          throw new Error("서버 응답 오류 (비정상 HTML 응답)");
        }
      }

      const updatedUser = await res.json();
      dispatch(setUser(updatedUser));
      alert("정보가 성공적으로 수정되었습니다.");
    } catch (err) {
      console.error("수정 실패:", err);
      alert(`오류: ${err.message}`);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm("정말 계정을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.");
    if (!confirmed) return;

    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/${user._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "회원 탈퇴 실패");
      }

      alert("회원 탈퇴가 완료되었습니다.");
      localStorage.removeItem("jwtToken");
      dispatch(setUser(null));
      window.location.href = "/";
    } catch (err) {
      console.error("회원 탈퇴 실패:", err);
      alert(`오류: ${err.message}`);
    }
  };

  if (!user) return <div>유저 정보를 불러오는 중입니다...</div>;

  return (
    <S.EditUserInfoContainer>
      <S.SectionTitle>개인정보 수정</S.SectionTitle>

      <S.SliderRow>
        <S.Label>프로필 사진</S.Label>
        <S.ProfileHeader>
          <S.Avatar src={previewImage} alt="프로필" />
          <S.ButtonGroup>
            <S.PhotoButton as="label">
              사진 변경
              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleImageChange}
              />
            </S.PhotoButton>
            <S.BlackButton
              onClick={() => {
                setProfileImage(null);
                setPreviewImage('/assets/images/profiles/profile.jpg');
              }}
            >
              취소
            </S.BlackButton>
          </S.ButtonGroup>
        </S.ProfileHeader>
      </S.SliderRow>

      <S.SliderRow>
        <S.Label>이메일</S.Label>
        <S.Email>
          {user.email}{" "}
          <span>이메일 인증 완료</span>
        </S.Email>
      </S.SliderRow>

      <S.SliderRow>
        <S.Label>닉네임</S.Label>
        <S.InputRow>
          <S.Input
            placeholder="닉네임을 입력해주세요."
            value={nickname}
            onChange={(e) => {
              setNickname(e.target.value);
              setIsNicknameValid(null);
            }}
          />
          <S.ConfirmButton onClick={handleNicknameCheck}>중복확인</S.ConfirmButton>
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

      <S.Withdraw onClick={handleDeleteAccount}>회원탈퇴</S.Withdraw>

      <S.ButtonGroup2>
        <S.OrangeButton onClick={handleSubmit}>적용</S.OrangeButton>
        <S.OutlinedButton>취소</S.OutlinedButton>
      </S.ButtonGroup2>
    </S.EditUserInfoContainer>
  );
};

export default EditUserInfo;

