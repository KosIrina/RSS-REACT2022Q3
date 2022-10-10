import React from 'react';
import { IButtonProps } from 'types';
import './Button.css';

const Button = (props: IButtonProps): JSX.Element => {
  return (
    <div className={props.classes.container}>
      <button type={props.type} className={props.classes.button} disabled={props.isDisabled}>
        {props.buttonText}
      </button>
      {props.showMessage && <span className={props.classes.message}>{props.message}</span>}
    </div>
  );
};

export default Button;
