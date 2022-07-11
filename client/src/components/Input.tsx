import React from 'react';
import styled from 'styled-components';
import { IconType } from 'react-icons/lib';

type props = {
  Icon?: IconType;
  label?: string;
  name: string;
  type: string;
  placeholder: string;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = (props: props) => {
  const { label, Icon, ...rest } = props;
  return (
    <InputBox>
      {label && (
        <label className="customLabel" htmlFor={props.name}>
          {label}
        </label>
      )}
      <div className="inputGroup">
        {Icon && <Icon className="icon" />}
        <input style={Icon && { paddingLeft: '36px' }} className="customInput" {...rest} />
      </div>
    </InputBox>
  );
};

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  .customLabel {
    -webkit-user-select: none;
    user-select: none;
    font-size: 15px;
    height: 20px;

    padding: 0 6px;
    font-weight: bold;
  }

  .inputGroup {
    position: relative;
  }

  .icon {
    width: 20px;
    height: 20px;
    position: absolute;
    top: 14px;
    left: 10px;
  }

  .customInput {
    width: 100%;
    height: 46px;
    padding: 0 16px;
    font-size: 13px;
    margin-bottom: 16px;
    border: 1px solid #d5d7db;
    border-radius: 0.5rem;
  }
`;

export default Input;
