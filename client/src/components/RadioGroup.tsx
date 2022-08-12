import React from 'react';
import 'antd/dist/antd.css';
import { Radio, RadioChangeEvent } from 'antd';
import styled from 'styled-components';

interface RadioGrpupProps {
  options: Array<string>;
  label?: string;
  value: string;
  onChange: (e: RadioChangeEvent) => void;
}

const RadioGroup = ({ options, label, value, onChange }: RadioGrpupProps) => {
  return (
    <RadioGroupBox>
      <Label>{label}</Label>
      <Radio.Group className="radioGroup" onChange={onChange} value={value}>
        {options.length > 0 &&
          options.map((opt, index) => (
            <Radio key={index} value={opt}>
              {opt}
            </Radio>
          ))}
      </Radio.Group>
    </RadioGroupBox>
  );
};

const RadioGroupBox = styled.div`
  .radioGroup {
    width: fit-content;
    height: 44px;
    border-radius: 0.5rem;
    padding-left: 11px;
    display: flex;
    align-items: center;
    background-color: #ffffff;
    border: 1px solid ${(props) => props.theme.borderColor};
  }
`;

const Label = styled.label`
  display: block;
  font-size: 15px;
  line-height: 20px;
  padding: 0 6px;
`;

export default RadioGroup;
