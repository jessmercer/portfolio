import homeSelectors from '.';

describe('Selectors: Home', () => {
  describe('getSimple', () => {
    it('should return the default state', () => {
      expect(homeSelectors.getSimple()).toEqual({
        description: undefined,
        heading: undefined
      });
    });

    it('should return the description', () => {
      expect(
        homeSelectors.getSimple([
          {
            acf: {
              description: 'description'
            }
          }
        ]).description
      ).toBe('description');
    });

    it('should return the heading', () => {
      expect(
        homeSelectors.getSimple([
          {
            acf: {
              heading: 'heading'
            }
          }
        ]).heading
      ).toBe('heading');
    });
  });
});
