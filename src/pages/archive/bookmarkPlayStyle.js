import styled from "styled-components";

const S = {}

// BookmarkPlayedNewFolder
S.TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px 0 0 0;
  gap: 3px;
  width: 310px;
`;

S.BackBtn = styled.button`
  font-size: 20px;
  background: none;
  border: none;
  cursor: pointer;
`;

S.PageTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
`;

S.NewFodler = styled.h3`
  font-size: 16px;
  font-weight: normal;
  margin-left: 15px;
  cursor: pointer;
  &:hover {
    color: #F96F3D;
  } 
`
S.SearchBar = styled.input`
  margin-left: auto;
  width: 240px;
  padding: 8px 12px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;
// 본문 내용
S.ContentWrapper = styled.div`
  display: flex;
  gap: 150px;
  padding: 20px 0 0 50px;
`;
// 썸네일 영역
S.ThumbnailBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 200px;
`;
S.ImgWrapper = styled.div`
  /* border-radius: 8px; */
  width: 120px;
  height: 120px;
  margin-top: 0px;
  background-color: #e0e0e0;
  /* border: solid 1px red; */
  #profile {
    display: none;
  }
`;
S.Label = styled.label`

`;
S.Profile = styled.img`
  width: 120px;
  height: 120px;
  border: none;
`;
S.FolderName = styled.input`
  background-color: #fee9e2;
  margin-top: 5px;
  border: none;
  border-radius: 5px;
  font-size: 12px;
  padding: 2px;
  width: 115px;
  height: 20px;
`;
S.NewFolderTextCount = styled.span`
  font-size: 14px;
  color: gray;
  margin-top: 50px;
  margin-left: 6px;
`;


// playedCard
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
        /* border: solid 1px black; */
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
        /* border: solid 1px black; */
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
        margin-left: 25px;
    }
    .play{
        border: solid 1px black;
        width: 90px;
        height: 35px;
        margin-left: 20px;
        img{
            width: 20px;
            height: 20px;
            border: solid 1px red;
        }
    }
`

export default S;