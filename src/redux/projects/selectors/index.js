import { createSelector } from 'reselect';

const getPredicate = createSelector(
  state => state?.projects,
  ({ isInitial = false, isPending = false, hasError = false } = {}) => ({
    isInitial,
    isPending,
    hasError
  })
);

// const formatProjects = projects =>
//   projects.map(project => ({
//     ...project,
//     title: project.title.rendered
//   }));

const getProjects = createSelector(
  [({ projects } = {}) => projects?.data],
  projects => projects
);

export default { getPredicate, getProjects };
