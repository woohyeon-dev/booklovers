import React, { ChangeEvent, MouseEvent, useState } from 'react';
import styled from 'styled-components';
import { IconType } from 'react-icons/lib';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

type props = {
  Icon?: IconType;
  iconWidth?: number;
  label?: string;
  name: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  value: string | number;
  pattern?: string;
  title?: string;
  disabled?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({ label, Icon, iconWidth = 20, type, ...rest }: props) => {
  const [inputType, setInputType] = useState(type);
  const [visible, setVisible] = useState(false);
  const toggleIcon = (e: MouseEvent<SVGElement>) => {
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
      {label && (
        <label className="customLabel" htmlFor={rest.name}>
          {label}
        </label>
      )}
      <div className="inputGroup">
        {Icon && <Icon className="icon" style={{ width: `${iconWidth}px`, margin: `0 ${(20 - iconWidth) / 2}px` }} />}
        <input className="customInput" style={Icon && { padding: '0 36px' }} type={inputType} {...rest} />
        {type === 'password' &&
          (visible ? (
            <AiOutlineEye className="visibleIcon" onClick={toggleIcon} />
          ) : (
            <AiOutlineEyeInvisible className="visibleIcon" onClick={toggleIcon} />
          ))}
      </div>
    </InputBox>
  );
};

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 10px;

  .customLabel {
    font-size: 15px;
    height: 20px;
    padding: 0 6px;
    font-weight: bold;
  }

  .inputGroup {
    position: relative;
  }

  .icon {
    height: 20px;
    position: absolute;
    top: 12px;
    left: 10px;
    color: #aab1b8;
  }

  .customInput {
    width: 100%;
    height: 44px;
    padding: 0 16px;
    font-size: 14px;
    border: 1px solid #d5d7db;
    border-radius: 0.5rem;

    &:disabled {
      border: 1px solid #d5d7db;
      background-color: #f7f8f9;
    }

    &:focus {
      border: 2px solid black;
    }
  }

  .visibleIcon {
    width: 20px;
    height: 20px;
    position: absolute;
    top: 12px;
    right: 10px;
  }
`;

export default Input;
