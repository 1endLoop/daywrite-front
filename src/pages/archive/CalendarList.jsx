import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendarcustom.css';
import styled from 'styled-components';
import CalendarPopup from './CalendarPopup';

const CalendarList = () => {
  const [calendarData, setCalendarData] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  // 로그인 유저 확인
  const auth = useSelector((s) => s.user || s.auth || {});
  const rawUser = auth.user || auth.data || auth.profile || auth.currentUser || null;
  const userId = rawUser?._id ?? rawUser?.id ?? rawUser?.userId ?? localStorage.getItem("uid") ?? null;
  const isAuthed = typeof auth.isLoggedIn === "boolean" ? auth.isLoggedIn : Boolean(userId);

  useEffect(() => {
    if (!isAuthed || !userId) {
      return;
    }

      const fetchData = async () => {
        try {
          // 1. 모든 history 불러오기
          const token = localStorage.getItem("jwtToken");
          
          const historyRes = await fetch(`http://localhost:8000/api/history/user/${userId}`, {
            headers: {
              ...(token ? { Authorization: `Bearer ${token}` } : {})
            }
          });
          
          if (!historyRes.ok) {
            console.error("API 응답 에러:", historyRes.status, historyRes.statusText);
            return;
          }
          
          const histories = await historyRes.json();
          console.log("받아온 histories:", histories)
        
          const data = {};
          histories.forEach(({createdAt,content ,book, author, mood, music, artist}) => {
            const date = new Date(createdAt).toLocaleDateString('en-CA');
            data[date] =data[date] || [];
            data[date].push({ content:content,book: book, author: author ,mood: mood ,music:music,artist:artist});
          });
          console.log(data);

        setCalendarData(data);
        } catch (err) {
          console.error("데이터 불러오기 실패:", err);
        }
      };

    fetchData();
  }, [isAuthed, userId]);

  const handleDateClick = (date) => {
    const dateString = date.toLocaleDateString('en-CA');
    if (calendarData[dateString]) {
      setSelectedDate(dateString);
      setShowPopup(true);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedDate(null);
  };

  return ( 
  <Container>
    <Calendar locale="en-US"
      onClickDay={handleDateClick} //onClickDay :  react-calendar에서 원래 제공하는 props 함수
      tileContent={({ date, view }) => {
        const dateString =date.toLocaleDateString('en-CA');  //날짜를 문자열로 변환 
        if (view === 'month' && calendarData[dateString]) {
          const { book, author, mood } = calendarData[dateString][0]; //첫번째 요소만 달력에 표시하기 

          return (
            <Background style={{backgroundColor: mood}}>
            <Title>{book}</Title>
            <Author>{author}</Author>
            </Background>
          );
        }
        return null;
      }}
    />

    {showPopup && (
      <CalendarPopup 
      calendarData={calendarData} selectedDate={selectedDate}  closePopup={closePopup} 
      />
    )}
  </Container> 
  );
};

export default CalendarList;


const Container=styled.div`
  width:100%;
`

const Background = styled.div`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  padding:4px;
  display:flex;
  flex-direction: column;  
  justify-content: flex-end;  
  text-align:left;
`;
const Title=styled.div`
  font-size: 14px;
  color: #282828;
  z-index: 1;
  font-weight: bold;
  width: 100%;
  word-break: break-word;   
  overflow-wrap:break-word;  
`

const Author = styled.div`
  font-size: 12px;
  color: #282828;
  z-index: 1;
  opacity: 0.40;
`;