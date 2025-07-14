import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import S from './signup.form.style';
import BasicButton from '../../components/button/BasicButton'
import { filledButtonCSS } from '../../components/button/style';
import { Link, useNavigate } from 'react-router-dom';
import SignUpPopup from './SignUpPopup';

const SignUpForm = () => {
  const {
    register, handleSubmit, getValues, setError, clearErrors, 
    formState: {isSubmitting, isSubmitted, errors }
  } = useForm({ mode: "onSubmit" })
  
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[!@#])[\da-zA-Z!@#]{8,}$/;
  
  // const onSubmit = async (data) => { console.log(data); };
  
  const [showPassword, setShowPassword] = useState(false);  // 비밀번호
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);  // 비밀번호 확인

  const [authSent, setAuthSent] = useState(false);
  const [authCode, setAuthCode] = useState(''); // 사용자가 입력한 인증번호
  const [generatedCode, setGeneratedCode] = useState(''); // 실제 발송된 인증번호
  const [authVerified, setAuthVerified] = useState(false);
  const [authFailed, setAuthFailed] = useState(false);

  const [alertMessage, setAlertMessage] = useState('');
  const [authSuccess, setAuthSuccess] = useState(false);  // 인증번호 인증성공
  const [authFail, setAuthFail] = useState(false);  // 인증번호 인증실패
  const [nicknameChecked, setNicknameChecked] = useState(false);  // 닉네임 중복 확인
  const [agreedAll, setAgreedAll] = useState(false);

  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
    marketing: false,
  });

  // 알럿설정
  const showAlert = (message) => {
    setAlertMessage(message);
    setTimeout(() => setAlertMessage(''), 3000); // 3초 뒤 메시지 제거
  };

  const handleSendAuthCode = () => {
    const newCode = '123456';
    setGeneratedCode(newCode);
    setAuthSent(true);
    setAuthVerified(false);
    setAuthFailed(false);
    alert("인증번호가 발송되었습니다. 이메일을 확인해주세요!");
  };

  const handleVerifyCode = () => {
    if (authCode === generatedCode) {
      setAuthVerified(true);
      alert("인증번호가 일치합니다!");
    } else {
      setAuthFailed(true);
      alert("인증번호가 일치하지 않습니다. 다시 인증번호를 발송했으니 이메일을 확인해주세요!");
      setAuthSent(false); // 다시 전송하도록 초기화
      setAuthCode('');
    }
  };

  const handleCheckNickname = () => {
    const nickname = getValues('nickname');
    if (!nickname) {
      setError('nickname', { type: 'manual', message: '닉네임을 입력해주세요.' });
      return;
    }
    if (nickname === 'takenName') {
      setError('nickname', { type: 'manual', message: '닉네임이 이미 사용중입니다.' });
      setNicknameChecked(false);
    } else {
    clearErrors('nickname');
    setNicknameChecked(true);
    alert('사용 가능한 닉네임입니다.');
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
    getValues("email") &&
    getValues("authCode") &&
    getValues("nickname") &&
    getValues("password") &&
    getValues("passwordConfirm") &&
    agreements.terms &&
    agreements.privacy;

// 팝업설정
  const [showPopup, setShowPopup] = useState(false);

// 회원가입 성공 시 로그인 화면 이동
  const navigate = useNavigate()

  return (
    <S.LoginContainer>
      {showPopup && (
        <SignUpPopup
          title="이용약관 동의"
          content="회원가입 시점에 이용자로부터 수집하는 개인정보는 아래와 같습니다. 회원 가입 시 필수항목으로 아이디, 비밀번호, 이름, 생년월일, 성별, 휴대전화번호를, 선택항목으로 본인확인 이메일주소를 수집합니다. 실명 인증된 아이디로 가입 시, 암호화된 동일인 식별정보(CI), 중복가입 확인정보(DI), 내외국인 정보를 함께 수집합니다. 만 14세 미만 아동의 경우, 법정대리인의 동의를 받고 있으며, 휴대전화번호 또는 아이핀 인증을 통해 법정대리인의 동의를 확인하고 있습니다. 이 과정에서 법정대리인의 정보(법정대리인의 이름, 중복가입확인정보(DI), 휴대전화번호(아이핀 인증인 경우 아이핀번호))를 추가로 수집합니다. 비밀번호 없이 회원 가입 시에는 필수항목으로 아이디, 이름, 생년월일, 휴대전화번호를, 선택항목으로 비밀번호를 수집합니다. 단체 회원가입 시 필수 항목으로 단체아이디, 비밀번호, 단체이름, 이메일주소, 휴대전화번호를, 선택항목으로 단체 대표자명을 수집합니다."
          onClose={() => setShowPopup(false)}
          onConfirm={() => setShowPopup(false)}
        />
      )}


      <S.LoginLeftBox>
        <S.Logo src="/assets/images/logo.png" alt="logo" />
        <S.LoginSubText>글과 음악이 함께하는 공간.</S.LoginSubText>
      </S.LoginLeftBox>


      <S.LoginRightBox>
        <S.Form onSubmit={handleSubmit( async (datas) => {
          // submit이 클릭되었을 때 가로채어 데이터들을 처리한다.
          await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/api/register`, {
            method : "POST",
            headers : {
              "Content-Type" : "application/json"
            },
            body : JSON.stringify({ // JSON.stringify 자바스크립트의 값을 문자열로 변환
              email: datas.email,
              password: datas.password,
              nickname : datas.nickname,
              // name: datas.name
            })
          })
          .then((res) => res.json())
          .then((res) => {
            console.log(res)
            if(!res.registerSuccess){
              alert(res.message)
              return;
            }else { // 회원가입 성공 메시지 후 로그인 패이지 이동
              alert(res.message)
              // navigate("/login)
            }
          })
          .catch(console.log)
          console.log(datas)
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
                  <S.Input type="text" placeholder="이름을 입력해주세요." />
                  {isSubmitted && errors?.email?.type === "pattern" && (
                    <S.ConfirmMessage>올바른 이메일 형식이 아닙니다.</S.ConfirmMessage>
                  )}
                </S.InsideLabel>
              </S.Label>

              <S.Label>
                <S.InsideLabel>
                  <S.LabelText>이메일</S.LabelText>
                  <S.Input 
                    type="text" placeholder="이메일을 입력해주세요." 
                    {...register("email", {
                      required : true,
                      pattern : { value : emailRegex }
                    })}
                    hasError={!!errors.email}
                    isEmpty={getValues("email") === ""}
                  />
                  {isSubmitted && errors?.email?.type === "pattern" && (
                    <S.ConfirmMessage>올바른 이메일 형식이 아닙니다.</S.ConfirmMessage>
                  )}
                </S.InsideLabel>

                <S.InsideLabel>
                  <S.LabelText>인증번호</S.LabelText>
                  <S.InputWithBtn>
                    <S.Input 
                      type="text"
                      placeholder="인증번호를 입력해주세요."
                      value={authCode}
                      onChange={(e) => setAuthCode(e.target.value)}
                      disabled={!authSent || authVerified}
                      verified={authVerified}
                    />
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
                        <S.SmallButtonText>인증번호<br />확인</S.SmallButtonText>
                      </S.SmallButton>
                    )}
                  </S.InputWithBtn>
                </S.InsideLabel>
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
                    <S.TermsDetailButton type="button" onClick={() => setShowPopup(true)}>
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
                    <S.TermsDetailButton type="button" onClick={() => setShowPopup(true)}>
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
                  // disabled={!isFormValid} 
                  style={{ width: '100%' }}>
                  회원가입
                </BasicButton>
              </div>
            </S.FormSection>

          </S.ScrollSection>

      </S.Form>
      </S.LoginRightBox>

    </S.LoginContainer>

  );
};

export default SignUpForm;
