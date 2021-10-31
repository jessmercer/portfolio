import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setupWrapper } from '../../setupTests';
import Link from '.';

const requiredProps = {
  to: '/test',
  children: 'hey im a link'
};

const { Wrapper, history } = setupWrapper();
const WrappedComponent = (props) => (
  <Wrapper>
    <Link {...requiredProps} {...props} />
  </Wrapper>
);

describe('Components: Link', () => {
  it('renders a Link when its children is a string', () => {
    render(<WrappedComponent />);
    expect(screen.getByRole('link')).toHaveTextContent('hey im a link');
  });

  it('renders a Link when its children is a node', () => {
    render(
      <WrappedComponent>
        <div>hey im a link</div>
      </WrappedComponent>
    );
    expect(screen.getByRole('link')).toHaveTextContent('hey im a link');
  });

  it('calls react router with the correct to', () => {
    render(<WrappedComponent />);
    userEvent.click(screen.getByRole('link'));
    expect(history.location.pathname).toBe(requiredProps.to);
  });

  it('renders anchor', () => {
    render(<WrappedComponent isAnchor />);
    expect(screen.getByRole('link')).toHaveTextContent('hey im a link');
    expect(screen.getByRole('link')).toHaveAttribute('href', requiredProps.to);
  });

  it('renders anchor with external link', () => {
    render(<WrappedComponent isAnchor isExternal />);
    expect(screen.getByRole('link')).toHaveTextContent('hey im a link');
    expect(screen.getByRole('link')).toHaveAttribute('href', requiredProps.to);
    expect(screen.getByRole('link')).toHaveAttribute('target', '_blank');
    expect(screen.getByRole('link')).toHaveAttribute(
      'rel',
      'noopener noreferrer'
    );
  });
});
