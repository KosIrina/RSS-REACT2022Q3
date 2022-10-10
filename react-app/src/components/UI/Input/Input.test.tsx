import React, { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import Input from '.';

describe('Input', (): void => {
  it('Should render input', (): void => {
    render(
      <Input
        classes={{
          container: 'container-class',
          label: 'label-class',
          input: 'input-class',
          error: 'error-class',
        }}
        id="id"
        type="text"
        label="Input"
        isValid={true}
        errorMessage="Error occured"
        reference={createRef()}
        onChange={jest.fn()}
      />
    );
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('Should have values', (): void => {
    render(
      <Input
        classes={{
          container: 'container-class',
          label: 'label-class',
          input: 'input-class',
          error: 'error-class',
        }}
        id="id"
        type="text"
        label="Input"
        isValid={true}
        errorMessage="Error occured"
        reference={createRef()}
        onChange={jest.fn()}
      />
    );
    expect(screen.getByRole('textbox')).not.toBeDisabled();
  });

  it('Should not show error message on load', (): void => {
    render(
      <Input
        classes={{
          container: 'container-class',
          label: 'label-class',
          input: 'input-class',
          error: 'error-class',
        }}
        id="id"
        type="text"
        label="Input"
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
      <Input
        classes={{
          container: 'container-class',
          label: 'label-class',
          input: 'input-class',
          error: 'error-class',
        }}
        id="id"
        type="text"
        label="Input"
        isValid={false}
        errorMessage="Error occured"
        reference={createRef()}
        onChange={jest.fn()}
      />
    );
    expect(screen.queryByText(/error occured/i)).toBeInTheDocument();
  });
});
