import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { setupWrapper, setupServer } from '../../setupTests';
import { services, authApi } from '../../lib/hooks/use-mutation';

import Contact from '.';

const { serve } = setupServer();
const { Wrapper } = setupWrapper();

const WrappedComponent = () => (
  <Wrapper>
    <Contact />
  </Wrapper>
);

const fillFormSuccessfully = () => {
  fireEvent.change(screen.getByLabelText('name'), {
    target: { value: 'name' }
  });
  fireEvent.change(screen.getByLabelText('email'), {
    target: { value: 'test@test.com' }
  });
  fireEvent.change(screen.getByLabelText('number'), {
    target: { value: '01234567890' }
  });
  fireEvent.submit(screen.getByRole('button'));
};

describe('Pages: Contact', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Form', () => {
    describe('Validations', () => {
      it('renders no validations when invalid details are entered', async () => {
        serve({
          endpoint: services.contact.endpoint
        });
        render(<WrappedComponent />);
        fireEvent.change(screen.getByLabelText('name'), {
          target: { value: 'name' }
        });
        fireEvent.change(screen.getByLabelText('email'), {
          target: { value: 'test' }
        });
        fireEvent.change(screen.getByLabelText('number'), {
          target: { value: '123' }
        });
        expect(screen.queryByText('Name is required')).not.toBeInTheDocument();
        expect(
          screen.queryByText('Please enter a valid email')
        ).not.toBeInTheDocument();
        expect(
          screen.queryByText('Please enter a valid number')
        ).not.toBeInTheDocument();
      });

      it('renders all required validation together on submit', () => {
        serve({
          endpoint: services.contact.endpoint
        });
        render(<WrappedComponent />);
        userEvent.click(screen.getByRole('button'));
        expect(screen.queryByText('Name is required')).toBeInTheDocument();
        expect(screen.queryByText('Email is required')).toBeInTheDocument();
      });

      it('renders valid email validation on submit', () => {
        serve({
          endpoint: services.contact.endpoint
        });
        render(<WrappedComponent />);
        userEvent.click(screen.getByRole('button'));
        expect(
          screen.queryByText('Please enter a valid email')
        ).not.toBeInTheDocument();
      });

      it('renders valid number validation on submit', () => {
        serve({
          endpoint: services.contact.endpoint
        });
        render(<WrappedComponent />);
        userEvent.click(screen.getByRole('button'));
        expect(
          screen.queryByText('Please enter a valid number')
        ).toBeInTheDocument();
      });
    });
  });

  describe('Labels', () => {
    it('renders label Full Name', () => {
      serve({
        endpoint: services.contact.endpoint
      });
      render(<WrappedComponent />);
      expect(screen.getByLabelText('Full Name*')).toBeInTheDocument();
    });

    it('renders label Email', () => {
      serve({
        endpoint: services.contact.endpoint
      });
      render(<WrappedComponent />);
      expect(screen.getByLabelText('Email*')).toBeInTheDocument();
    });

    it('renders label Number', () => {
      serve({
        endpoint: services.contact.endpoint
      });
      render(<WrappedComponent />);
      expect(screen.getByLabelText('Number')).toBeInTheDocument();
    });

    it('renders label Message', () => {
      serve({
        endpoint: services.contact.endpoint
      });
      render(<WrappedComponent />);
      expect(screen.getByLabelText('Message')).toBeInTheDocument();
    });
  });

  describe('Error', () => {
    it('renders error when auth endpoint has failed', async () => {
      serve({
        endpoint: authApi.endpoint,
        method: 'post',
        status: 500
      });
      serve({
        endpoint: services.contact.endpoint,
        method: 'post'
      });
      render(<WrappedComponent />);
      fillFormSuccessfully();

      await waitFor(() => {
        expect(
          screen.queryByText(
            'Oops, something went wrong with loading the contact form.'
          )
        ).toBeInTheDocument();
      });
    });

    it('renders error when contact endpoint has failed', async () => {
      serve({
        endpoint: authApi.endpoint,
        method: 'post'
      });
      serve({
        endpoint: services.contact.endpoint,
        method: 'post',
        status: 500
      });
      render(<WrappedComponent />);
      fillFormSuccessfully();

      await waitFor(() => {
        expect(
          screen.queryByText(
            'Oops, something went wrong with loading the contact form.'
          )
        ).toBeInTheDocument();
      });
    });
  });

  describe('Success', () => {
    it('renders success message', async () => {
      serve({
        endpoint: authApi.endpoint,
        method: 'post'
      });
      const contactPromise = serve({
        endpoint: services.contact.endpoint,
        method: 'post'
      });
      render(<WrappedComponent />);
      fillFormSuccessfully();

      const contact = await contactPromise();

      await waitFor(() => {
        expect(contact.request.body).toEqual({
          fields: {
            email: 'test@test.com',
            name: 'name',
            number: '01234567890'
          },
          status: 'publish',
          title: 'test@test.com'
        });
        expect(
          screen.queryByText('Thank you for your message.')
        ).toBeInTheDocument();
      });
    });

    it('renders form again and actions called with correct values', async () => {
      serve({
        endpoint: authApi.endpoint,
        method: 'post'
      });
      serve({
        endpoint: services.contact.endpoint,
        method: 'post'
      });
      render(<WrappedComponent />);

      fillFormSuccessfully();

      await waitFor(() => {
        fireEvent.click(screen.queryByText('Send another'));
      });

      serve({
        endpoint: authApi.endpoint,
        method: 'post'
      });
      serve({
        endpoint: services.contact.endpoint,
        method: 'post'
      });

      fillFormSuccessfully();

      await waitFor(() => {
        expect(
          screen.queryByText('Thank you for your message.')
        ).toBeInTheDocument();
      });
    });
  });
});
