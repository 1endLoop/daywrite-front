import React from 'react'
import styled from 'styled-components'
import S from "./history.detail";

const CalendarPopup = ({calendarData,selectedDate,closePopup}) => {
    return(
   <S.Overlay>
        <S.Modal>
            <Header>
                <Date>{selectedDate}</Date>
                <S.IconGroup>
                    <S.CloseBtn onClick={closePopup}>
                        <img src="../assets/images/icons/svg/close.svg" alt="close" />
                    </S.CloseBtn>
                </S.IconGroup>
            </Header>
  
            <S.Divider />
            
            {calendarData[selectedDate] && calendarData[selectedDate].map((item, i) => (
                <div key={i}>
                    <S.Content>{item.title}</S.Content>
                    <S.SourceBox>
                    <span className="label">출처</span>
                    <span className="title">{item.title}</span>
                    <span className="author">{item.author}</span>
                    </S.SourceBox>
                    <S.Divider />
                </div>
            ))}
        </S.Modal>
      </S.Overlay>
    )
};

export default CalendarPopup

const Header = styled.div`
    width: 100%;
    margin-bottom: 18px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Date = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #282828;
`;