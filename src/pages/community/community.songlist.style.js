// community.songlist.style.js
import styled from "styled-components";

const S = {};

S.OutsideWrapper = styled.div`
  display: flex;

`
S.Left = styled.div`
  width: 200px;
  height: 200px;
  margin-top: 40px;
  margin-left: 50px;
  margin-right: 70px;     
  border: solid 1px black;

`

S.Right = styled.div`
  width: 90%;
  height: 1000px;
  /* border: solid 1px black; */
  margin-top: 40px;


`

S.top = styled.div`
  width: 100%;
  height: 100px;
  /* border: solid 1px black; */
  display: flex;
  justify-content: space-between;
  align-items: center;

  .collection-title {
    font-size: 22px;
    
  }
  .collection-author {
    font-size: 15px;
    color: #787878;
    margin-top: 11px;
  }
  .icon #img{ 
    display: flex;
    justify-content: space-between;
    width: 45px;
    height: 45px;
    border: solid 1px black;
  }
  
  
`

S.MusicList = styled.div`
  /* display: flex; */

`

S.MusicDivision = styled.div`
  display: flex;
  margin-top: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #999;
  font-size: 14px;
  color: #888;

  p {
    margin: 0;
    font-size: 13px;
    text-align: center;
  }

  p:nth-child(1) {
    flex: 0.5; 
    /* margin-left: -10px  */
  }     // No.
  p:nth-child(2) {
    flex: 1; 
    /* margin-left: -30px; */
  }  // 앨범
  p:nth-child(3) { flex: 2; }       // 곡명 
  p:nth-child(4) { flex: 1.5; }     // 아티스트명
  p:nth-child(5) { flex: 1; }       // 좋아요 수
  p:nth-child(6) { flex: 1; }       // 재생
`;


//------------

S.Music = styled.div`
  display: flex;
  flex-direction: column;
`;

S.MusicCard = styled.div`
  display: flex;
  align-items: center;
  padding: 14px 0;
  border-bottom: 1px solid #F2F2F2;
  transition: background-color 0.2s, box-shadow 0.2s;
  cursor: pointer;

  &:hover {
    background-color: #fff8f4;
    /* box-shadow: inset 0 0 0 1px #f97e48; */
  }

  .num {
    flex: 0.5;
    text-align: center;
    font-size: 14px;
    /* margin-left: -10px; */
  }

  .album {
    flex: 1;
    display: flex;
    justify-content: center;
    /* margin-left: -20px; */
  }

  .album img {
    width: 45px;
    height: 45px;
    object-fit: cover;
    border: solid 1px black;
    /* margin-left: -45px; */
  }

  .singName {
    flex: 2;
    font-size: 14px;

    p {
      margin: 0;
      font-weight: bold;
    }

    span {
      font-size: 12px;
      color: #787878;
      
    }
  }

  .artistName {
    flex: 1.5;
    text-align: center;
    font-size: 14px;
  }

  .like {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    /* margin-left: -35px; */
    gap: 4px;
    font-size: 14px;
    color: #282828;

    img {
      width: 16px;
      height: 16px;
    }
  }

  .play {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6px;

    img {
      width: 16px;
      height: 16px;
    }
  }
`;




export default S;
