import React from 'react';
import { act } from 'react-dom/test-utils';

import { setupTestComponent, setupTestProvider } from '../../setupTests';
import Link from '.';

const requiredProps = {
  to: '/test'
};

const setupTestWithString = setupTestProvider({
  render: () => <Link {...requiredProps}>hey im a link</Link>
});

const setupTestWithNode = setupTestComponent({
  render: () => (
    <Link {...requiredProps}>
      <div>hey im a link</div>
    </Link>
  )
});

describe('Components: Link', () => {
  it('renders a Link when its children is a string', () => {
    const { wrapper } = setupTestWithString();
    expect(wrapper.find('[data-qa="link"]')).toHaveText('hey im a link');
  });

  it('renders a Link when its children is a node', () => {
    const { wrapper } = setupTestWithNode();
    expect(wrapper.find('[data-qa="link"] div')).toHaveText('hey im a link');
  });

  it('calls react router with the correct to', () => {
    const { wrapper, history } = setupTestWithString();
    act(() => {
      wrapper.find('[data-qa="link"] a').simulate('click', { button: 0 });
    });
    expect(history.location.pathname).toBe(requiredProps.to);
  });

  it('renders a data-id', () => {
    const { wrapper } = setupTestWithNode({
      props: {
        dataId: 'test'
      }
    });
    expect(wrapper.find('span[data-id="test"]')).toExist();
  });
});
