import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from '.';

describe('Button', (): void => {
  it('Should render button', (): void => {
    render(
      <Button
        classes={{
          container: 'container-class',
          button: 'button-class',
          message: 'message-class',
        }}
        type="submit"
        buttonText="Send"
        isDisabled={true}
        showMessage={false}
        message="Submitted"
      />
    );
    expect(screen.getByText(/send/i)).toBeInTheDocument();
  });

  it('Should be disabled on first load', (): void => {
    render(
      <Button
        classes={{
          container: 'container-class',
          button: 'button-class',
          message: 'message-class',
        }}
        type="submit"
        buttonText="Send"
        isDisabled={true}
        showMessage={false}
        message="Submitted"
      />
    );
    expect(screen.getByText(/send/i)).toBeDisabled();
  });

  it('Should not show message on load', (): void => {
    render(
      <Button
        classes={{
          container: 'container-class',
          button: 'button-class',
          message: 'message-class',
        }}
        type="submit"
        buttonText="Send"
        isDisabled={true}
        showMessage={false}
        message="Submitted"
      />
    );
    expect(screen.queryByText(/submitted/i)).toBeNull();
  });

  it('Should show message when submitted', (): void => {
    render(
      <Button
        classes={{
          container: 'container-class',
          button: 'button-class',
          message: 'message-class',
        }}
        type="submit"
        buttonText="Send"
        isDisabled={true}
        showMessage={true}
        message="Submitted"
      />
    );
    expect(screen.getByText(/submitted/i)).toBeInTheDocument();
  });
});
