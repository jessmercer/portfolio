import projectsSelectors from '.';

describe('Selectors: Projects', () => {
  describe('getPredicate', () => {
    it('should return the default state', () => {
      expect(projectsSelectors.getPredicate()).toEqual({
        hasError: false,
        isInitial: false,
        isPending: false
      });
    });

    it('should return the state', () => {
      expect(
        projectsSelectors.getPredicate({
          projects: {
            hasError: 'hasError',
            isInitial: 'isInitial',
            isPending: 'isPending'
          }
        })
      ).toEqual({
        hasError: 'hasError',
        isInitial: 'isInitial',
        isPending: 'isPending'
      });
    });
  });

  describe('getProjects', () => {
    it('should return the default state', () => {
      expect(projectsSelectors.getProjects()).toBeUndefined();
    });

    it('should return the state', () => {
      expect(
        projectsSelectors.getProjects({
          projects: {
            data: ['project 1', 'project 2']
          }
        })
      ).toEqual(['project 1', 'project 2']);
    });
  });
});
