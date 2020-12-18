import React from 'react';

import { setupTestProvider } from '../../setupTests';
import * as contactActions from '../../redux/contact/actions';

import {
  POST_MESSAGE_SUCCESS,
  POST_MESSAGE_ERROR
} from '../../redux/contact/actions/types';

import Contact from '.';

jest.spyOn(contactActions, 'postMessageRequest').mockReturnValue(jest.fn());

const setupTest = setupTestProvider({
  render: () => <Contact />
});

describe('Pages: Contact', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Error', () => {
    it('renders error when contact has an error', () => {
      const { wrapper } = setupTest({
        prerender: ({ dispatch }) => {
          dispatch({
            type: POST_MESSAGE_ERROR
          });
        }
      });
      expect(wrapper.find('[data-qa="error-message"]')).toHaveText(
        'Oops, something went wrong with loading the contact form.'
      );
    });
  });

  describe('Form', () => {
    describe('Validations', () => {
      it('renders no validations when invalid details are entered', () => {
        const { wrapper } = setupTest();
        wrapper
          .find('input[id="name"]')
          .simulate('change', { target: { value: 'name' } });
        wrapper
          .find('input[id="email"]')
          .simulate('change', { target: { value: 'test' } });
        wrapper
          .find('input[id="number"]')
          .simulate('change', { target: { value: '123' } });
        expect(wrapper.find('[data-id="error-name"]')).not.toExist();
        expect(wrapper.find('[data-id="error-email"]')).not.toExist();
        expect(wrapper.find('[data-id="error-number"]')).not.toExist();
      });

      it('renders all required validation together on submit', () => {
        const { wrapper } = setupTest();
        wrapper.find('button[type="submit"]').simulate('submit');
        expect(wrapper.find('[data-id="error-name"]')).toHaveText(
          'Name is required'
        );
        expect(wrapper.find('input[id="name"]')).toHaveClassName('isInvalid');
        expect(wrapper.find('[data-id="error-email"]')).toHaveText(
          'Email is required'
        );
        expect(wrapper.find('input[id="email"]')).toHaveClassName('isInvalid');
      });

      it('renders valid email validation on submit', () => {
        const { wrapper } = setupTest();
        wrapper
          .find('input[id="email"]')
          .simulate('change', { target: { value: 'test' } });
        wrapper.find('button[type="submit"]').simulate('submit');
        expect(wrapper.find('[data-id="error-email"]')).toHaveText(
          'Please enter a valid email'
        );
        expect(wrapper.find('input[id="email"]')).toHaveClassName('isInvalid');
      });

      it('renders valid number validation on submit', () => {
        const { wrapper } = setupTest();
        wrapper
          .find('input[id="number"]')
          .simulate('change', { target: { value: '123' } });
        wrapper.find('button[type="submit"]').simulate('submit');
        expect(wrapper.find('[data-id="error-number"]')).toHaveText(
          'Please enter a valid number'
        );
        expect(wrapper.find('input[id="number"]')).toHaveClassName('isInvalid');
      });
    });
  });

  describe('Labels', () => {
    it('renders label Full Name', () => {
      const { wrapper } = setupTest();
      expect(wrapper.find('[data-id="name"]')).toHaveText('Full Name*');
    });

    it('renders label Email', () => {
      const { wrapper } = setupTest();
      expect(wrapper.find('[data-id="email"]')).toHaveText('Email*');
    });

    it('renders label Number', () => {
      const { wrapper } = setupTest();
      expect(wrapper.find('[data-id="number"]')).toHaveText('Number');
    });

    it('renders label Message', () => {
      const { wrapper } = setupTest();
      expect(wrapper.find('[data-id="message"]')).toHaveText('Message');
    });
  });

  describe('Actions', () => {
    it('renders enabled button and action is called with correct properties', () => {
      const { wrapper } = setupTest();
      wrapper
        .find('input[id="name"]')
        .simulate('change', { target: { value: 'name' } });
      wrapper
        .find('input[id="email"]')
        .simulate('change', { target: { value: 'test@test.com' } });
      wrapper
        .find('input[id="number"]')
        .simulate('change', { target: { value: '01234567890' } });
      wrapper
        .find('textarea[id="message"]')
        .simulate('change', { target: { value: 'message' } });
      wrapper.find('button[type="submit"]').simulate('submit');
      expect(contactActions.postMessageRequest).toHaveBeenCalledWith({
        fields: {
          email: 'test@test.com',
          message: 'message',
          name: 'name',
          number: '01234567890'
        },
        status: 'publish',
        title: 'test@test.com'
      });
    });
  });

  describe('Success', () => {
    it('renders success message', () => {
      const { wrapper } = setupTest({
        prerender: ({ dispatch }) => {
          dispatch({
            type: POST_MESSAGE_SUCCESS
          });
        }
      });
      expect(wrapper.find('[data-qa="success-message"]')).toHaveText(
        'Thank you for your message.'
      );
    });

    it('renders send another button', () => {
      const { wrapper } = setupTest({
        prerender: ({ dispatch }) => {
          dispatch({
            type: POST_MESSAGE_SUCCESS
          });
        }
      });
      expect(wrapper.find('[data-qa="success-button"]')).toHaveText(
        'Send another'
      );
    });

    it('renders form again and actions called with correct values', () => {
      const { wrapper } = setupTest({
        prerender: ({ dispatch }) => {
          dispatch({
            type: POST_MESSAGE_SUCCESS
          });
        }
      });
      wrapper.find('[data-qa="success-button"]').simulate('click');
      wrapper
        .find('input[id="name"]')
        .simulate('change', { target: { value: 'name' } });
      wrapper
        .find('input[id="email"]')
        .simulate('change', { target: { value: 'test@test.com' } });
      wrapper
        .find('input[id="number"]')
        .simulate('change', { target: { value: '01234567890' } });
      wrapper
        .find('textarea[id="message"]')
        .simulate('change', { target: { value: 'message' } });
      wrapper.find('button[type="submit"]').simulate('submit');
      expect(contactActions.postMessageRequest).toHaveBeenCalledWith({
        fields: {
          email: 'test@test.com',
          message: 'message',
          name: 'name',
          number: '01234567890'
        },
        status: 'publish',
        title: 'test@test.com'
      });
    });
  });
});
