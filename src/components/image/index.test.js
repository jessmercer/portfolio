import React from 'react';
import { render, screen } from '@testing-library/react';
// import { setupTestComponent } from '../../setupTests';
import Image from '.';
import Source from '.';

const requiredProps = {
  src: 'test.png',
  alt: 'alt',
  sources: [
    {
      srcSet: 'srcSet1',
      width: 200
    },
    {
      srcSet: 'srcSet2',
      width: 300
    }
  ]
};

describe('Components: Image', () => {
  it('renders an image with correct data-src', () => {
    render(<Image {...requiredProps} />);
    expect(screen.getByAltText('alt')).toHaveAttribute('data-src', 'test.png');
  });

  it('renders an image with correct image', () => {
    render(<Image {...requiredProps} />);
    expect(screen.getByAltText('alt')).toHaveAttribute('src', 'test.png');
  });

  it('renders an image with alt', () => {
    render(<Image {...requiredProps} />);
    expect(screen.getByAltText('alt')).toHaveAttribute('alt', 'alt');
  });

  it('renders image with correct sources', () => {
    render(<Source {...requiredProps} />);
    expect(screen.getByTestId('srcSet1')).toHaveAttribute(
      'media',
      '(min-width: 200px)'
    );
    expect(screen.getByTestId('srcSet1')).toHaveAttribute('srcSet', 'srcSet1');
    expect(screen.getByTestId('srcSet2')).toHaveAttribute(
      'media',
      '(min-width: 300px)'
    );
    expect(screen.getByTestId('srcSet2')).toHaveAttribute('srcSet', 'srcSet2');
  });
});
