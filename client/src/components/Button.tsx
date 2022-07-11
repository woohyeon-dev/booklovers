import React, { MouseEvent } from 'react';
import styled, { css } from 'styled-components';

type ColorType = string;

type props = {
  value: string;
  color?: ColorType;
  bgColor?: ColorType;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const Button = (props: props) => {
  const { value, color, bgColor, onClick } = props;
  return (
    <StyledButton color={color} bgColor={bgColor} onClick={onClick}>
      {value}
    </StyledButton>
  );
};

const StyledButton = styled.button<{ color?: string; bgColor?: string }>`
  width: 100%;
  height: 46px;
  text-align: center;
  line-height: 46px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 0px 7px -1px;
  -webkit-user-select: none;
  user-select: none;
  border: 1px solid black;
  color: ${(props) => props.color || 'black'};
  background-color: ${(props) => props.bgColor || 'white'};

  &:hover {
    cursor: pointer;
    box-shadow: none;
    transform: scale(0.994);
  }
`;

export default Button;
