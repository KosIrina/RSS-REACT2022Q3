import React, { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import Select from '.';

describe('Select', (): void => {
  it('Should render select', (): void => {
    render(
      <Select
        classes={{
          container: 'container-class',
          label: 'label-class',
          select: 'select-class',
          option: 'option-class',
          error: 'error-class',
        }}
        id="id"
        values={['value1', 'value2']}
        options={['option1', 'option2']}
        label="Select"
        isValid={true}
        errorMessage="Error occured"
        reference={createRef()}
        onChange={jest.fn()}
      />
    );
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('Should have values', (): void => {
    render(
      <Select
        classes={{
          container: 'container-class',
          label: 'label-class',
          select: 'select-class',
          option: 'option-class',
          error: 'error-class',
        }}
        id="id"
        values={['value1', 'value2']}
        options={['option1', 'option2']}
        label="Select"
        isValid={true}
        errorMessage="Error occured"
        reference={createRef()}
        onChange={jest.fn()}
      />
    );
    expect(screen.getByRole('combobox')).toHaveValue('value1');
  });

  it('Should not show error message on load', (): void => {
    render(
      <Select
        classes={{
          container: 'container-class',
          label: 'label-class',
          select: 'select-class',
          option: 'option-class',
          error: 'error-class',
        }}
        id="id"
        values={['value1', 'value2']}
        options={['option1', 'option2']}
        label="Select"
        isValid={true}
        errorMessage="Error occured"
        reference={createRef()}
        onChange={jest.fn()}
      />
    );
    expect(screen.queryByText(/error occured/i)).toBeNull();
  });

  it('Should show error message on error', (): void => {
    render(
      <Select
        classes={{
          container: 'container-class',
          label: 'label-class',
          select: 'select-class',
          option: 'option-class',
          error: 'error-class',
        }}
        id="id"
        values={['value1', 'value2']}
        options={['option1', 'option2']}
        label="Select"
        isValid={false}
        errorMessage="Error occured"
        reference={createRef()}
        onChange={jest.fn()}
      />
    );
    expect(screen.queryByText(/error occured/i)).toBeInTheDocument();
  });
});
