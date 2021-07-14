import React from 'react';
import { render, screen } from '@testing-library/react';

import Tiles from '.';

describe('Components: Tiles', () => {
  it('should display tile 1', () => {
    render(
      <Tiles>
        <Tiles.Tile>
          <div>Tile 1</div>
        </Tiles.Tile>
      </Tiles>
    );
    expect(screen.getByText('Tile 1', { selector: 'div' })).toBeInTheDocument();
  });

  it('should display tile 1', () => {
    render(
      <Tiles>
        <Tiles.Tile>
          <div>Tile 2</div>
        </Tiles.Tile>
      </Tiles>
    );
    expect(screen.getByText('Tile 2', { selector: 'div' })).toBeInTheDocument();
  });
});
