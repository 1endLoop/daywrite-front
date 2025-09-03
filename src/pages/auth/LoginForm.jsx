// src/pages/auth/LoginForm.jsx
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import L from "./login.form.style";
import BasicButton from "../../components/button/BasicButton";
import { filledButtonCSS } from "../../components/button/style";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserStatus, setUser } from "../../modules/user/user";
import AuthPopup from "./AuthPopup";
import Toast from "../../components/Toast";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loginFailPopup, setLoginFailPopup] = useState(false);
  const [toast, setToast] = useState(null);

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { isSubmitting, isSubmitted, errors },
  } = useForm({ mode: "onChange" });
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[!@#])[\da-zA-Z!@#]{8,}$/;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const savedEmail = sessionStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setValue("email", savedEmail);
      setRememberMe(true);
    }
  }, [setValue]);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  return (
    <L.LoginContainer>
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
        <L.Form
          onSubmit={handleSubmit(async (datas) => {
            const email = datas.email;

            if (rememberMe) sessionStorage.setItem("rememberedEmail", email);
            else sessionStorage.removeItem("rememberedEmail");

            try {
              const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/local`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: datas.email, password: datas.password }),
              });

              if (!res.ok) {
                let errorMessage = "로그인에 실패했습니다.";
                const ct = res.headers.get("content-type");
                if (ct && ct.includes("application/json")) {
                  const j = await res.json();
                  errorMessage = j?.message || errorMessage;
                } else {
                  errorMessage = (await res.text()) || errorMessage;
                }
                setToast(errorMessage);
                setLoginFailPopup(true);
                throw new Error(errorMessage);
              }

              const data = await res.json();
              // ✅ 응답에서 토큰을 표준키로 저장
              const token = data.accessToken ?? data.token ?? data.jwt ?? data.jwtToken ?? null;
              const user = data.user ?? data.currentUser ?? null;

              if (token) {
                localStorage.setItem("accessToken", token);
                // 구 키 정리(선택)
                localStorage.removeItem("jwtToken");
                localStorage.removeItem("token");
                localStorage.removeItem("jwt");
              }

              // 필요 시 자동로그인(me)로 user 보강
              let finalUser = user;
              if (token) {
                try {
                  const meRes = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/jwt`, {
                    method: "POST",
                    headers: { Authorization: `Bearer ${token}` },
                  });
                  if (meRes.ok) {
                    const meJson = await meRes.json();
                    finalUser = meJson?.user ?? finalUser ?? null;
                  }
                } catch (e) {
                  console.warn("Failed to fetch me:", e);
                }
              }

              if (finalUser && finalUser._id) {
                localStorage.setItem("uid", finalUser._id);
              }

              dispatch(setUser(finalUser));
              dispatch(setUserStatus(Boolean(finalUser || token)));
              navigate("/");
            } catch (err) {
              console.error(err);
            }
          })}
        >
          <L.FormSection>
            <L.Title>로그인</L.Title>
            <L.StyledSpan>Welcome to daywrite!</L.StyledSpan>
          </L.FormSection>

          <L.FormSection>
            <L.Label>
              <L.LabelText>이메일</L.LabelText>
              <L.Input
                type="text"
                placeholder="이메일을 입력해주세요."
                {...register("email", { required: true, pattern: { value: emailRegex } })}
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
                  type={showPassword ? "text" : "password"}
                  placeholder="비밀번호를 입력하세요."
                  {...register("password", { required: true, pattern: { value: passwordRegex } })}
                  hasError={!!errors.password}
                  isEmpty={getValues("password") === ""}
                />
                <L.ToggleButton type="button" onClick={() => setShowPassword(!showPassword)}>
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      (showPassword ? "/assets/images/icons/eye.png" : "/assets/images/icons/eye-off.png")
                    }
                    alt="비밀번호 보기 토글"
                  />
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
                      `/assets/images/icons/${rememberMe ? "checkbox.png" : "checkbox-off.png"}`
                    }
                    alt="아이디 저장 체크박스"
                    style={{ width: "18px", height: "18px", cursor: "pointer" }}
                  />
                  <L.CommonSubText style={{ marginLeft: "8px" }}>아이디 저장</L.CommonSubText>
                </L.RememberMe>

                <L.FindPassword type="button">
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
              <L.StyledSpan as="button" type="button" className="signup">
                회원가입
              </L.StyledSpan>
            </Link>
          </L.SignupWrap>
        </L.Form>
      </L.LoginRightBox>
    </L.LoginContainer>
  );
};

export default LoginForm;
