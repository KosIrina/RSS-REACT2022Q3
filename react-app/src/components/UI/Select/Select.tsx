import React from 'react';
import { ISelectProps } from 'types';

const Select = (props: ISelectProps): JSX.Element => {
  return (
    <div className={props.classes.container}>
      <label htmlFor={props.id} className={props.classes.label}>
        {props.label}
      </label>
      <select
        id={props.id}
        className={props.classes.select}
        ref={props.reference}
        onChange={props.onChange}
      >
        {props.values.map((value: string, index: number): JSX.Element => {
          return (
            <option key={value} value={value} className={props.classes.option}>
              {props.options[index]}
            </option>
          );
        })}
      </select>
      {!props.isValid && props.errorMessage && (
        <span className={props.classes.error}>{props.errorMessage}</span>
      )}
    </div>
  );
};

export default Select;
