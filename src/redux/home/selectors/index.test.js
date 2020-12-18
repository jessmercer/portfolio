import homeSelectors from '.';

describe('Selectors: Home', () => {
  describe('getPredicate', () => {
    it('should return the default state', () => {
      expect(homeSelectors.getPredicate()).toEqual({
        hasError: false,
        isInitial: false,
        isPending: false
      });
    });

    it('should return the state', () => {
      expect(
        homeSelectors.getPredicate({
          home: {
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

  describe('getSimple', () => {
    describe('description', () => {
      it('should return the default state', () => {
        expect(homeSelectors.getSimple().description).toBeUndefined();
      });
      it('should return the state', () => {
        expect(
          homeSelectors.getSimple({
            home: {
              data: {
                acf: {
                  description: 'description'
                }
              }
            }
          }).description
        ).toBe('description');
      });
    });

    describe('heading', () => {
      it('should return the default state', () => {
        expect(homeSelectors.getSimple().heading).toBeUndefined();
      });
      it('should return the state', () => {
        expect(
          homeSelectors.getSimple({
            home: {
              data: {
                acf: {
                  heading: 'heading'
                }
              }
            }
          }).heading
        ).toBe('heading');
      });
    });
  });
});
