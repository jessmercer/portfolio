import React from 'react';

import { setupTestProvider } from '../../setupTests';
import { setupWorker, rest } from 'msw';
import useQuery, { queryKeys } from '../../lib/hooks/use-query';

// import * as projectsActions from '../../redux/projects/actions';

// import {
//   FETCH_PROJECTS,
//   FETCH_PROJECTS_SUCCESS,
//   FETCH_PROJECTS_ERROR
// } from '../../redux/projects/actions/types';

import projectsResponse from '../../test-resources/projects-response';
import { routes } from '../../lib/constants';
import Project from '.';

// jest.spyOn(projectsActions, 'requestProjects').mockReturnValue(jest.fn());
// jest.spyOn(projectsActions, 'fetchProjectsReset').mockReturnValue(jest.fn());

const worker = setupWorker(
  rest.get(useQuery(queryKeys.project), (req, res, ctx) => {
    const { project } = req.body;
    return res(ctx.delay(500), ctx.status(200), ctx.json(project));
  })
);
worker.start();

// const setupTest = setupTestProvider({
//   render: () => <Project />
// });

// const setupTestSuccess = setupTestProvider({
//   render: () => <Project />,
//   prerender: ({ dispatch }) => {
//     dispatch({
//       type: FETCH_PROJECTS_SUCCESS,
//       data: projectsResponse
//     });
//   }
// });

describe('Pages: Project', () => {
  describe('Error', () => {
    it('renders error when project has an error', () => {
      const { wrapper } = setupTest({
        prerender: ({ dispatch }) => {
          dispatch({
            type: FETCH_PROJECTS_ERROR
          });
        }
      });
      expect(wrapper.find('[data-qa="error-message"]')).toHaveText(
        'Oops, something went wrong with loading the project.'
      );
    });

    it('renders error when project is empty and is not initial or pending', () => {
      const { wrapper } = setupTest({
        prerender: ({ dispatch }) => {
          dispatch({
            type: FETCH_PROJECTS_SUCCESS,
            data: []
          });
        }
      });
      expect(wrapper.find('[data-qa="error-message"]')).toHaveText(
        'Oops, something went wrong with loading the project.'
      );
    });
  });

  describe('Loading', () => {
    it('should render loader when project is initial', () => {
      const { wrapper } = setupTest();
      expect(wrapper.find('[data-qa="loader"]')).toExist();
    });

    it('renders loader when project is pending', () => {
      const { wrapper } = setupTest({
        prerender: ({ dispatch }) => {
          dispatch({
            type: FETCH_PROJECTS
          });
        }
      });
      expect(wrapper.find('[data-qa="loader"]')).toExist();
    });
  });

  describe('Actions', () => {
    it('should call requestProjects with the slug from the url', () => {
      const slug = 'test';
      setupTest({
        path: `${routes.project}/:slug`,
        initialEntries: [`${routes.project}/${slug}`]
      });
      expect(projectsActions.requestProjects).toHaveBeenCalledWith(slug);
    });

    it('should call fetchProjectsReset when the page unmounts', () => {
      const { wrapper } = setupTestSuccess();
      wrapper.unmount();
      expect(projectsActions.fetchProjectsReset).toHaveBeenCalled();
    });
  });

  describe('Success', () => {
    it('renders tiles and tile', () => {
      const { wrapper } = setupTestSuccess();
      expect(wrapper.find('[data-qa="tiles"]')).toExist();
      expect(wrapper.find('[data-qa="tile"]')).toExist();
    });

    describe('Project components', () => {
      const { wrapper } = setupTestSuccess();
      const projectResponse = projectsResponse[0];

      it('renders the title', () => {
        expect(wrapper.find('h1[data-id="title"]')).toHaveText(
          projectResponse.title.rendered
        );
      });

      it('renders the image', () => {
        expect(wrapper.find('img')).toHaveProp(
          'data-src',
          projectResponse.acf.image.sizes.medium_large
        );
        expect(wrapper.find('img')).toHaveProp(
          'alt',
          projectResponse.title.rendered
        );
        expect(wrapper.find('source').at(0)).toHaveProp(
          'data-srcset',
          projectResponse.acf.image.sizes['1536x1536']
        );
        expect(wrapper.find('source').at(0)).toHaveProp(
          'media',
          `(min-width: ${projectResponse.acf.image.sizes['medium_large-width']}px)`
        );
        expect(wrapper.find('source').at(1)).toHaveProp(
          'data-srcset',
          projectResponse.acf.image.sizes['twentytwenty-fullscreen']
        );
        expect(wrapper.find('source').at(1)).toHaveProp(
          'media',
          `(min-width: ${projectResponse.acf.image.sizes['1536x1536-width']}px)`
        );
      });

      it('renders the created with text', () => {
        expect(wrapper.find('[data-id="created-width"]')).toHaveText(
          `Created with: ${projectResponse.acf.created_with}`
        );
      });

      it('renders the tools text', () => {
        expect(wrapper.find('[data-id="tools"]')).toHaveText(
          `Tools used: ${projectResponse.acf.tools}`
        );
      });

      it('renders the link', () => {
        expect(wrapper.find('a')).toHaveProp(
          'href',
          projectResponse.acf.project_link.url
        );
      });
    });

    describe('Missing data', () => {
      it('does not render the link when does not exsist', () => {
        const { wrapper } = setupTest({
          prerender: ({ dispatch }) => {
            dispatch({
              type: FETCH_PROJECTS_SUCCESS,
              data: [
                {
                  ...projectsResponse[0],
                  acf: {
                    ...projectsResponse[0].acf,
                    project_link: null
                  }
                }
              ]
            });
          }
        });
        expect(wrapper.find('a')).not.toExist();
      });
    });
  });
});
