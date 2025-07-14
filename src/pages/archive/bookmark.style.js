
import styled from "styled-components";

const S = {}

// Bookmark Hoom
S.TypedTitle = styled.div`
    width: 100%;
    margin-top: 20px;
    h2{
        font-size: 22px;
    }
`
S.TypedWrapper = styled.div`
    /* border: solid 1px #787878; */
    display: flex;
    width: 100%;
    height: 210px;
    display: flex;
    margin-top: 5px;
    overflow-x: auto;
    /* overflow-x: hidden; // 가로스크롤 숨김 */
    &::-webkit-scrollbar {
        display: none; // 스크롤바 숨김 (선택)
    }
`
// Typed 이미지
S.TypedBox = styled.div`
    /* border: solid 1px black; */
    width: 150px;
    height: 100%;
    margin-right: 10px;
    min-width: 180px;  // 박스 하나 너비 고정
    img {
        /* border: solid 1px red; */
        width: 100%;
        height: 160px;
    }
`
// Typed 제목, ...
S.LetterBox = styled.div`
    /* border: solid 1px yellow; */
    width: 100%;
    height: 50px;
    justify-content: space-between;
    position: relative;

    h6 {
        margin-top: 5px;
        margin-left: 3px;
    }
    p {
        margin-top: 8px;
        font-size: 15px;
        color: #787878;
        margin-left: 3px;
    }
`
// 스크롤
S.SliderWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    margin-top: 20px;
`;

S.ArrowButton = styled.button`
    /* position: absolute; right: 10px; 포지션 이동X*/ 
    background: white;
    border-radius: 50%;
    border: 1px solid #ccc;
    font-size: 20px;
    cursor: pointer;
    padding: 5px 10px;
    z-index: 2;
`;

// 드롭다운
S.dd = styled.div`
    border: solid 1px red;
    width: 18px;
    height: 18px;
    position: absolute; right: 0px; top: 0px;
    z-index: 1;
`
S.Wrapper = styled.div`
  position: relative;
`

S.Menu = styled.div`
  position: absolute;
  top: 24px;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
`
S.Item = styled.div`
  padding: 10px 16px;
  font-size: 14px;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background-color: #f2f2f2;
  }
`

// Played Wrap
S.PlayedTitle = styled.div`
    width: 100%;
    margin-top: 20px;
`
S.PlayedWrapper = styled.div`
    border: solid 1px red;
    width: 100%;
    height: 240px;
    display: flex;
    margin-top: 10px;
`

// ========================================
// 북마크 리스트
S.HeaderWrap = styled.div`
    /* border: solid 1px red; */
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: space-between;
`
S.HeaderBox = styled.div`
    /* border: solid 1px black; */
    width: 250px;
    height: 100%;
    display: flex;
    gap: 10px;
    margin-left: 55px;
    justify-content: center; //수직 가운데 정렬
    align-items: center; // 수평 가운데 정렬

    // 뒤로가기 화살표 
    img{
        /* border: solid 1px red; */
        width: 30px;
        height: 30px;
        /* position: absolute; top: 50px; left: 10px; */
    }
    p {
        font-size : 15px;
        color: #787878;
    }
`
S.Search = styled.div`
    width: 250px;
    height: 30px;
    margin-top: 25px;
    margin-right: 120px;
    display: flex;
    position: relative;

    input {
        margin-top: 10px;
        width: 350px;
        height: 30px;
        border-radius: 5px;
        border: 1px solid #BFBFBF;
        border-radius: 5px;
    }
    // 검색 돋보기
    img {
        border: solid 1px #BFBFBF;
        width: 25px;
        height: 25px;
        position: absolute; right: 8px; top: 14px;
        border: none;
    }
`

S.BodyWrap = styled.div`
    /* border: solid 1px red; */
    width: 100%;
    height: 600px;
    display: flex;
    justify-content: space-between;
`
// 북마크 상세 이미지, 제목, 편집
S.BookBox = styled.div`
    /* border: solid 1px black; */
    width: 200px;
    height: 250px;
    margin-top: 10px;
    margin-left: 100px;
    //책 표지
    img {
        width: 100%;
        height: 170px;
    }
`
S.BookInfo = styled.div`
    display: flex;
    width: 100%;
    height: 70px;
    justify-content: space-between;
    #title{
        margin-top: 10px;
        width: 120px;
        height: 100%;
        h4{
            font-size: 16px;
        }
        p{
            margin-top: 10px;
            font-size: 15px;
            color: #787878;
            cursor: pointer;
        }
    }
    #imgEditBox{
        /* border: solid 1px red; */
        width: 70px;
        height: 70px;
        // ...드롭다운
        div {
            margin-top: 10px;
            margin-left: 45px;
            border: solid 1px red;
            width: 15px;
            height: 15px;
            img{
                width: 15px;
                height: 15px;
            }
        }
        // 편집 누를 시 나오는 카운트
        p{
            margin-top: 10px;
            margin-left: 10px;
            font-size: 12px;
            color: #787878;
        }
    }
`
//북마크 리스트
S.TypeInfo = styled.div`
    /* border: solid 1px black; */
    width: 700px;
    height: 600px;
    margin-top: 0px;
    margin-right: 120px;
`
S.TypedCard = styled.div`
    /* border: solid 1px #787878; */
    width: 100%;
    height: 180px;
    margin-top: 10px;
    border-radius: 5px;
