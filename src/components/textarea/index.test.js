import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Textarea from '.';

const onChange = jest.fn();

const requiredProps = {
  value: 'text',
  onChange,
  name: 'foo'
};

describe('Components: Textarea', () => {
  it('should call onChange', () => {
    render(<Textarea {...requiredProps} onChange={onChange} />);
    userEvent.type(screen.getByRole('textbox'), 'Foo');
    expect(onChange).toHaveBeenCalled();
  });

  it('should render textarea with name', () => {
    render(<Textarea {...requiredProps} />);
    expect(screen.getByRole('textbox')).toHaveAttribute('name', 'foo');
  });

  it('should render textarea with id', () => {
    render(<Textarea {...requiredProps} />);
    expect(screen.getByRole('textbox')).toHaveAttribute('id', 'foo');
  });

  it('should render textarea with type of text as default', () => {
    render(<Textarea {...requiredProps} />);
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text');
  });
});
