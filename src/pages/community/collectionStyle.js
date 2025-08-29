import styled from "styled-components"

const S = {}

// Bookmark Hoom
S.TypedTitle = styled.div`
    width: 100%;
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    p{
        margin-right: 80px;
        color: #787878;
        font-size: 15px;
        margin-top: 15px;
        margin-right: 32px;
        cursor: pointer;
    }
`
S.TypedWrapper = styled.div`
    /* border: solid 1px #787878;s */
    display: flex;
    width: 100%;
    height: 220px;
    display: flex;
    margin-top: 10px;
`
// Typed 이미지
S.TypedBox = styled.div`
    /* border: solid 1px black; */
    width: 160px;
    height: 100%;
    margin-left: 20px;
    margin-right: 25px;
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
    display: flex;
    justify-content: space-between;
    p{
        margin-right: 80px;
        color: #787878;
        font-size: 15px;
        margin-top: 15px;
        margin-right: 32px;
        cursor: pointer;
    }
`
S.PlayedWrapper = styled.div`
    border: solid 1px red;
    width: 100%;
    height: 240px;
    display: flex;
    margin-top: 10px;
`

// 하트가 들어가는 빨간 테두리 박스 (div 버전)
S.HeartBox = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  width: 22px;
  height: 22px;
  background: #fff;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;

  &:hover {
    background: #fff7f7;
    border-color: #ff6b6b;
  }
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px rgba(231,76,60,.35);
  }

  img {
    width: 22px;
    height: 22px;
    display: block;
    pointer-events: none; /* 내부 이미지가 클릭 이벤트 먹지 않도록 */
  }
`;

// 좋아요 수가 하트와 겹치지 않게 오른쪽 띄움
S.LikeCount = styled.div`
  height: 20px;
  text-align: center;
  position: absolute;
  right: 0px;
  top: 18px;

  .likeCount { 
    font-size: 15px; 
    color: #787878; 
    }
`;


export default S;