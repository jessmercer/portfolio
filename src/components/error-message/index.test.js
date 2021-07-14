import React from 'react';
import { render, screen } from '@testing-library/react';

import ErrorMessage from '.';

const requiredProps = {
  children: 'hey im an error'
};

describe('Components: ErrorMessage', () => {
  it('should render error message with the correct copy and the color red', () => {
    render(<ErrorMessage {...requiredProps} />);
    expect(screen.getByText('hey im an error')).toHaveClass('red');
  });
});
