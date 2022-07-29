import React from 'react';
import moment from 'moment';
import { DatePicker } from 'antd';
import 'antd/dist/antd.css';
import styled from 'styled-components';

type Props = {
  label?: string;
  startDate: Date;
};

const AntDesignDatePicker = ({ label, startDate }: Props) => {
  return (
    <AntDesignDatePickerBox>
      <label className="label">{label}</label>
      <DatePicker className="datePicker" defaultValue={moment(startDate, 'YYYY-MM-DD')} />
    </AntDesignDatePickerBox>
  );
};

const AntDesignDatePickerBox = styled.div`
  padding-top: 10px;

  .label {
    display: block;
    font-size: 15px;
    height: 20px;
    padding: 0 6px;
    font-weight: bold;
  }

  .datePicker {
    height: 44px;
    border-radius: 0.5rem;
  }
`;

export default AntDesignDatePicker;
