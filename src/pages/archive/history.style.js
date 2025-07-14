import styled from "styled-components";

const S = {};

S.TabMenu = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: white;
  width: 100%;
  padding-top:25px;

  a {
    text-decoration: none;
    width: 25%;
  }
`;

S.TabItem = styled.div`
  width: 100%;
  font-family: pretendard;
  text-align: center;
  padding: 0 0 16px 0;
  font-size: 16px;
  font-weight: 500;
  font-weight: ${({ $isActive }) => ($isActive ? "700" : "500")};
  color: ${({ $isActive }) => ($isActive ? "#FF6F3F" : "#787878")};
  border-bottom: ${({ $isActive }) =>
    $isActive ? "2px solid #282828" : "1px solid #dcdcdc"};
  cursor: pointer;
  position: relative;
`;

S.OutletWrapper=styled.div`
  padding: 0px 60px;
`
export default S;
