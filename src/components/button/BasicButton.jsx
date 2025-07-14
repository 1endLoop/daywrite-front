import React from 'react';
import Button from './style';
import { css } from 'styled-components';

const BasicButton = ({ children, customStyle, ...rest }) => {
  return (
    <Button css={customStyle} {...rest}>
      {children}
    </Button>
  );
};

export default BasicButton;