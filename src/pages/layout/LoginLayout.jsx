import React, { useEffect } from 'react';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';

const LoginLayout = () => {

    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

    // 로그인 처리
    useEffect(() => {
        const accessToken = searchParams.get("accessToken");
        console.log("accessToken", accessToken)
        if(accessToken){
            localStorage.setItem("jwtToken", accessToken)
            navigate("/auth/category", { replace: true }) //  replace: true -> 기록 삭제
        }

        const localToken = localStorage.getItem("jwtToken");
        if(!localToken){
            navigate('/login', { replace : true })
        }
    }, [searchParams, navigate])

    return (
        <Outlet />
    );
};

export default LoginLayout;