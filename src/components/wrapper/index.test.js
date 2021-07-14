import React from 'react';
import { render, screen } from '@testing-library/react';

import Wrapper from '.';

describe('Components: Wrapper', () => {
  it('renders its children', () => {
    render(
      <Wrapper>
        <span>Text</span>
      </Wrapper>
    );
    expect(screen.getByText('Text', { selector: 'span' })).toBeInTheDocument();
  });
});
