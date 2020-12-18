import React from 'react';
import { setupTestComponent } from '../../setupTests';

import TextInput from '.';

const onChange = jest.fn();

const requiredProps = {
  value: 'text',
  onChange,
  name: 'name'
};

const setupTest = setupTestComponent({
  render: () => <TextInput {...requiredProps} />
});

describe('Components: TextInput', () => {
  it('renders onChange on input', () => {
    const { wrapper } = setupTest();
    wrapper.find('[data-qa="input"]').simulate('change');
    expect(wrapper.find('[data-qa="input"]')).toHaveProp(
      'onChange',
      requiredProps.onChange
    );
    expect(onChange).toHaveBeenCalled();
  });

  it('should render input with name', () => {
    const { wrapper } = setupTest();
    expect(wrapper.find('[data-qa="input"]')).toHaveProp(
      'name',
      requiredProps.name
    );
  });

  it('should render input with id', () => {
    const { wrapper } = setupTest();
    expect(wrapper.find('[data-qa="input"]')).toHaveProp(
      'id',
      requiredProps.name
    );
  });

  it('should render input with type of text as default', () => {
    const { wrapper } = setupTest();
    expect(wrapper.find('[data-qa="input"]')).toHaveProp('type', 'text');
  });

  it('renders data qa', () => {
    const { wrapper } = setupTest();
    expect(wrapper.find('[data-qa="input"]')).toExist();
  });

  it('renders TextInput with className textInput', () => {
    const { wrapper } = setupTest();
    expect(wrapper.find('[data-qa="input"]')).toHaveClassName('textInput');
  });

  it('renders TextInput with className isValid', () => {
    const { wrapper } = setupTest({
      props: {
        isValid: true
      }
    });
    expect(wrapper.find('[data-qa="input"]')).toHaveClassName('isValid');
  });

  it('renders TextInput with className isInvalid', () => {
    const { wrapper } = setupTest({
      props: {
        isInvalid: true
      }
    });
    expect(wrapper.find('[data-qa="input"]')).toHaveClassName('isInvalid');
  });

  it.each(Object.values(TextInput.types))(
    'renders the type: %p when it is passed as a prop',
    (type) => {
      const { wrapper } = setupTest({
        props: {
          type
        }
      });
      expect(wrapper.find('[data-qa="input"]')).toHaveProp('type', type);
    }
  );
});
