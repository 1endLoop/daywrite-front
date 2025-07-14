import styled from "styled-components";

const Dropdown = {};

Dropdown.Wrapper = styled.div`
  position: relative;
`;

Dropdown.Menu = styled.div`
  position: absolute;
  top: 24px;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
`;
Dropdown.Item = styled.div`
  padding: 10px 16px;
  font-size: 14px;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background-color: #f2f2f2;
  }
`;

export default Dropdown;
