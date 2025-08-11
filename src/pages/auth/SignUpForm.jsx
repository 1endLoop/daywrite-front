import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import S from './signup.form.style';
import BasicButton from '../../components/button/BasicButton'
import { filledButtonCSS } from '../../components/button/style';
import { Link, useNavigate } from 'react-router-dom';
import AuthPopup from './AuthPopup';
import Toast from "../../components/Toast";

const SignUpForm = () => {
  const {
    register, handleSubmit, getValues, setError, clearErrors, watch, setValue,
    formState: { isSubmitted, errors }
  } = useForm({ mode: "onSubmit" })

  const watchedValues = watch(['name', 'email', 'nickname', 'password', 'passwordConfirm']);
  
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[!@#])[\da-zA-Z!@#]{8,}$/;
    
  const [showPassword, setShowPassword] = useState(false);  // 비밀번호
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);  // 비밀번호 확인

  const [authSent, setAuthSent] = useState(false);
  const [authCode, setAuthCode] = useState(''); // 사용자가 입력한 인증번호
  const [generatedCode, setGeneratedCode] = useState(''); // 실제 발송된 인증번호
  const [authVerified, setAuthVerified] = useState(false);
  const [authFailed, setAuthFailed] = useState(false);
  const [showEmailPopup, setShowEmailPopup] = useState(false); // 이메일 중복확인
  const [emailToCheck, setEmailToCheck] = useState('');


  // 닉네임
  const [nicknameChecked, setNicknameChecked] = useState(false);  // 중복확인
  const [nicknameAvailable, setNicknameAvailable] = useState(null); // true | false | null
  const [nicknameToCheck, setNicknameToCheck] = useState('');
  const [showNicknamePopup, setShowNicknamePopup] = useState(false);
  const handleCheckNickname = async () => {
    const nickname = getValues('nickname');
    if (!nickname) {
      setError('nickname', { type: 'manual', message: '닉네임을 입력해주세요.' });
      return;
    }

    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/check-nickname?nickname=${nickname}`);
      const data = await res.json();

      setNicknameToCheck(nickname);
      setNicknameAvailable(!data.exists);
      setShowNicknamePopup(true);
    } catch (err) {
      console.error(err);
      setToast("서버 오류가 발생했습니다.");
    }
  };



  const [agreedAll, setAgreedAll] = useState(false);
  const [toast, setToast] = useState(null);  // 토스트 설정

  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
    marketing: false,
  });

  // 휴대폰 인증 관련 상태
  const [phone, setPhone] = useState('');
  const [phoneCode, setPhoneCode] = useState('');
  const [sentPhoneCode, setSentPhoneCode] = useState('');
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [phoneAuthSent, setPhoneAuthSent] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0); // 남은 시간 (초 단위)
  const [timerRunning, setTimerRunning] = useState(false);


  // 토스트 설정
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 제거
    }
  }, [toast]);


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


  const handleSendAuthCode = async () => {
    const email = getValues('email');
    if (!email) {
      setToast("이메일을 입력해주세요.");
      return;
    }

    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/check-email?email=${email}`);
      const data = await res.json();

      if (data.exists) {
        setEmailToCheck(email);
        setShowEmailPopup(true);
        return;
      }


      // 중복 이메일이 아니면 바로 인증번호 전송
      const newCode = '12345';
      setGeneratedCode(newCode);
      setAuthSent(true);
      setAuthVerified(false);
      setAuthFailed(false);
      setToast("인증번호가 발송되었습니다. 이메일을 확인해주세요!");

    } catch (err) {
      console.error(err);
      setToast("서버 오류가 발생했습니다.");
    }
  };

  const handleVerifyCode = () => {
    if (authCode === generatedCode) {
      setAuthVerified(true);
      setToast("인증번호가 일치합니다!");
    } else {
      setAuthFailed(true);
      setToast("인증번호가 일치하지 않습니다. 다시 인증번호를 발송했으니 이메일을 확인해주세요!");
      setAuthSent(false);
      setAuthCode('');
    }
  };


// 체크박스 아이콘 설정
  const CheckboxIcon = ({ checked, onChange, label }) => {
    return (
      <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          style={{ display: 'none' }}
        />
        <img
          src={
            process.env.PUBLIC_URL +
            `/assets/images/icons/${checked ? 'checkbox.png' : 'checkbox-off.png'}`
          }
          alt="체크박스 아이콘"
          style={{ width: '18px', height: '18px' }}
        />
        <span style={{ marginLeft: '8px' }}>{label}</span>
      </label>
    );
  };

