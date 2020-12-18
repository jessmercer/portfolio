import React from 'react';
import { setupTestComponent } from '../../setupTests';

import Button from '.';

const requiredProps = {
  value: 'submit',
  children: 'submit'
};

const setupTest = setupTestComponent({
  render: () => <Button {...requiredProps} />
});

describe('Components: Button', () => {
  it('should render button with type of submit as default', () => {
    const { wrapper } = setupTest();
    expect(wrapper.find('[data-qa="button"]')).toHaveProp('type', 'submit');
  });

  it('renders data qa', () => {
    const { wrapper } = setupTest();
    expect(wrapper.find('[data-qa="button"]')).toExist();
  });

  it('renders Button with className submit', () => {
    const { wrapper } = setupTest();
    expect(wrapper.find('[data-qa="button"]')).toHaveClassName('button');
  });

  it('renders Button with className isDisabled', () => {
    const { wrapper } = setupTest({
      props: {
        isDisabled: true
      }
    });
    expect(wrapper.find('[data-qa="button"]')).toHaveClassName('isDisabled');
  });

  it('renders Button with className isLoading', () => {
    const { wrapper } = setupTest({
      props: {
        isLoading: true
      }
    });
    expect(wrapper.find('[data-qa="button"]')).toHaveClassName('isLoading');
  });

  it('renders Button when its children is a string', () => {
    const { wrapper } = setupTest();
    expect(wrapper.find('[data-qa="button"]')).toHaveText('submit');
  });

  it('renders button as disabled when isDisabled is passed', () => {
    const { wrapper } = setupTest({
      props: {
        isDisabled: true
      }
    });
    expect(wrapper.find('[data-qa="button"]')).toHaveProp('disabled', true);
  });

  it('renders button as disabled when isLoading is passed', () => {
    const { wrapper } = setupTest({
      props: {
        isLoading: true
      }
    });
    expect(wrapper.find('[data-qa="button"]')).toHaveProp('disabled', true);
  });

  it('renders button onClick when onClick is passed', () => {
    const onClick = jest.fn();
    const { wrapper } = setupTest({
      props: {
        onClick
      }
    });
    wrapper.find('[data-qa="button"]').simulate('click');
    expect(onClick).toHaveBeenCalled();
  });

  it('should render button with span className buttonText', () => {
    const { wrapper } = setupTest();
    expect(wrapper.find('[data-qa="button-text"]')).toHaveClassName(
      'buttonText'
    );
  });

  it('should render button with span className buttonLoaderWrapper when isLoading prop is passed', () => {
    const { wrapper } = setupTest({
      props: {
        isLoading: true
      }
    });
    expect(wrapper.find('[data-qa="button-loader-wrapper"]')).toHaveClassName(
      'buttonLoaderWrapper'
    );
  });

  it('renders a default type submit', () => {
    const { wrapper } = setupTest();
    expect(wrapper.find('[data-qa="button"]')).toExist();
  });

  it.each(Object.values(Button.types))(
    'renders the type: %p when it is passed as a prop',
    (type) => {
      const { wrapper } = setupTest({
        props: {
          type: Button.types[type]
        }
      });
      expect(wrapper.find('[data-qa="button"]')).toExist();
    }
  );

  // it('it should render the loader and loading classes when isLoading prop is passed', () => {
  //   const { wrapper } = setupTest({
  //     props: {
  //       isLoading: true
  //     }
  //   });
  //   expect(wrapper.find('[data-qa="loader"]')).toExist();
  //   expect(wrapper.find('[data-qa="submit-text"]')).toHaveClassName(
  //     'isLoading'
  //   );
  // });

  // it('it should not render the loader and loading classes when isLoading prop is not passed', () => {
  //   const { wrapper } = setupTest({
  //     props: {
  //       isLoading: false
  //     }
  //   });
  //   expect(wrapper.find('[data-qa="loader"]')).not.toExist();
  //   expect(wrapper.find('[data-qa="submit-text"]')).not.toHaveClassName(
  //     'isLoading'
  //   );
  // });
});
