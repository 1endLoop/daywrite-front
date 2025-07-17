import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import L from './login.form.style';
import BasicButton from '../../components/button/BasicButton'
import { filledButtonCSS } from '../../components/button/style';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUserStatus, setUser } from '../../modules/user/user';
import LoginFailPopup from './LoginFailPopup';


const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loginFailPopup, setLoginFailPopup] = useState(false);

  const {
    register, handleSubmit, getValues, formState: {isSubmitting, isSubmitted, errors }
  } = useForm({ mode: "onChange" })

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[!@#])[\da-zA-Z!@#]{8,}$/;
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const userStatus = useSelector((state) => state.user.isLogin);
  const currentUser = useSelector((state) => state.user.currentUser);


  return (
    <L.LoginContainer>
      <L.LoginLeftBox>
        <L.Logo src="/assets/images/logo.png" alt="logo" />
        <L.LoginSubText>글과 음악이 함께하는 공간.</L.LoginSubText>
      </L.LoginLeftBox>


      <L.LoginRightBox>
      <L.Form onSubmit={handleSubmit(async (datas) => {
        // submit이 클릭되었을 때 가로채어 데이터들을 처리한다.
        console.log(datas)

        await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/local`, {
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
          if(!res.ok) {
            const errorResponse = await res.json();
            throw new Error(errorResponse.message || "로그인에 실패했습니다.")
          }
          return res.json()
        })
        .then((res) => {
          // 성공했다면
          const { accessToken } = res;
          // 로그인을 완료한 유저의 상태를 리덕스에 저장하는 코드
          console.log(res)
          // console.log(res.accessToken)
          localStorage.clear();
          localStorage.setItem("token", accessToken);
          dispatch(setUser(res.currentUser));  // 사용자 정보 저장
          dispatch(setUserStatus(true));       // 로그인 상태 true로 변경
          navigate("/");

        })
        .catch(async (err) => {
          console.error("로그인 실패:", err.message);
          setLoginFailPopup(true);
        });
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
                  <L.CommonSubText>비밀번호 찾기</L.CommonSubText>
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

    {loginFailPopup && (
      <LoginFailPopup onClose={() => setLoginFailPopup(false)} />
    )}

    </L.LoginContainer>
  );
};

export default LoginForm;