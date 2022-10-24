import React from 'react';
import { IInputProps } from 'types';
import './Input.css';

const Input = (props: IInputProps): JSX.Element => {
  return (
    <div className={props.classes.container}>
      <label htmlFor={props.id} className={props.classes.label}>
        {props.label}
        <input
          type={props.type}
          id={props.id}
          className={props.classes.input}
          accept={props.accept}
          ref={props.reference}
          onChange={props.onChange}
          data-testid={props.testid}
        />
        {props.switcher && <span className="swithcer-circle" />}
      </label>
      {!props.isValid && props.errorMessage && (
        <span className={props.classes.error}>{props.errorMessage}</span>
      )}
    </div>
  );
};

export default Input;
