import React from 'react';
import { render, screen } from '@testing-library/react';

import Loader from '.';

describe('Components: Loader', () => {
  it.each(Object.values(Loader.colors))(
    'renders the color: %p when it is passed as a prop',
    (color) => {
      render(<Loader />);
      expect(
        screen.getByText('Loading', { color: Loader.colors[color] })
      ).toBeInTheDocument();
    }
  );

  it.each(Object.values(Loader.styles))(
    'renders the style: %p when it is passed as a prop',
    (style) => {
      render(<Loader />);
      expect(
        screen.getByText('Loading', { style: Loader.styles[style] })
      ).toBeInTheDocument();
    }
  );
});
