import React from "react";
import styled from "styled-components";

const DropdownWrapper = styled.ul`
  position: fixed;
  top: ${({ y }) => y}px;
  left: ${({ x }) => x}px;
  text-align: center;
  width: 88px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 15px;
  list-style: none;
  padding: 8px 0;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;

  li {
    padding: 7px 16px;
    cursor: pointer;

    &:hover {
      background: #f1f1f1;
    }
  }
`;

const Dropdown = ({ refProp, x, y, onClose, children }) => {
  return (
    <DropdownWrapper ref={refProp} x={x} y={y} onClick={onClose}>
      {children}
    </DropdownWrapper>
  );
};

export default Dropdown;
