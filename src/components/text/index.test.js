import React from 'react';
import { render, screen } from '@testing-library/react';

import Text from '.';

const requiredProps = {
  children: 'Im some text'
};

describe('Components: Text', () => {
  it('renders a Text when its children is a string', () => {
    render(<Text {...requiredProps} />);
    expect(screen.getByText('Im some text')).toBeInTheDocument();
  });

  it('accepts children when it is a node', () => {
    render(
      <Text>
        <span>Im some text</span>
      </Text>
    );
    expect(screen.getByText('Im some text')).toBeInTheDocument();
  });

  it('renders a default text p element', () => {
    render(<Text {...requiredProps} />);
    expect(
      screen.getByText('Im some text', { selector: 'p' })
    ).toBeInTheDocument();
  });

  it.each(Object.values(Text.elements))(
    'renders the element: %p when it is passed as a prop',
    (element) => {
      render(<Text {...requiredProps} element={element} />);
      expect(
        screen.getByText('Im some text', { selector: element })
      ).toBeInTheDocument();
    }
  );

  it.each(Object.values(Text.styles))(
    'renders the style: %p when it is passed as a prop',
    (style) => {
      const { container } = render(<Text {...requiredProps} style={style} />);
      expect(container.firstChild).toHaveClass(style);
    }
  );

  it.each(Object.values(Text.colors))(
    'renders the color: %p when it is passed as a prop',
    (color) => {
      const { container } = render(<Text {...requiredProps} color={color} />);
      expect(container.firstChild).toHaveClass(color);
    }
  );
});
