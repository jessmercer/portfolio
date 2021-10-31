import React from 'react';
import { render, screen } from '@testing-library/react';
import { setupWrapper } from '../../setupTests';

import Header from '.';

const { Wrapper } = setupWrapper();
const WrappedComponent = () => (
  <Wrapper>
    <Header />
  </Wrapper>
);

describe('Components: Header', () => {
  it('should render name anchor with correct text', () => {
    render(<WrappedComponent />);
    expect(
      screen.getByText('Jessica Mercer', { selector: 'a' })
    ).toBeInTheDocument();
  });

  it('should push to home when name link is clicked', () => {
    render(<WrappedComponent />);
    expect(screen.getByText('Jessica Mercer').closest('a')).toHaveAttribute(
      'href',
      '/'
    );
  });

  it('should push to /contact when the contact link is clicked', () => {
    render(<WrappedComponent />);
    expect(screen.getByText('Contact').closest('a')).toHaveAttribute(
      'href',
      '/contact'
    );
  });

  it('should render job description with correct text', () => {
    render(<WrappedComponent />);
    expect(screen.getByText('Front End Web Developer')).toBeInTheDocument();
  });

  it('should render contact with correct text', () => {
    render(<WrappedComponent />);
    expect(screen.getByText('Contact', { selector: 'a' })).toBeInTheDocument();
  });
});
