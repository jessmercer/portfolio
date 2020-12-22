import React from 'react';
import { setupTestComponent } from '../../setupTests';

import Textarea from '.';

const onChange = jest.fn();

const requiredProps = {
  value: 'text',
  onChange,
  name: 'name'
};

const setupTest = setupTestComponent({
  render: () => <Textarea {...requiredProps} />
});

describe('Components: Textarea', () => {
  it('renders onChange on textarea', () => {
    const { wrapper } = setupTest();
    wrapper.find('[data-qa="textarea-input"]').simulate('change');
    expect(wrapper.find('[data-qa="textarea-input"]')).toHaveProp(
      'onChange',
      requiredProps.onChange
    );
    expect(onChange).toHaveBeenCalled();
  });

  it('should render textarea with name', () => {
    const { wrapper } = setupTest();
    expect(wrapper.find('[data-qa="textarea-input"]')).toHaveProp(
      'name',
      requiredProps.name
    );
  });

  it('should render textarea with id', () => {
    const { wrapper } = setupTest();
    expect(wrapper.find('[data-qa="textarea-input"]')).toHaveProp(
      'id',
      requiredProps.name
    );
  });

  it('should render textarea with type of text as default', () => {
    const { wrapper } = setupTest();
    expect(wrapper.find('[data-qa="textarea-input"]')).toHaveProp(
      'type',
      'text'
    );
  });

  it('renders data qa', () => {
    const { wrapper } = setupTest();
    expect(wrapper.find('[data-qa="textarea-input"]')).toExist();
  });
});
