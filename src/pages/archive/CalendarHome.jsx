import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import S from '../my_page/style';
import C from './calendar.style'

import { Link } from 'react-router-dom';
import CalendarList from './CalendarList';

const CalendarHome = () => {
  const [WritingCount, setWritingCount] = useState(0); //필사개수
  const [ConsecutiveDays, setConsecutiveDays] = useState(0); //연속필사일
  
  // 로그인 유저 확인
  const auth = useSelector((s) => s.user || s.auth || {});
  const rawUser = auth.user || auth.data || auth.profile || auth.currentUser || null;
  const userId = rawUser?._id ?? rawUser?.id ?? rawUser?.userId ?? localStorage.getItem("uid") ?? null;
  const isAuthed = auth.isLogin === true && Boolean(userId);

  if (!isAuthed || !userId) {
    alert("로그인이 필요합니다.");
    return null;
  }

  return (
    <Container> 
      <div style={{marginRight:'30px'}}>
        <S.ProfileHeader>
          <S.Avatar src="/assets/images/profiles/profile.JPG" />
          <div>
            <S.Nickname style={{marginBottom:'10px'}}>{rawUser?.nickname || rawUser?.name || '사용자'}</S.Nickname>
            <S.Email>{rawUser?.email || ''}</S.Email>
          </div>
        </S.ProfileHeader>
        <C.InfoCard>
            <Level>
              <img src="/assets/images/icons/star.png" alt="star" width="24" />
              <span>레벨 10</span>
            </Level>
            <div style={{marginLeft:'15px'}}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', paddingBottom:'5px' }}>
                <img src="/assets/images/icons/keyboard.png" alt="keyboard" width="24" />
                <span>필사 {WritingCount}개</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' ,paddingTop:'5px'}}>
                <img src="/assets/images/icons/fire.png" alt="fire" width="24" />
                <span>연속 {ConsecutiveDays}일</span>
              </div>
            </div>
        </C.InfoCard>
      </div>
      <CalendarList userId={userId} setWritingCount={setWritingCount} setConsecutiveDays={setConsecutiveDays} />
    </Container>
  );
};


const Container = styled.div`
  width: 100%;
  padding-top: 24px;
  padding-bottom: 24px;
  margin-bottom:100px;
  display: flex;
`;

const Level = styled.div`
  position: relative;
  display: flex;
  align-items:center;
  flex-direction:column;
  gap: 5px;
  padding:5px;
  margin-right:10px;

  :after{
    content: ""; 
    position: absolute;
    top: 0;
    left: 75px;
    width: 1.5px; 
    height: 100%; 
    background-color: #e0e0e0;
  }
`;

export default CalendarHome;

