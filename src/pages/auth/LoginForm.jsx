import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import L from './login.form.style';
import BasicButton from '../../components/button/BasicButton'
import { filledButtonCSS } from '../../components/button/style';
import { Link } from 'react-router-dom';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const {
    register, handleSubmit, getValues, formState: {isSubmitting, isSubmitted, errors }
  } = useForm({ mode: "onSubmit" })
  
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[!@#])[\da-zA-Z!@#]{8,}$/;

  const onSubmit = async (data) => { console.log(data); };

  return (
    <L.LoginContainer>

      <L.LoginLeftBox>
        <L.Logo src="/assets/images/logo.png" alt="logo" />
        <L.LoginSubText>글과 음악이 함께하는 공간.</L.LoginSubText>
      </L.LoginLeftBox>


      <L.LoginRightBox>
        <L.Form onSubmit={handleSubmit(onSubmit)}>

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


    </L.LoginContainer>
  );
};

export default LoginForm;