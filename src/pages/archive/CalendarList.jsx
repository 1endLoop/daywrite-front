import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendarcustom.css';
import styled from 'styled-components';
import CalendarPopup from './CalendarPopup';

const CalendarList = () => {
  const [calendarData, setCalendarData] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);


  useEffect(() => {
    const dummyData = [
      { date: '2025-06-30', title: 'aaaa',author: 'dd is good', color: '#D8FFE3' },
      { date: '2025-06-30', title: 'travcommoeefsfefaefnadlikeiyoudel',author: 'lucy is good', color: '#D8FFE3' },
      { date: '2025-06-01', title: 'friends is aefeafefaefaefgood godd gdodo',author: 'happy day', color: '#FFDEE3' },
      { date: '2025-06-04', title: 'mylife haha', author: 'goodluct',color: '#FFF3C7' },
      { date: '2025-06-13', title: 'today mtoydkaynood is ood',author: 'applecomapny', color: '#FFF9C4' },
      { date: '2025-06-22', title: 'LUY ',author: 'drawio', color: '#D8FFE3' },
      { date: '2025-06-11', title: 'hate yourseaefaeflf', author: 'phone',color: '#FFDCFA' },
      { date: '2025-06-11', title: 'Love youaeaefefaefrself', author: 'phone',color: '#FFDCFA' },
      { date: '2025-06-11', title: 'Love youaaefaeefefefaefrself', author: 'phone',color: '#FFDCFA' },
      { date: '2025-06-11', title: 'Love yoaefafeaefeurself', author: 'phone',color: '#FFDCFA' },
      { date: '2025-06-11', title: 'Love yourself', author: 'phone',color: '#FFDCFA' },
    ];

    const data = {};
    dummyData.forEach(({date, title, author, color}) => {
      data[date] =data[date] || [];
      data[date].push({ title: title, author: author ,color: color });
    });

    setCalendarData(data);
  },[]);

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
          const { title, author, color } = calendarData[dateString][0]; //첫번째 요소만 달력에 표시하기 

          return (
            <Background style={{backgroundColor: color}}>
            <Title>{title}</Title>
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