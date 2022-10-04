import React, { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import { IconType } from 'react-icons/lib';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

interface InputProps {
  Icon?: IconType;
  iconWidth?: number;
  label?: string;
  name: string;
  type?: 'text' | 'password' | 'number' | 'tel' | 'email' | 'url';
  placeholder?: string;
  required?: boolean;
  value: string | number;
  pattern?: string;
  title?: string;
  disabled?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ label, Icon, iconWidth = 20, type = 'text', ...rest }: InputProps) => {
  const [inputType, setInputType] = useState(type);
  const [visible, setVisible] = useState(false);
  const toggleIcon = () => {
    setVisible((current) => {
      if (!current) {
        setInputType('text');
      } else {
        setInputType(type);
      }
      return !current;
    });
  };
  return (
    <InputBox>
      {label && <Label htmlFor={rest.name}>{label}</Label>}
      <InputGroup>
        {Icon && <Icon className="icon" style={{ width: `${iconWidth}px`, margin: `0 ${(20 - iconWidth) / 2}px` }} />}
        <StyledInput style={Icon && { padding: '0 36px' }} type={inputType} {...rest} />
        {type === 'password' &&
          (visible ? (
            <AiOutlineEye className="visibleIcon" onClick={toggleIcon} />
          ) : (
            <AiOutlineEyeInvisible className="visibleIcon" onClick={toggleIcon} />
          ))}
      </InputGroup>
    </InputBox>
  );
};

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 10px;
`;

const Label = styled.label`
  font-size: 15px;
  height: 20px;
  padding: 0 6px;
`;

const InputGroup = styled.div`
  position: relative;

  .icon {
    height: 20px;
    position: absolute;
    top: 12px;
    left: 10px;
    color: #aab1b8;
  }

  .visibleIcon {
    width: 20px;
    height: 20px;
    position: absolute;
    top: 12px;
    right: 10px;
  }
`;

const StyledInput = styled.input`
  width: 100%;
  height: 44px;
  padding: 0 16px;
  font-size: 14px;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 0.5rem;
  letter-spacing: 0.7px;
  word-spacing: 1.4px;

  &::placeholder {
    color: #aab1b8;
  }

  &:disabled {
    background-color: #f7f8f9;
  }

  &:focus {
    border: 2px solid black;
  }
`;

export default Input;
