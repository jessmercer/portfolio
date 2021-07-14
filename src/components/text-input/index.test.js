import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import TextInput from '.';

const onChange = jest.fn();

const requiredProps = {
  value: 'text',
  onChange,
  name: 'foo'
};

describe('Components: TextInput', () => {
  it('should call onChange', () => {
    render(<TextInput {...requiredProps} onChange={onChange} />);
    userEvent.type(screen.getByRole('textbox'), 'Foo');
    expect(onChange).toHaveBeenCalled();
  });

  it('should render input with name', () => {
    render(<TextInput {...requiredProps} />);
    expect(screen.getByRole('textbox', { name: 'foo' })).toBeInTheDocument();
  });

  it('should render input with id', () => {
    render(<TextInput {...requiredProps} />);
    expect(screen.getByRole('textbox', { id: 'foo' })).toBeInTheDocument();
  });

  it('should render input with type of text as default', () => {
    render(<TextInput {...requiredProps} />);
    expect(screen.getByRole('textbox', { type: 'text' })).toBeInTheDocument();
  });

  it('renders TextInput with className isValid', () => {
    const { container } = render(<TextInput {...requiredProps} isValid />);
    expect(container.firstChild).toHaveClass('isValid');
  });

  it('renders TextInput with className isInvalid', () => {
    const { container } = render(<TextInput {...requiredProps} isInvalid />);
    expect(container.firstChild).toHaveClass('isInvalid');
  });

  it.each(Object.values(TextInput.types))(
    'renders the type: %p when it is passed as a prop',
    (type) => {
      render(<TextInput {...requiredProps} type={type} />);
      if (type === TextInput.types.password) {
        expect(screen.getByLabelText('foo')).toHaveAttribute('type', type);
      } else {
        expect(screen.getByRole('textbox')).toHaveAttribute('type', type);
      }
    }
  );
});
