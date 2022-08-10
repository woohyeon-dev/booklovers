import React from 'react';
import 'antd/dist/antd.css';
import { Radio, RadioChangeEvent } from 'antd';
import styled from 'styled-components';

type props = {
  options: Array<string>;
  label?: string;
  value: string;
  onChange: (e: RadioChangeEvent) => void;
};

const RadioGroup = ({ options, label, value, onChange }: props) => {
  return (
    <RadioGroupBox>
      <label className="label">{label}</label>
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
  .label {
    display: block;
    font-size: 15px;
    line-height: 20px;
    padding: 0 6px;
  }

  .radioGroup {
    width: fit-content;
    height: 44px;
    border-radius: 0.5rem;
    padding-left: 11px;
    display: flex;
    align-items: center;
  }
`;

export default RadioGroup;
