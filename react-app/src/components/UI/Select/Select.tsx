import React from 'react';
import { ISelectProps } from '../../../types';

const Select = (props: ISelectProps): JSX.Element => {
  return (
    <select
      className={props.classes.select}
      onChange={props.onChange}
      defaultValue={props.selectedValue}
    >
      {props.selectOptions.map((value: string): JSX.Element => {
        return (
          <option key={value} value={value} className={props.classes.option}>
            {value}
          </option>
        );
      })}
    </select>
  );
};

export default Select;
