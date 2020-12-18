import React from 'react';

import { setupTestComponent } from '../../setupTests';
import Loader from '../../components/loader';
import PageLoader from '.';

const setupTest = setupTestComponent({
  render: () => (
    <PageLoader>
      <Loader />
    </PageLoader>
  )
});

describe('Components: PageLoader', () => {
  it('renders correct className on PageLoader', () => {
    const { wrapper } = setupTest();
    expect(wrapper.find('[data-qa="page-loader"]')).toHaveClassName(
      'pageLoaderWrapper'
    );
  });
});
