import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import L from './login.form.style';
import BasicButton from '../../components/button/BasicButton'
import { filledButtonCSS } from '../../components/button/style';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUserStatus, setUser } from '../../modules/user/user';
import AuthPopup from './AuthPopup';
import Toast from "../../components/Toast";


const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loginFailPopup, setLoginFailPopup] = useState(false);
  const [toast, setToast] = useState(null);

  const {
    register, handleSubmit, getValues, setValue, formState: {isSubmitting, isSubmitted, errors }
  } = useForm({ mode: "onChange" })

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[!@#])[\da-zA-Z!@#]{8,}$/;
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // const userStatus = useSelector((state) => state.user.isLogin);
  // const currentUser = useSelector((state) => state.user.currentUser);

  // useEffect(() => {
  //   const savedEmail = localStorage.getItem("rememberedEmail");
  //   if (savedEmail) {
  //     setValue("email", savedEmail); // react-hook-form에서 email 필드 초기화
  //     setRememberMe(true);           // 체크박스 상태도 true로
  //   }
  // }, []);

  useEffect(() => {
    const savedEmail = sessionStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setValue("email", savedEmail);
      setRememberMe(true);
    }
  }, []);


  // 토스트 설정
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 제거
    }
  }, [toast]);


  return (
    <L.LoginContainer>

    {/* 로그인 실패시 팝업 */}
    {loginFailPopup && (
      <AuthPopup 
        title="일치하는 회원정보가 없습니다."
        content="아직 회원이 아니신가요?"
        gosearch="회원정보 찾기"
        gosignup="회원가입 하러가기"
        onClose={() => setLoginFailPopup(false)}
        showCancel={false}
      />
    )}

      <L.LoginLeftBox>
        <L.Logo src="/assets/images/logo.png" alt="logo" />
        <L.LoginSubText>글과 음악이 함께하는 공간.</L.LoginSubText>
      </L.LoginLeftBox>


      <L.LoginRightBox>
      <L.Form onSubmit={handleSubmit(async (datas) => {
        const email = datas.email;

        // 1. 아이디 저장 여부에 따라 localStorage 설정
        // if (rememberMe) {
        //   localStorage.setItem("rememberedEmail", email);
        // } else {
        //   localStorage.removeItem("rememberedEmail");
        // }

        if (rememberMe) {
          sessionStorage.setItem("rememberedEmail", email);
        } else {
          sessionStorage.removeItem("rememberedEmail");
        }


        // 2. 로그인 요청
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/local`, {
          method : "POST",
          headers : {
            "Content-Type" : "application/json"
          },
          body : JSON.stringify({
            email: datas.email,
            password: datas.password,
          })
        })

        .then(async (res) => {
        // 실패했다면
          if (!res.ok) {
            const contentType = res.headers.get("content-type");
            let errorMessage = setToast("로그인에 실패했습니다.");

            if (contentType && contentType.includes("application/json")) {
              const errorResponse = await res.json();
              errorMessage = errorResponse.message || errorMessage;
            } else {
              const errorText = await res.text();  // ← "Unauthorized"
              errorMessage = errorText || errorMessage;
            }

            setLoginFailPopup(true);  // 팝업 띄우기
            throw new Error(errorMessage);
          }

          return res.json();
        })

        .then((res) => {
          console.log(res);
          
          // 성공했다면
          const {currentUser, isLogin } = res;
          // 로그인을 완료한 유저의 상태를 리덕스에 저장하는 코드
          if (res.accessToken) {
            localStorage.setItem("jwtToken", res.accessToken);
          }

          dispatch(setUser(currentUser));
          dispatch(setUserStatus(isLogin));
          navigate("/");
        })
        .catch(console.log);

      })}>

          <L.FormSection>
            <L.Title>로그인</L.Title>
            <L.StyledSpan>Welcome to daywrite!</L.StyledSpan>
          </L.FormSection>

          <L.FormSection>
            <L.Label>
              <L.LabelText>이메일</L.LabelText>
              <L.Input 
                type="text" placeholder="이메일을 입력해주세요." 
                {...register("email", {
                  required : true,
                  pattern : { value : emailRegex }
                })}
                hasError={!!errors.email}
                isEmpty={getValues("email") === ""}
              />
            {isSubmitted && errors?.email?.type === "pattern" && (
              <L.ConfirmMessage>올바른 이메일 형식이 아닙니다.</L.ConfirmMessage>
            )}
            </L.Label>

            <L.Label>
              <L.LabelText>비밀번호</L.LabelText>
              <L.PasswordWrapper>
                <L.Input 
                  type={showPassword ? "text" : "password"} placeholder="비밀번호를 입력하세요." 
                  {...register("password", {
                    required : true,
                    pattern : {
                      value : passwordRegex
                    }
                  })}
                  hasError={!!errors.password}
                  isEmpty={getValues("password") === ""}
                />
                <L.ToggleButton type="button" onClick={() => setShowPassword(!showPassword)}>
                  <img src={process.env.PUBLIC_URL 
                    + (showPassword ? '/assets/images/icons/eye.png' : '/assets/images/icons/eye-off.png')} 
                    alt="비밀번호 보기 토글"/>
                </L.ToggleButton>
              </L.PasswordWrapper>
            {isSubmitted && errors?.password?.type === "pattern" && (
              <L.ConfirmMessage>소문자, 숫자, 특수문자를 포함한 8자리 이상이어야 합니다.</L.ConfirmMessage>
            )} 

              <L.LoginExtras>
                <L.RememberMe onClick={() => setRememberMe(!rememberMe)}>
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      `/assets/images/icons/${rememberMe ? 'checkbox.png' : 'checkbox-off.png'}`
                    }
                    alt="아이디 저장 체크박스"
                    style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                  />
                  <L.CommonSubText style={{ marginLeft: '8px' }}>아이디 저장</L.CommonSubText>
                </L.RememberMe>
                
                <L.FindPassword type="button" >
                  <span>
                    <Link to="/search/id">
                      <L.CommonSubText>아이디 찾기</L.CommonSubText>
                    </Link>
                    <L.CommonSubText>&nbsp; | &nbsp;</L.CommonSubText>
                    <Link to="/search/password">
                      <L.CommonSubText>비밀번호 찾기</L.CommonSubText>
                    </Link>
                  </span>
                </L.FindPassword>
              </L.LoginExtras>

            </L.Label>
          </L.FormSection>

        <BasicButton customStyle={filledButtonCSS}>로그인</BasicButton>

        <L.SignupWrap>
          <L.StyledSpan>아직 회원이 아니신가요?</L.StyledSpan>
          <Link to="/signup">
            <L.StyledSpan as="button" type="button" className="signup">회원가입</L.StyledSpan>
          </Link>
        </L.SignupWrap>

      </L.Form>
      </L.LoginRightBox>

    </L.LoginContainer>
  );
};

export default LoginForm;