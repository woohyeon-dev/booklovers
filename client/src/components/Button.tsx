import React, { MouseEvent } from 'react';
import { IconType } from 'react-icons';
import styled from 'styled-components';

type ColorType = string;

type props = {
  Icon?: IconType;
  iconColor?: ColorType;
  value: string;
  color?: ColorType;
  border?: string;
  boxShadow?: string;
  borderRadius?: string;
  bgColor?: ColorType;
  type?: 'button' | 'submit' | 'reset';
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
};

const Button = (props: props) => {
  const { Icon, iconColor, value, ...rest } = props;
  return (
    <StyledButton {...rest}>
      {Icon && <Icon className="icon" style={{ color: iconColor }} />}
      <span>{value}</span>
    </StyledButton>
  );
};

const StyledButton = styled.button<{
  color?: ColorType;
  border?: string;
  bgColor?: ColorType;
  borderRadius?: string;
  boxShadow?: string;
}>`
  display: flex;
  width: 100%;
  height: 44px;
  line-height: 44px;
  justify-content: center;
  box-shadow: ${(props) => props.boxShadow || 'rgba(0, 0, 0, 0.25) 0px 0px 7px -1px;'};
  border: ${(props) => props.border || 'none'};
  border-radius: ${(props) => props.borderRadius || 'none'};
  color: ${(props) => props.color || 'black'};
  background-color: ${(props) => props.bgColor || 'white'};

  &:hover {
    cursor: pointer;
    box-shadow: none;
    transform: scale(0.97);
  }

  .icon {
    width: 20px;
    height: 20px;
    margin-top: 12px;
    margin-right: 6px;
  }
`;

export default Button;
