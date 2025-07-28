import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setUserStatus } from "../modules/user/user";
import S from './header.style';
import Toast from "./Toast";


const Header = () => {
  const isLogin = useSelector((state) => state.user.isLogin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);  // 토스트 설정

  // 토스트 설정
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 제거
    }
  }, [toast]);

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    dispatch(setUser(null));
    dispatch(setUserStatus(false));
    setToast('로그아웃 되었습니다.');
    navigate("/");
  };


  return (
    <>
      {toast && <Toast message={toast} />}
      <S.Header>
        <S.HeaderContent>
          <Link to="/">
            <S.Logo src="/assets/images/logo.png" alt="logo" />
          </Link>
          <S.Nav>
            <Link to="/category">category</Link>
            <Link to="/archive">archive</Link>
            <Link to="/community">community</Link>
            <Link to="/mypage">my page</Link>
          </S.Nav>
          <S.Login>
            {isLogin ? (
              <button onClick={handleLogout} style={{ all: "unset", cursor: "pointer" }}>
                logout
              </button>
            ) : (
              <Link to="/login">login</Link>
            )}
          </S.Login>
        </S.HeaderContent>
      </S.Header>
    </>
  );
};

export default Header;
