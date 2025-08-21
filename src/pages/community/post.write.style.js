// src/pages/community/post.write.style.js
import styled from "styled-components";

const ORANGE = "#f96f3d";

const S = {};

S.Container = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 45px auto 0;
  padding: 0 16px;
`;

S.TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

S.TitleGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
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
  background-color: ${({ $primary }) => ($primary ? ORANGE : "#fff")};
  color: ${({ $primary }) => ($primary ? "#fff" : ORANGE)};
  border: 1px solid ${ORANGE};
  border-radius: 6px;
  cursor: pointer;
`;

S.TopRow = styled.div`
  margin-top: 24px;
  margin-bottom: 40px;
`;

S.Form = styled.form``;

S.Row = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 28px;
`;

S.RowGroup = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 28px;
  @media (max-width: 800px) {
    flex-direction: column;
    gap: 16px;
  }
`;

S.HalfRow = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

S.Label = styled.label`
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: 600;
`;

S.Input = styled.input`
  font-size: 15px;
  padding: 14px;
  border: 1px solid #ccc;
`;

S.TextArea = styled.textarea`
  font-size: 15px;
  padding: 14px;
  border: 1px solid #ccc;
  min-height: 140px;
  resize: vertical;
`;

S.CheckGroup = styled.div`
  display: flex;
  font-size: 16px;
  gap: 16px;
  margin-top: 7px;
`;

export default S;