`
S.TypedCardTitle = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 15px;
    h3{
        margin-left: 15px;
        font-size: 18px;
    }
    p {
        font-size: 15px;
        color: #787878;
    }
    /* 북마크 아이콘 */
    img {
        width: 20px;
        height: 20px;
        position: absolute;
        transform: translateX(650px);
    }
`
S.TypedCardDetail = styled.div`
    margin-top: 20px;
    margin-left: 15px;
    margin-right: 15px;
    
    p{
        height: 72px;
        font-size: 16px;
        overflow-y: hidden;
    }
`
S.CardAuthor = styled.div`
    margin-top: 20px;
    margin-left: 15px;
    display: flex;
    /* 하트아이콘 */
    img{
        width: 15px;
        height: 15px;
    }
    p{
        margin-left: 15px;
        font-size: 16px;
    }
`
// 북마크 드롭다운
S.DropdownWrapper = styled.div`
  position: relative;
`

S.TypedMenu = styled.div`
  position: absolute; right: -15px; top: -40px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
`
S.TypedItem = styled.div`
  padding: 10px 16px;
  font-size: 14px;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background-color: #f2f2f2;
  }
`
// ===================================
// 플레이 모음 상세
S.PlayBox = styled.div`
    /* border: solid 1px black; */
    width: 700px;
    height: 100%;
    margin-right: 120px;
`
S.PlayInfo = styled.div`
    border-bottom: solid 1px black;
    width: 700px;
    height: 40px;
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #787878;

    .num{
        margin-left: 15px;
    }
    .album{
        margin-left: 32px;
    }
    .singName{
        margin-left: 120px;
    }
    .artistName{
        margin-left: 120px;
    }
    .like{
        margin-left: 55px;
    }
    .play{
        margin-left: 60px;
    }
`
S.PlayedCardBox = styled.div`
    /* border: solid 1px red; */
    width: 700px;
    height: 45px;
    display: flex;
    align-items: center;
    margin-top: 5px;
    border-bottom: solid 1px #e0e0e0;
    
    &.selected {
        border: 1px solid #F96F3D; // 선택 시 테두리
    }
    .num{
        /* border: solid 1px black; */
        width: 20px;
        height: 20px;
        margin-left: 12px;
        display: flex;
        p{
            font-size: 15px;
            text-align: center;
            margin: auto;
        }
    }
    .album{
        border: solid 1px black;
        width: 35px;
        height: 35px;
        margin-left: 27px;
    }
    .singName{
        border: solid 1px black;
        width: 230px;
        height: 35px;
        margin-left: 30px;
        display: flex;
        p{
            text-align: center;
            font-size: 16px;
            margin: auto;
        }
    }
    .artistName{
        border: solid 1px black;
        width: 100px;
        height: 35px;
        margin-left: 20px;
        display: flex;
        p{
            text-align: center;
            font-size: 14px;
            margin: auto;
        }
    }
    .like{
        border: solid 1px black;
        width: 70px;
        height: 35px;
        margin-left: 20px;
    }
    .play{
        border: solid 1px black;
        width: 90px;
        height: 35px;
        margin-left: 20px;
    }
`

//=====================================
// 팝업
/* 전체 컨테이너 */
S.PopupContainer = styled.div`
  /* height: 100vh; */
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

/* 팝업 배경 */
.popup {
  position: fixed;
  top: 0; left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5); //백그라운드 흐리게
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}    
/* 팝업 본체 */
.popup-box {
  background: white;
  padding: 20px 30px;
  border-radius: 10px;
  min-width: 300px;
  position: relative;
  /* text-align: center; */
  width: 750px;
  height: 550px;
  overflow: auto;
}
.PopupBook {
    font-size: 16px;
    color: #787878;
}

/* 닫기 버튼 */
.close-btn {
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 24px;
  cursor: pointer;
  color: #888;
}

.close-btn:hover {
  color: black;
}

// 팝업 내용
.popupHeader{
  display: flex;
  justify-content: space-between;
}
.popBody{
    border-top: 1px solid #000;
    border-bottom: 1px solid #000;
    width: 750px;
    height: 500px;
    margin-top: 15px;
    display: flex;
}
.bookImg{
    /* border: 1px solid red; */
    margin-top: 20px;
    margin-left: 10px;
    width: 200px;
    height: 270px;
    img{
        width: 200px;
        height: 270px;
    }
}
// 팝업 내용
.bookDetail{
    border: solid 1px black;
    margin-top: 20px;
    margin-left: 50px;
    width: 450px;
    height: 450px;
    padding: 8px;
    overflow-y: auto;
    /* position: relative; */
    
}
.detailTitle{
    justify-items: left;
    h3{
        font-size: 18px;
        text-align: left;
    }
    p{
        font-size: 16px;
        margin-top: 8px;
        color: #787878;
    }
}
.author{
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
    strong{
        font-size: 16px;
        color: #787878;
        
    }
    p{
        margin-left: 8px;
        font-size: 16px;
        margin-right: 0px;
    }
}
.popupTitleBox{
    width: 210px;
    display: flex;
    margin-left: 10px;
}
.bookDate{
    margin-top: 8px;
    display: flex;
    justify-content: space-between;
    strong{
        font-size: 16px;
        color: #787878;
    }
    p{
        margin-left: 8px;
        font-size: 16px;
    }
}
.con{
    font-size: 16px;
    margin-top: 20px;
}
`




export default S