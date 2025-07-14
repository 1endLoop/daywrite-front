import styled from "styled-components";

const S = {};

S.AllViewTitle = styled.div`
    margin-top: 40px;
    h2{
        font-size: 22px;
    }
`
S.AllViewWrapper = styled.div`
    /* border: solid 1px black; */
    /* display: flex; */
    display: grid;
    width: 100%;
    height: 100%;
    margin-top: 15px;
    /* overflow-x: auto; */
    grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
    max-width: 1200px; // 170 * 6 + gap 고려
`
S.AllViewBox = styled.div`
    border: solid 1px red;
    width: 170px;
    height: 200px;
    margin-right: 30px;
    margin-bottom: 40px;
    /* flex-shrink: 0; */

    .folderImg{
        width: 170px;
        height: 140px;
        /* object-fit: cover; */
    }
    .ViewBoxTitle{
        width: 170px;
        height: 60px;
        position: relative;
        strong{
            font-size: 15px;
            margin-top: 8px;
        }
        p{
            font-size: 14px;
            color: #787878;
            margin-top: 8px;
        }
        .heart{
            width: 20px;
            height: 20px;
            position: absolute; top: 2px; right: 8px;
        }
    }
`

export default S;