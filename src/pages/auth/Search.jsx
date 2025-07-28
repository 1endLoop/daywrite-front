import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate, Link } from 'react-router-dom';
import BasicButton from '../../components/button/BasicButton';
import { filledButtonCSS } from '../../components/button/style';
import S from './signup.form.style';
import AuthPopup from './AuthPopup';
import Toast from "../../components/Toast";

const Search = () => {
  const [showIdPopup, setShowIdPopup] = useState(false);
  const [showPwFailPopup, setShowPwFailPopup] = useState(false);
  const [isResetMode, setIsResetMode] = useState(false);   // 비밀번호 재설정
  const [foundEmail, setFoundEmail] = useState('');
  const [resetEmail, setResetEmail] = useState(''); // 이메일 상태에 저장
  const [showNewPassword, setShowNewPassword] = useState(false);          // 비밀번호 재설정 - 비밀번호 보기 토글상태 선언
  const [showNewPasswordConfirm, setShowNewPasswordConfirm] = useState(false);  // 비밀번호 확인
  const [toast, setToast] = useState(null);  // 토스트 설정
  const { type } = useParams();
  const navigate = useNavigate();
  const Wrapper = type === 'password' && !isResetMode ? S.SearchScrollSection : React.Fragment;

  const {
    register, handleSubmit, getValues, reset, formState: { isSubmitted, errors }
  } = useForm({ mode: 'onSubmit' });

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[!@#])[\da-zA-Z!@#]{8,}$/;

  // 토스트 설정
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 제거
    }
  }, [toast]);

  const onSubmit = async (data) => {
    // 비밀번호 재설정
    if (isResetMode) {
      const { newPassword, confirmPassword } = getValues();
      // 1. 비어있는지 검사
      if (!newPassword || !confirmPassword) {
        setToast("모든 항목을 입력해주세요.");
        return;
      }

      // 2. 형식 검사
      if (!passwordRegex.test(newPassword)) {
        setToast("소문자, 숫자, 특수문자 포함 8자 이상으로 입력해주세요.");
        return;
      }

      // 3. 일치 여부 확인
      if (newPassword !== confirmPassword) {
        setToast("비밀번호가 일치하지 않습니다.");
        return;
      }

      // 4. 이메일 누락 확인
      if (!resetEmail) {
        setToast("이메일 정보가 누락되었습니다. 처음부터 다시 시도해주세요.");
        return;
      }

      // 5. fetch 요청
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: resetEmail, newPassword })
      });

      const result = await response.json();

      if (result.success) {
        setToast("비밀번호가 재설정되었습니다.");
        navigate('/login');
      } else {
        setToast("비밀번호 재설정에 실패했습니다.");
      }

      return;
    }



    if (type === 'id') {
      // 아이디 찾기 요청
      console.log("아이디 찾기 요청", data);
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/find-id`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: data.name,
          phonenum: data.phonenum
        })
      });

      const result = await response.json();

      if (result.success) {
        setFoundEmail(result.email);
        setShowIdPopup(true);
      } else {
        setToast(result.message || "일치하는 정보를 찾을 수 없습니다.");
      }


    } else if (type === 'password') {
      // 비밀번호 찾기 요청
      console.log("비밀번호 찾기 요청", data);
      if (!phoneVerified) {
        setToast("휴대폰 인증을 완료해주세요.");
        return;
      }

      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/find-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: data.name,
          phonenum: data.phonenum,
          email: data.email
        })
      });

      const result = await response.json();

      if (result.success) {
        setResetEmail(data.email);
        setIsResetMode(true);  // 화면 전환
      } else {
        setShowPwFailPopup(true); // 실패 시 팝업 ON
      }
    }
  };


  // 휴대폰 인증 관련 상태
  const [phone, setPhone] = useState('');
  const [phoneCode, setPhoneCode] = useState('');
  const [sentPhoneCode, setSentPhoneCode] = useState('');
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [phoneAuthSent, setPhoneAuthSent] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0); // 남은 시간 (초 단위)
  const [timerRunning, setTimerRunning] = useState(false);

  const handleSendPhoneCode = () => {
    const phone = getValues("phonenum"); // 1. 폼에서 번호 가져옴
    if (!phone) {
      setToast("휴대폰 번호를 입력해주세요."); // 2. 입력 안 돼있으면 경고
      return; // 3. 함수 멈춤
    }
    // 4. 인증번호 전송 로직 계속 실행
    const newCode = '12345';
    setSentPhoneCode(newCode);
    setPhoneAuthSent(true);
    setPhoneVerified(false);
    setPhoneCode('');
    setTimeLeft(180);           // 3분 설정
    setTimerRunning(true);      // 타이머 시작
    setToast("인증번호가 발송되었습니다. 문자메시지를 확인해주세요!");
  };

  const handleVerifyPhoneCode = () => {
    if (phoneCode === sentPhoneCode) {
      setPhoneVerified(true);
      setTimerRunning(false);  // 타이머정지
      setToast("휴대폰 인증이 완료되었습니다!");
    } else {
      setToast("인증번호가 일치하지 않습니다.");
      setPhoneVerified(false);
      setPhoneCode('');
    }
  };

useEffect(() => {
  if (!timerRunning) return;

  const timer = setInterval(() => {
    setTimeLeft((prev) => {
      if (prev <= 1) {
        clearInterval(timer);
        setTimerRunning(false);
        // 인증이 완료되지 않은 경우만 처리
        if (!phoneVerified) {
          setToast("인증 시간이 만료되었습니다. 인증번호를 다시 요청해주세요.");
          setPhone('');
          setPhoneCode('');
          setPhoneAuthSent(false);
        }
        return 0;
      }
      return prev - 1;
    });
  }, 1000);

  return () => clearInterval(timer); // 언마운트 시 타이머 정리
}, [timerRunning, phoneVerified]);

useEffect(() => {
  setPhone('');
  setPhoneCode('');
  setSentPhoneCode('');
  setPhoneVerified(false);
  setPhoneAuthSent(false);
  setTimeLeft(0);
  setTimerRunning(false);
  reset(); // react-hook-form 사용 시 폼 초기화
}, [type]);



  return (
    <>
      {toast && <Toast message={toast} />}
      <S.LoginContainer>
        <S.LoginLeftBox>
          <S.Logo src="/assets/images/logo.png" alt="logo" />
          <S.LoginSubText>글과 음악이 함께하는 공간.</S.LoginSubText>
        </S.LoginLeftBox>

        <S.SearchRightBox>
          <S.Form onSubmit={handleSubmit(onSubmit)}>
            <S.SearchFormSection>
              <S.Title className='search'>
                {isResetMode
                  ? '비밀번호 재설정'
                  : type === 'id'
                    ? '아이디 찾기'
                    : '비밀번호 찾기'}
              </S.Title>
              </S.SearchFormSection>

            <Wrapper>
              <S.SearchFormSection>
                {isResetMode ? (
                  <>
                  {/* 비밀번호 재설정 */}
                    <S.InsideLabel>
                      <S.LabelText>새 비밀번호</S.LabelText>
                      <S.PasswordWrapper>
                        <S.Input
                          type={showNewPassword ? 'text' : 'password'}
                          placeholder="새 비밀번호를 입력해주세요."
                          {...register('newPassword', {
                            required: true,
                            pattern: {
                              value: passwordRegex,
                              message: '영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.'
                            }
                          })}
                          hasError={isSubmitted && !!errors.newPassword}
                          isEmpty={getValues("newPassword") === ""}
                        />
                        <S.ToggleButton type="button" onClick={() => setShowNewPassword(!showNewPassword)}>
                          <img src={process.env.PUBLIC_URL 
                            + (showNewPassword ? '/assets/images/icons/eye.png' : '/assets/images/icons/eye-off.png')} 
                            alt="비밀번호 보기 토글"/>
                        </S.ToggleButton>
                      </S.PasswordWrapper>
                      {isSubmitted && errors.newPassword && (
                        <S.ConfirmMessage>{errors.newPassword.message}</S.ConfirmMessage>
                      )}
                    </S.InsideLabel>

                    <S.InsideLabel>
                      <S.LabelText>비밀번호 확인</S.LabelText>
                      <S.PasswordWrapper>
                        <S.Input
                          type={showNewPasswordConfirm ? 'text' : 'password'}
                          placeholder="비밀번호를 다시 입력해주세요."
                          {...register('confirmPassword', {
                            required: '비밀번호 확인은 필수입니다.',
                            validate: {
                              matchPassword: (value) => {
                                const { newPassword } = getValues();
                                return value === newPassword || '비밀번호가 일치하지 않습니다.';
                              }
                            }
                          })}
                          hasError={isSubmitted && !!errors.confirmPassword}
                          isEmpty={getValues("confirmPassword") === ""}
                        />
                        <S.ToggleButton type="button" onClick={() => setShowNewPasswordConfirm(!showNewPasswordConfirm)}>
                          <img src={process.env.PUBLIC_URL 
                            + (showNewPasswordConfirm ? '/assets/images/icons/eye.png' : '/assets/images/icons/eye-off.png')} 
                            alt="비밀번호 보기 토글"/>
                        </S.ToggleButton>
                      </S.PasswordWrapper>
                      {isSubmitted && errors.confirmPassword && (
                        <S.ConfirmMessage>{errors.confirmPassword.message}</S.ConfirmMessage>
                      )}
                    </S.InsideLabel>
                  </>

                ) : (

                  <>
                    <S.InsideLabel>
                      <S.LabelText>이름</S.LabelText>
                      <S.Input
                        type="text"
                        placeholder="이름을 입력해주세요."
                        {...register("name", { required: true })}
                        hasError={!!errors.name}
                        isEmpty={getValues("name") === ""}
                      />
                    </S.InsideLabel>

                    <S.InsideLabel>
                      <S.LabelText>휴대폰 번호</S.LabelText>
                        <S.InputWithBtn>
                          <S.Input
                            type="text"
                            placeholder="숫자만 입력해주세요. (ex. 01012345678)"
                            {...register('phonenum', { required: true })}
                            hasError={!!errors.phonenum}
                            isEmpty={getValues("phonenum") === ""}
                            disabled={phoneVerified}
                            verified={phoneVerified}
                          />
                          {!phoneAuthSent ? (
                            <S.SmallButton type="button" onClick={handleSendPhoneCode}>
                              <S.SmallButtonText>인증번호<br />전송</S.SmallButtonText>
                            </S.SmallButton>
                          ) : !phoneVerified ? (
                            <S.SmallButton type="button" onClick={handleVerifyPhoneCode}>
                              <S.SmallButtonText>인증번호<br />확인</S.SmallButtonText>
                            </S.SmallButton>
                          ) : (
                            <S.SmallButton type="button" disabled>
                              <S.SmallButtonText>인증 완료</S.SmallButtonText>
                            </S.SmallButton>
                          )}
                        </S.InputWithBtn>
                    </S.InsideLabel>

                    {phoneAuthSent && !phoneVerified && (
                      <S.InsideLabel>
                        <S.LabelText>
                          인증번호 입력
                          {timerRunning && (
                            <span style={{ marginLeft: '10px', color: '#EB5757', fontSize: '14px' }}>
                              {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
                            </span>
                          )}
                        </S.LabelText>
                        <S.Input
                          type="text"
                          placeholder="인증번호를 입력해주세요"
                          value={phoneCode}
                          onChange={(e) => setPhoneCode(e.target.value)}
                        />
                      </S.InsideLabel>
                    )}
                  {/* 비밀번호 찾기일 때만 이름 필드 추가 */}
                  {type === 'password' && (
                    <S.InsideLabel>
                      <S.LabelText>이메일</S.LabelText>
                      <S.Input
                        type="text"
                        placeholder="이메일을 입력해주세요."
                        {...register("email", {
                          required: true,
                          pattern: { value: emailRegex }
                        })}
                        hasError={!!errors.email}
                        isEmpty={getValues("email") === ""}
                      />
                      {isSubmitted && errors?.email?.type === "pattern" && (
                        <S.ConfirmMessage>올바른 이메일 형식이 아닙니다.</S.ConfirmMessage>
                      )}
                    </S.InsideLabel>
                  )}
                  </>
                )}
              </S.SearchFormSection>

              <BasicButton customStyle={`${filledButtonCSS}; margin-top: 44px;`}>
                {isResetMode ? '비밀번호 재설정' : type === 'id' ? '아이디 찾기' : '비밀번호 찾기'}
              </BasicButton>

              {!isResetMode && (
                <S.SearchButtonWrapper>
                  <Link to="/login">
                    <S.StyledSpan as="button" type="button" className="search">로그인</S.StyledSpan>
                  </Link>
                  {type === 'id' ? (
                    <Link to="/search/password">
                      <S.StyledSpan as="button" type="button" className="search">비밀번호 찾기</S.StyledSpan>
                    </Link>
                  ) : (
                    <Link to="/search/id">
                      <S.StyledSpan as="button" type="button" className="search">아이디 찾기</S.StyledSpan>
                    </Link>
                  )}
                </S.SearchButtonWrapper>
              )}
              
            </Wrapper>

          </S.Form>
        </S.SearchRightBox>

        {showIdPopup && (
          <AuthPopup
            title="아이디 찾기 결과"
            content={`회원님의 아이디는 ${foundEmail} 입니다.`}
            leftbtn="비밀번호 찾기"
            rightbtn="로그인"
            showCancel={true}
            onCancel={() => {
              setShowIdPopup(false);
              navigate('/search/password');
            }}
            onConfirm={() => navigate('/login')}
            onClose={() => setShowIdPopup(false)}
          />
        )}

        {showPwFailPopup && (
          <AuthPopup
            title="일치하는 회원정보가 없습니다."
            content="아직 회원이 아니신가요?"
            gosignup="회원가입하러가기"
            onClose={() => setShowPwFailPopup(false)}
          />
        )}

      </S.LoginContainer>
    </>

  );
};

export default Search;
