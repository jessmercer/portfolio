import React from 'react';
import { render, screen } from '@testing-library/react';

import { setupWrapper } from '../setupTests';
import App from '.';

const { Wrapper } = setupWrapper();

const WrappedComponent = () => (
  <Wrapper>
    <App />
  </Wrapper>
);

describe('App', () => {
  it('renders Header component', () => {
    render(<WrappedComponent />);
    expect(screen.getByText('Jessica Mercer')).toBeInTheDocument();
  });
});
