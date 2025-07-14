import styled from "styled-components";

const S = {};

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
    margin-left: 20px;
    justify-content: center; //수직 가운데 정렬
    align-items: center; // 수평 가운데 정렬

    // 뒤로가기 화살표 
    img{
        /* border: solid 1px red; */
        width: 30px;
        height: 30px;
        /* position: absolute; top: 50px; left: 10px; */
    }
`
S.EditBox = styled.div`
    /* border: solid 1px red; */
    width: 40px;
    height: 25px;
    margin-right: 120px;
    margin-top: 75px;
    justify-content: center;
    align-items: center;

    .detailEdit{
        font-size: 15px;
        color: #787878;
        cursor: pointer;
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
    width: 150px;
    height: 200px;
    margin-top: 10px;
    margin-left: 100px;
    //책 표지
    img {
        width: 100%;
        height: 150px;
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
            font-size: 15px;
        }
        p{
            margin-top: 10px;
            font-size: 13px;
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
S.DetailSolid = styled.div`
    border: solid 1px #e0e0e0;
    height: 100%;
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
`
S.TypedCardDetail = styled.div`
    margin-top: 20px;
    margin-left: 15px;
    margin-right: 15px;
    p{
        font-size: 16px;
    }
`
S.BlankSolid = styled.div`
    width: 650px;
    border: solid 1px #787878;
    margin-top: 10px;
    margin-left: 15px;
`
S.CardAuthor = styled.div`
    margin-top: 10px;
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
  z-index: 1000;
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
    /* border: solid 1px black; */
    margin-top: 20px;
    margin-left: 50px;
    width: 450px;
    height: 450px;
    padding: 8px;
    /* position: relative; */
    
}
.detailTitle{
    justify-items: left;
    h3{
        font-size: 18px;
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
export default S;