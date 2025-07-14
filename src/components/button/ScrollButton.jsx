import styled from "styled-components";

export const ScrollButton = ({ direction, onclick }) => {
  return (
    <Button position={direction} onclick={onclick}>
      {direction === "up" ? "↑" : "←"}
    </Button>
  );
};

const Button = styled.button`
  position: fixed;
  ${({ position }) => (position === "up" ? "bottom: 40px; right: 40px;" : "bottom: 40px; left: 40px;")}
  background: white;
  border-radius: 50%;
  border: 1px solid #ccc;
  width: 40px;
  height: 40px;
  font-size: 18px;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
`;

export default ScrollButton;
