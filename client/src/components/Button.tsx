import React from 'react';
import { IconType } from 'react-icons';
import styled from 'styled-components';

type ColorType = string;

type props = {
  Icon?: IconType;
  iconColor?: ColorType;
  value: string;
  color?: ColorType;
  bgColor?: ColorType;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
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

const StyledButton = styled.button<{ color?: string; bgColor?: string }>`
  display: flex;
  width: 100%;
  height: 44px;
  line-height: 44px;
  justify-content: center;
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

  .icon {
    width: 20px;
    height: 20px;
    margin-top: 12px;
    margin-right: 3px;
  }
`;

export default Button;
