import styled from "styled-components";

const S = {};

S.ForderTitle = styled.div`
    margin-top: 25px;
    h2{
        font-size: 22px;
    }

`
S.Label = styled.label`
    /* border: solid 1px red; */
    width: 100%;
    height: 120px;
`
S.ImgWrapper = styled.div`
    border-radius: 8px;
    width: 90px;
    height: 90px;
    margin-top: 20px;
    background-color: #e0e0e0;
    input{
        display: none;
    }
`
S.Profile = styled.img`
    width: 90px;
    height: 90px;
    border: none;
`
S.ImgUpload = styled.button`
    background-color: #ffffff;
`
// 카드 영역
S.CardColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 35px;
`;

export default S;