import styled from "styled-components";

const S = {};

S.Container = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 45px auto 0;
  overflow: hidden; // 스크롤 방지
`;

S.TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

S.TitleGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px; // ←과 텍스트 간격 조정
`;

S.Back = styled.div`
  cursor: pointer;
  font-size: 23px;
`;

S.Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
`;

S.ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

S.Button = styled.button`
  padding: 8px 16px;
  background-color: ${({ primary }) => (primary ? "#f96f3d" : "#fff")};
  color: ${({ primary }) => (primary ? "#fff" : "#f96f3d")};
  border: 1px solid #f96f3d;
  border-radius: 6px;
  cursor: pointer;
`;

S.Form = styled.form`
  margin-top: 60px;
`;

S.Row = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
`;

S.RowGroup = styled.div`
  display: flex;
  gap: 24px; // 제목과 저자 사이 간격
  margin-bottom: 40px;
`;

S.HalfRow = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

S.Label = styled.label`
  margin-bottom: 12px;
  font-size: 20px;
  font-weight: 600;
`;

S.Input = styled.input`
  font-size: 15px;
  padding: 14px;
  border: 1px solid #ccc;
  /* border-radius: 4px; */
`;

S.TextArea = styled.textarea`
  font-size: 15px;
  padding: 14px;
  border: 1px solid #ccc;
  /* border-radius: 6px; */
  min-height: 120px;
  resize: vertical;
`;

S.CheckGroup = styled.div`
  display: flex;
  font-size: 16px;
  gap: 10px;
  margin-top: 7px;
`;

export default S;
