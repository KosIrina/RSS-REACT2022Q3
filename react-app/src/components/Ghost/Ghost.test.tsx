import React from 'react';
import { render, screen } from '@testing-library/react';
import Ghost from '.';
import { Numbers } from '../../types';

describe('Ghost', (): void => {
  it('Should render ghost legs', (): void => {
    render(<Ghost />);
    expect(screen.getByTestId('ghost-legs')).toBeInTheDocument();
  });

  it('Should contain the appropriate amount of legs', (): void => {
    render(<Ghost />);
    expect(screen.getAllByTestId('ghost-leg').length).toBe(Numbers.Four);
  });

  it('Should render ghost body', (): void => {
    render(<Ghost />);
    expect(screen.getByTestId('ghost-body')).toBeInTheDocument();
  });

  it('Should render ghost shadow', (): void => {
    render(<Ghost />);
    expect(screen.getByTestId('ghost-shadow')).toBeInTheDocument();
  });

  it('Should render both ghost eyes', (): void => {
    render(<Ghost />);
    expect(
      screen.getByTestId('ghost-left-eye') && screen.getByTestId('ghost-right-eye')
    ).toBeInTheDocument();
  });
});
