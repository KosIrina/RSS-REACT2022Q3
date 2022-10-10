import React from 'react';
import { ISelectProps } from 'types';

class Select extends React.Component<ISelectProps> {
  constructor(props: ISelectProps) {
    super(props);
  }

  render(): JSX.Element {
    return (
      <div className={this.props.classes.container}>
        <label htmlFor={this.props.id} className={this.props.classes.label}>
          {this.props.label}
        </label>
        <select
          id={this.props.id}
          className={this.props.classes.select}
          ref={this.props.reference}
          onChange={this.props.onChange}
        >
          {this.props.values.map((value: string, index: number): JSX.Element => {
            return (
              <option key={value} value={value} className={this.props.classes.option}>
                {this.props.options[index]}
              </option>
            );
          })}
        </select>
        {!this.props.isValid && this.props.errorMessage && (
          <span className={this.props.classes.error}>{this.props.errorMessage}</span>
        )}
      </div>
    );
  }
}

export default Select;
