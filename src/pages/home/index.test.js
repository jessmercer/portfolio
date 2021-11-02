import React from 'react';
import {
  render,
  screen,
  waitForElementToBeRemoved
} from '@testing-library/react';

import { setupWrapper, setupServer } from '../../setupTests';
import { services } from '../../lib/hooks/use-query';
import homeResponse from '../../test-resources/home-response';
import projectsResponse from '../../test-resources/projects-response';
import Home from '.';

const { serve } = setupServer();
const { Wrapper } = setupWrapper();

const WrappedComponent = () => (
  <Wrapper>
    <Home />
  </Wrapper>
);

describe('Pages: Home', () => {
  describe('Error', () => {
    it('renders error when home endpoint has failed', async () => {
      serve({
        endpoint: services.home.endpoint,
        status: 500,
        params: services.home.params
      });
      serve({
        endpoint: services.projects.endpoint,
        params: services.projects.params
      });
      render(<WrappedComponent />);
      await waitForElementToBeRemoved(() => screen.queryByText('Loading'));
      expect(
        screen.getByText(
          'Oops, something went wrong with loading the homepage.'
        )
      ).toBeInTheDocument();
    });

    it('renders error when projects endpoint has failed', async () => {
      serve({
        endpoint: services.projects.endpoint,
        status: 500,
        params: services.projects.params
      });
      serve({
        endpoint: services.home.endpoint,
        params: services.home.params
      });
      render(<WrappedComponent />);
      await waitForElementToBeRemoved(() => screen.queryByText('Loading'));
      expect(
        screen.getByText(
          'Oops, something went wrong with loading the homepage.'
        )
      ).toBeInTheDocument();
    });
  });

  describe('Success', () => {
    beforeEach(() => {
      serve({
        endpoint: services.home.endpoint,
        data: homeResponse,
        params: services.home.params
      });
      serve({
        endpoint: services.projects.endpoint,
        data: projectsResponse,
        params: services.projects.params
      });
    });
    it('renders page on success', async () => {
      render(<WrappedComponent />);
      await waitForElementToBeRemoved(() => screen.queryByText('Loading'));
      expect(screen.getByText('Projects')).toBeInTheDocument();
    });
    describe('Projects', () => {
      it.each(projectsResponse)(
        'renders the correct components for project %#',
        async () => {
          render(<WrappedComponent />);
          await waitForElementToBeRemoved(() => screen.queryByText('Loading'));
          expect(screen.getByRole('heading')).toBeInTheDocument();
          expect(screen.getByAltText('Test')).toHaveAttribute(
            'data-src',
            'http://www.boggonbone.co.uk/api/wp-content/uploads/2020/03/test_image_2-768x512.jpeg'
          );
          expect(screen.getByAltText('Test')).toHaveAttribute('alt', 'Test');
          expect(screen.getByAltText('Test')).toHaveAttribute(
            'src',
            'http://www.boggonbone.co.uk/api/wp-content/uploads/2020/03/test_image_2-768x512.jpeg'
          );
        }
      );
    });
  });
});
