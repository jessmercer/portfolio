import React from 'react';
import {
  render,
  screen,
  waitForElementToBeRemoved
} from '@testing-library/react';

import { setupWrapper, setupServer } from '../../setupTests';
import { services } from '../../lib/hooks/use-query';

import projectsResponse from '../../test-resources/projects-response';
import { routes } from '../../lib/constants';
import Project from '.';

const slug = 'my-project';

const { serve } = setupServer();
const { Wrapper } = setupWrapper({
  path: `${routes.project}/:slug`,
  location: `${routes.project}/${slug}`
});

const WrappedComponent = () => (
  <Wrapper>
    <Project />
  </Wrapper>
);

describe('Pages: Project', () => {
  describe('Error', () => {
    it('renders error when project has an error', async () => {
      serve({
        endpoint: services.projects.endpoint,
        status: 500,
        params: { ...services.projects.params, slug }
      });
      render(<WrappedComponent />);
      await waitForElementToBeRemoved(() => screen.queryByText('Loading'));
      expect(
        screen.getByText('Oops, something went wrong with loading the project.')
      ).toBeInTheDocument();
    });

    it('renders error when there is no project', async () => {
      serve({
        endpoint: services.projects.endpoint,
        params: { ...services.projects.params, slug }
      });
      render(<WrappedComponent />);
      await waitForElementToBeRemoved(() => screen.queryByText('Loading'));
      expect(
        screen.getByText('Oops, something went wrong with loading the project.')
      ).toBeInTheDocument();
    });
  });

  describe('success', () => {
    beforeEach(() => {
      serve({
        endpoint: services.projects.endpoint,
        data: projectsResponse,
        params: { ...services.projects.params, slug }
      });
    });

    it('renders page on success', async () => {
      render(<WrappedComponent />);
      await waitForElementToBeRemoved(() => screen.queryByText('Loading'));
      expect(screen.getByText('Lets go')).toBeInTheDocument();
    });

    describe('Project components', () => {
      it('renders the title', async () => {
        render(<WrappedComponent />);
        await waitForElementToBeRemoved(() => screen.queryByText('Loading'));
        expect(screen.getByRole('heading')).toBeInTheDocument();
      });

      it('renders the image', async () => {
        render(<WrappedComponent />);
        await waitForElementToBeRemoved(() => screen.queryByText('Loading'));
        expect(screen.getByAltText('Test')).toHaveAttribute(
          'data-src',
          'http://www.boggonbone.co.uk/api/wp-content/uploads/2020/03/test_image_2-768x512.jpeg'
        );
        expect(screen.getByAltText('Test')).toHaveAttribute('alt', 'Test');
        expect(screen.getByAltText('Test')).toHaveAttribute(
          'src',
          'http://www.boggonbone.co.uk/api/wp-content/uploads/2020/03/test_image_2-768x512.jpeg'
        );
      });
      it('renders the created with text', async () => {
        render(<WrappedComponent />);
        await waitForElementToBeRemoved(() => screen.queryByText('Loading'));
        expect(
          screen.getByText('Created with: Test created with')
        ).toBeInTheDocument();
      });

      it('renders the tools text', async () => {
        render(<WrappedComponent />);
        await waitForElementToBeRemoved(() => screen.queryByText('Loading'));
        expect(
          screen.getByText('Tools used: Test tools used')
        ).toBeInTheDocument();
      });

      it('renders the link', async () => {
        render(<WrappedComponent />);
        await waitForElementToBeRemoved(() => screen.queryByText('Loading'));
        expect(screen.getByRole('link')).toHaveTextContent('Lets go');
        expect(screen.getByRole('link')).toHaveAttribute(
          'href',
          'https://www.bbc.co.uk/news'
        );
      });
    });
  });

  describe('Missing data', () => {
    it('does not render the link when it does not exist', async () => {
      serve({
        endpoint: services.projects.endpoint,
        data: [
          {
            ...projectsResponse[0],
            acf: {
              ...projectsResponse[0].acf,
              project_link: null
            }
          }
        ],
        params: { ...services.projects.params, slug }
      });

      render(<WrappedComponent />);
      await waitForElementToBeRemoved(() => screen.queryByText('Loading'));
      expect(screen.queryByText('Lets go')).not.toBeInTheDocument();
    });
  });
});
