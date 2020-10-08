import React from 'react';
import { setupTestComponent } from '../../setupTests';

import Submit from '.';

const requiredProps = {
  value: 'submit',
  children: 'submit'
};

const setupTest = setupTestComponent({
  render: () => <Submit {...requiredProps} />
});

describe('Components: Submit', () => {
  it('should render button with type of submit as default', () => {
    const { wrapper } = setupTest();
    expect(wrapper.find('[data-qa="submit"]')).toHaveProp('type', 'submit');
  });

  it('renders data qa', () => {
    const { wrapper } = setupTest();
    expect(wrapper.find('[data-qa="submit"]')).toExist();
  });

  it('renders Submit with className submit', () => {
    const { wrapper } = setupTest();
    expect(wrapper.find('[data-qa="submit"]')).toHaveClassName('submit');
  });

  it('renders Submit with className isDisabled', () => {
    const { wrapper } = setupTest({
      props: {
        isDisabled: true
      }
    });
    expect(wrapper.find('[data-qa="submit"]')).toHaveClassName('isDisabled');
  });

  it('renders Submit when its children is a string', () => {
    const { wrapper } = setupTest();
    expect(wrapper.find('[data-qa="submit"]')).toHaveText('submit');
  });
});