// 필수영역 입력 설정
const isFormValid =
  watchedValues[0] &&  // name
  watchedValues[1] &&  // email
  authVerified &&
  watchedValues[2] &&  // nickname
  nicknameChecked &&
  watchedValues[3] &&  // password
  watchedValues[4] &&  // passwordConfirm
  agreements.terms &&
  agreements.privacy &&
  phoneVerified; // 휴대폰 인증


// 팝업설정
const [showTermsPopup, setShowTermsPopup] = useState(false);  // 약관
const [showSuccessPopup, setShowSuccessPopup] = useState(false);  // 회원가입 성공

// 회원가입 성공 시 로그인 화면 이동
const navigate = useNavigate()

  return (
    <>
      {toast && <Toast message={toast} />}
      
      <S.LoginContainer>
      {/* 약관 동의용 팝업 */}
      {showTermsPopup && (
        <AuthPopup
          title="이용약관 동의"
          content="사법권은 법관으로 구성된 법원에 속한다. 국가는 과학기술의 혁신과 정보 및 인력의 개발을 통하여 국민경제의 발전에 노력하여야 한다. 모든 국민은 근로의 권리를 가진다. 국가는 사회적·경제적 방법으로 근로자의 고용의 증진과 적정임금의 보장에 노력하여야 하며, 법률이 정하는 바에 의하여 최저임금제를 시행하여야 한다.
            위원은 정당에 가입하거나 정치에 관여할 수 없다. 대통령은 국가의 원수이며, 외국에 대하여 국가를 대표한다. 누구든지 체포 또는 구속을 당한 때에는 즉시 변호인의 조력을 받을 권리를 가진다. 다만, 형사피고인이 스스로 변호인을 구할 수 없을 때에는 법률이 정하는 바에 의하여 국가가 변호인을 붙인다.
            정당의 설립은 자유이며, 복수정당제는 보장된다. 모든 국민은 신체의 자유를 가진다. 누구든지 법률에 의하지 아니하고는 체포·구속·압수·수색 또는 심문을 받지 아니하며, 법률과 적법한 절차에 의하지 아니하고는 처벌·보안처분 또는 강제노역을 받지 아니한다. 국가는 대외무역을 육성하며, 이를 규제·조정할 수 있다."
          rightbtn="확인"
          onClose={() => setShowTermsPopup(false)}
          onConfirm={() => setShowTermsPopup(false)}
          showCancel={false}
        />
      )}

      {/* 회원가입 성공 팝업 */}
      {showSuccessPopup && (
        <AuthPopup
          title="회원가입 하시겠습니까?"
          content="Welcome to daywrite!"
          leftbtn="취소"
          rightbtn="확인"
          onConfirm={() => {
            localStorage.clear();
            setShowSuccessPopup(false);
            navigate("/login");
          }}
          onClose={() => {
            setShowSuccessPopup(false);
          }}
          showCancel={true}
          
        />
      )}

    {/* {회원가입시 - 이메일 중복} */}
    {showEmailPopup && (
      <AuthPopup
        title="이미 가입되어있는 이메일 입니다."
        content={`${emailToCheck}은 이미 가입된 이메일입니다.`}
        leftbtn="닫기"
        rightbtn="로그인"
        showCancel
        onCancel={() => {
          setShowEmailPopup(false); // 이메일 입력창 다시 활성화
        }}
        onConfirm={() => {
          setShowEmailPopup(false);
          navigate('/login'); // 로그인 페이지로 이동
        }}
        onClose={() => setShowEmailPopup(false)}
      />
    )}

      {/* {회원가입시 - 닉네임 중복확인 팝업} */}
      {showNicknamePopup && (
        <AuthPopup
          title="닉네임 설정"
          content={
            nicknameAvailable
              ? `${nicknameToCheck}은 사용 가능한 닉네임입니다.`
              : `${nicknameToCheck}은 이미 사용중인 닉네임입니다.`
          }
          leftbtn={nicknameAvailable ? "취소" : null}
          rightbtn={nicknameAvailable ? "사용하기" : "확인"}
          showCancel={nicknameAvailable}
          onCancel={() => {
            setShowNicknamePopup(false);
          }}
          onConfirm={() => {
            if (nicknameAvailable) {
              clearErrors('nickname');
              setNicknameChecked(true);
            }
            setShowNicknamePopup(false);
          }}
          onClose={() => setShowNicknamePopup(false)}
        />
      )}



        <S.LoginLeftBox>
          <S.Logo src="/assets/images/logo.png" alt="logo" />
          <S.LoginSubText>글과 음악이 함께하는 공간.</S.LoginSubText>
        </S.LoginLeftBox>


        <S.LoginRightBox>
          <S.Form onSubmit={handleSubmit( async (datas) => {
            // submit이 클릭되었을 때 가로채어 데이터들을 처리한다.
            await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/register`, {
              method : "POST",
              headers : {
                "Content-Type" : "application/json"
              },
              body : JSON.stringify({ // JSON.stringify 자바스크립트의 값을 문자열로 변환
                name: datas.name,
                phonenum: datas.phonenum,
                email: datas.email,
                password: datas.password,
                nickname : datas.nickname,
              })
            })
            
            .then((res) => res.json())
            .then((res) => {
              console.log(res);
              if (!res.registerSuccess) {
                setToast(res.message);
                return;
              } else {
                setShowSuccessPopup(true);
              }
            })
            .catch(console.log)
          })}>

            <S.FormSection>
              <S.Title>회원가입</S.Title>
              <S.LoginWrap>
                <S.StyledSpan>이미 회원이신가요?</S.StyledSpan>
                <Link to="/login">
                  <S.StyledSpan as="button" type="button" className="signup">로그인</S.StyledSpan>
                </Link>
              </S.LoginWrap>
            </S.FormSection>


            <S.ScrollSection>

              <S.FormSection>
                <S.Label>
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
                </S.Label>

                <S.Label>
                  <S.InsideLabel>
                    <S.LabelText>이메일</S.LabelText>
                    <S.InputWithBtn>
                      <S.Input 
                        type="text" 
                        placeholder="이메일을 입력해주세요." 
                        {...register("email", {
                          required : true,
                          pattern : { value : emailRegex }
                        })}
                        hasError={!!errors.email}
                        isEmpty={getValues("email") === ""}
                        disabled={authVerified}
                        verified={authVerified}
                      />
                      {isSubmitted && errors?.email?.type === "pattern" && (
                        <S.ConfirmMessage>올바른 이메일 형식이 아닙니다.</S.ConfirmMessage>
                      )}
                      {!authSent ? (
                        <S.SmallButton type="button" onClick={handleSendAuthCode}>
                          <S.SmallButtonText>인증번호<br />전송</S.SmallButtonText>
                        </S.SmallButton>
                      ) : !authVerified ? (
                        <S.SmallButton type="button" onClick={handleVerifyCode}>
                          <S.SmallButtonText>인증번호<br />확인</S.SmallButtonText>
                        </S.SmallButton>
                      ) : (
                        <S.SmallButton type="button" disabled>
                          <S.SmallButtonText>인증 완료</S.SmallButtonText>
                        </S.SmallButton>
                      )}
                    </S.InputWithBtn>
                  </S.InsideLabel>

                  {authSent && !authVerified && (
                  <S.InsideLabel>
                    <S.LabelText>인증번호 입력</S.LabelText>
                    <S.Input
                      type="text"
                      placeholder="인증번호를 입력해주세요"
                      value={authCode}
                      onChange={(e) => setAuthCode(e.target.value)}
                    />
                  </S.InsideLabel>
                )}
                </S.Label>


                <S.Label>
                  <S.InsideLabel>
                    <S.LabelText>사용할 닉네임</S.LabelText>
                    <S.InputWithBtn>
                      <S.Input
                        type="text"
                        placeholder="사용할 닉네임을 입력해주세요."
                        {...register('nickname', { required: true })}
                        hasError={!!errors.nickname}
                        isEmpty={!getValues('nickname')}
                        disabled={nicknameChecked}
                        verified={nicknameChecked}
                      />
                      {!nicknameChecked ? (
                        <S.SmallButton type="button" onClick={handleCheckNickname}>
                          <S.SmallButtonText>중복확인</S.SmallButtonText>
                        </S.SmallButton>
                      ) : (
                        <S.SmallButton type="button" disabled>
                          <S.SmallButtonText>중복확인<br />완료</S.SmallButtonText>
                        </S.SmallButton>
                      )}
                    </S.InputWithBtn>

                    {errors.nickname && (
                      <S.ConfirmMessage>{errors.nickname.message}</S.ConfirmMessage>
                    )}
                  </S.InsideLabel>
                </S.Label>


                <S.Label>
                  <S.InsideLabel>
                    <S.LabelText>비밀번호</S.LabelText>
                    <S.PasswordWrapper>
                      <S.Input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="비밀번호를 입력하세요." 
                        {...register("password", {
                          required: true,
                          pattern: { value: passwordRegex }
                        })}
                        hasError={!!errors.password}
                        isEmpty={getValues("password") === ""}
                      />
                      <S.ToggleButton type="button" onClick={() => setShowPassword(!showPassword)}>
                        <img src={process.env.PUBLIC_URL 
                          + (showPassword ? '/assets/images/icons/eye.png' : '/assets/images/icons/eye-off.png')} 
                          alt="비밀번호 보기 토글"/>
                      </S.ToggleButton>
                    </S.PasswordWrapper>
                      {isSubmitted && errors?.password?.type === "pattern" && (
                        <S.ConfirmMessage>소문자, 숫자, 특수문자를 포함한 8자리 이상이어야 합니다.</S.ConfirmMessage>
                      )}
                  </S.InsideLabel>

                  <S.InsideLabel>
                    <S.LabelText>비밀번호 확인</S.LabelText>
                    <S.PasswordWrapper>
                      <S.Input 
                        type={showPasswordConfirm ? "text" : "password"} 
                        placeholder="비밀번호를 다시 입력하세요." 
                        {...register("passwordConfirm", {
                          required: true,
                          validate: {
                            matchPassword: (value) => {
                              const { password } = getValues();
                              return value === password;}
                          }
                        })}
                        hasError={!!errors.passwordConfirm}
                        isEmpty={getValues("passwordConfirm") === ""}
                      />
                      <S.ToggleButton type="button" onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}>
                        <img src={process.env.PUBLIC_URL 
                          + (showPasswordConfirm ? '/assets/images/icons/eye.png' : '/assets/images/icons/eye-off.png')} 
                          alt="비밀번호 보기 토글"/>
                      </S.ToggleButton>
                    </S.PasswordWrapper>
                      {errors?.passwordConfirm && (
                        <S.ConfirmMessage>비밀번호가 일치하지 않습니다.</S.ConfirmMessage>
                      )}
                  </S.InsideLabel>

                </S.Label>

              </S.FormSection>



              <S.FormSection>
                <div>
                  <S.StyledSpanSub> 모두 필수 입력란입니다. </S.StyledSpanSub>

                  <S.CheckboxWrapper>
                    <S.AgreementHeader>
                      <CheckboxIcon
                        checked={agreedAll}
                        onChange={() => {
                          const next = !agreedAll;
                          setAgreedAll(next);
                          setAgreements({
                            terms: next,
                            privacy: next,
                            marketing: next,
                          });
                        }}
                        label="전체동의"
                      />
                    </S.AgreementHeader>

                    <S.AgreementItem>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                      <CheckboxIcon
                        checked={agreements.terms}
                        onChange={() =>
                          setAgreements((prev) => ({ ...prev, terms: !prev.terms }))
                        }
                        label={
                          <>
                            <span style={{ color: '#EB5757', marginRight: '4px' }}>[필수]</span>
                            <span>이용약관 동의</span>
                          </>
                        }
                      />
                      <S.TermsDetailButton type="button" onClick={() => setShowTermsPopup(true)}>
                        <span>더보기</span>
                        <img src={process.env.PUBLIC_URL + '/assets/images/icons/right.png'} alt="화살표 아이콘" />
                      </S.TermsDetailButton>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                      <CheckboxIcon
                        checked={agreements.privacy}
                        onChange={() =>
                          setAgreements((prev) => ({ ...prev, privacy: !prev.privacy }))
                        }
                        label={
                          <>
                            <span style={{ color: '#EB5757', marginRight: '4px' }}>[필수]</span>
                            <span>개인정보 수집 및 이용</span>
                          </>
                        }
                      />
                      <S.TermsDetailButton type="button" onClick={() => setShowTermsPopup(true)}>
                        <span>더보기</span>
                        <img src={process.env.PUBLIC_URL + '/assets/images/icons/right.png'} alt="화살표 아이콘" />
                      </S.TermsDetailButton>
                    </div>


                      <div>
                        <CheckboxIcon
                          checked={agreements.marketing}
                          onChange={() =>
                            setAgreements((prev) => ({ ...prev, marketing: !prev.marketing }))
                          }
                          label={
                            <>
                              <span style={{ color: '#787878', marginRight: '4px' }}>[선택]</span>
                              <span>마케팅 수신 동의</span>
                            </> 
                          }
                        />
                      </div>
                    </S.AgreementItem>
                  </S.CheckboxWrapper>
                </div>

                <div>
                  <BasicButton 
                    type="submit" 
                    customStyle={filledButtonCSS} 
                    disabled={!isFormValid} 
                    style={{ width: '100%' }}
                  >
                    회원가입
                  </BasicButton>
                </div>
              </S.FormSection>

            </S.ScrollSection>

        </S.Form>
        </S.LoginRightBox>

      </S.LoginContainer>
    </>


  );
};

export default SignUpForm;
