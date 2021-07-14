import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Button from '.';

const requiredProps = {
  value: 'submit',
  children: 'submit'
};

describe('Components: Button', () => {
  it('should render button with type of submit and the correct copy', () => {
    render(<Button {...requiredProps} />);
    expect(screen.getByRole('button', { name: /submit/i })).toHaveTextContent(
      'submit'
    );
  });

  it('renders Button with className button', () => {
    const { container } = render(<Button {...requiredProps} />);
    expect(container.firstChild).toHaveClass('button');
  });

  it('renders Button with className isDisabled', () => {
    const { container } = render(<Button {...requiredProps} isDisabled />);
    expect(container.firstChild).toHaveClass('isDisabled');
  });

  it('renders Button with className isLoading', () => {
    const { container } = render(<Button {...requiredProps} isLoading />);
    expect(container.firstChild).toHaveClass('isLoading');
  });

  it('renders button as disabled when isDisabled is passed', () => {
    render(<Button {...requiredProps} isDisabled />);
    expect(screen.getByRole('button')).toHaveAttribute('disabled');
  });

  it('renders button as disabled when isLoading is passed', () => {
    render(<Button {...requiredProps} isLoading />);
    expect(screen.getByRole('button')).toHaveAttribute('disabled');
  });

  it('renders button onClick when onClick is passed', () => {
    const onClick = jest.fn();
    render(<Button {...requiredProps} onClick={onClick} />);
    userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalled();
  });

  it('should render loader when isLoading prop is passed', () => {
    render(<Button {...requiredProps} isLoading />);
    expect(screen.getByText('Loading')).toBeInTheDocument();
  });

  it('renders a default type submit', () => {
    render(<Button {...requiredProps} />);
    expect(screen.getByRole('button', { type: /submit/i })).toBeInTheDocument();
  });

  it.each(Object.values(Button.types))(
    'renders the type: %p when it is passed as a prop',
    (type) => {
      render(<Button {...requiredProps} type={type} />);
      expect(screen.getByRole('button', { type: type })).toBeInTheDocument();
    }
  );
});
