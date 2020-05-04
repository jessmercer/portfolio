import contactSelectors from '.';

describe('Selectors: Contact', () => {
  describe('getPredicate', () => {
    it('should return the default state', () => {
      expect(contactSelectors.getPredicate()).toEqual({
        hasError: false,
        isInitial: false,
        isPending: false
      });
    });
  });
});
