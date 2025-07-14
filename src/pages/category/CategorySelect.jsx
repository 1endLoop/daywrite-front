import React from 'react';
import styled from 'styled-components';

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start; 
  gap: 8px;
`;

const Button = styled.button`
  padding: 8px 14px;
  background-color: ${({ selected }) => (selected ? 'rgba(249, 111, 61, 0.15)' : '#FFFFFF')};
  color: ${({ selected }) => (selected ? '#F96F3D' : '#282828')};
  border: 0.5px solid ${({ selected }) => (selected ? '#F96F3D' : '#282828')};
  border-radius: 10px;
  cursor: pointer;

  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: ${({ selected }) => (selected ? 500 : 400)};
  letter-spacing: -0.072px;
  transition: all 0.1s ease;
`;

const CategorySelect = ({ options = [], selectedOptions = [], onToggle }) => {
  return (
    <Wrap>
      {options.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: 'flex', gap: '8px' }}>
          {row.map((item) => (
            <Button
              key={item}
              selected={selectedOptions.includes(item)}
              onClick={() => onToggle(item)}
              type="button"
            >
              {item}
            </Button>
          ))}
        </div>
      ))}
    </Wrap>
  );
};

export default CategorySelect;
