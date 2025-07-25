import React from 'react'
import styled from 'styled-components'
import S from "./history.detail";

const CalendarPopup = ({calendarData,selectedDate,closePopup}) => {
    return(
   <S.Overlay>
        <S.Modal style={{maxHeight:"550px"}}>
            <Header>
                <Date>{selectedDate}</Date>
                <S.IconGroup>
                    <S.CloseBtn onClick={closePopup}>
                        <img src="../assets/images/icons/svg/close.svg" alt="close" />
                    </S.CloseBtn>
                </S.IconGroup>
            </Header>
  
            <S.Divider style={{marginBottom:0}}/>
            
            {calendarData[selectedDate] && calendarData[selectedDate].map((item, i) => (
                <div key={i} style={{backgroundColor:item.mood, padding:15, borderBottom:"1px solid #ddd"}}>
                    <S.Content style={{overflow: "hidden", whiteSpace:"nowrap", textOverflow: "ellipsis", maxWidth: 600 }}>{item.content}</S.Content>
                    <S.SourceBox style={{marginBottom:0}}>
                        <div style={{width:300}}>
                            <span className="label">출처</span>
                            <span className="title">{item.book}</span>
                            <span className="author">{item.author}</span>
                        </div>
                         <div style={{overflow: "hidden", whiteSpace:"nowrap", textOverflow: "ellipsis", maxWidth: 300 }}>
                            <span className="label">🎵</span>
                            <span className="title">{item.music}</span>
                            <span className="author">{item.artist}</span>
                        </div>
                    </S.SourceBox>
                    {/* <S.Divider /> */}
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