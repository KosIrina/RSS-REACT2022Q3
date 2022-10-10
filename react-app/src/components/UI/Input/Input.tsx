import React from 'react';
import { IInputProps } from 'types';
import './Input.css';

class Input extends React.Component<IInputProps> {
  constructor(props: IInputProps) {
    super(props);
  }

  render(): JSX.Element {
    return (
      <div className={this.props.classes.container}>
        <label htmlFor={this.props.id} className={this.props.classes.label}>
          {this.props.label}
          <input
            type={this.props.type}
            id={this.props.id}
            className={this.props.classes.input}
            accept={this.props.accept}
            ref={this.props.reference}
            onChange={this.props.onChange}
            data-testid={this.props.testid}
          />
          {this.props.switcher && <span className="swithcer-circle" />}
        </label>
        {!this.props.isValid && this.props.errorMessage && (
          <span className={this.props.classes.error}>{this.props.errorMessage}</span>
        )}
      </div>
    );
  }
}

export default Input;
