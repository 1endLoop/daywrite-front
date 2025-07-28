import styled from "styled-components";

const S = {}

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