import React from 'react';
import styled from 'styled-components';
import S from '../my_page/style';
import C from './calendar.style'

import { Link } from 'react-router-dom';
import CalendarList from './CalendarList';

const CalendarHome = () => {
  return (
    <Container> 
      <div style={{marginRight:'30px'}}>
        <S.ProfileHeader>
          <S.Avatar src="/assets/images/profiles/profile.JPG" />
          <div>
            <S.Nickname style={{marginBottom:'10px'}}>예닮</S.Nickname>
            <S.Email>yedam@email.com</S.Email>
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
                <span>필사 125개</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' ,paddingTop:'5px'}}>
                <img src="/assets/images/icons/fire.png" alt="fire" width="24" />
                <span>연속 15일</span>
              </div>
            </div>
        </C.InfoCard>
      </div>
      <CalendarList/>
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

