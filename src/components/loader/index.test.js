import React from 'react';

import { setupTestComponent } from '../../setupTests';
import Loader from '.';

const setupTest = setupTestComponent({
  render: () => <Loader />
});

describe('Components: Loader', () => {
  it('renders correct className on Loader', () => {
    const { wrapper } = setupTest();
    expect(wrapper.find('[data-qa="loader"]')).toHaveClassName('loaderWrapper');
  });

  it('renders Loader with className black', () => {
    const { wrapper } = setupTest();
    expect(wrapper.find('[data-qa="loader-dot"]')).toHaveClassName(
      Loader.colors.black
    );
  });

  it.each(Object.values(Loader.colors))(
    'renders the color: %p when it is passed as a prop',
    (color) => {
      const { wrapper } = setupTest({
        props: {
          color: Loader.colors[color]
        }
      });
      expect(wrapper.find('[data-qa="loader-dot"]')).toHaveClassName(color);
    }
  );

  it.each(Object.values(Loader.styles))(
    'renders the style: %p when it is passed as a prop',
    (style) => {
      const { wrapper } = setupTest({
        props: {
          style: Loader.styles[style]
        }
      });
      expect(wrapper.find('[data-qa="loader-dot"]')).toHaveClassName(style);
    }
  );
});
