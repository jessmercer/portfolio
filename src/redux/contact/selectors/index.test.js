import contactSelectors from '.';

describe('Selectors: Contact', () => {
  describe('getPredicate', () => {
    it('should return the default state', () => {
      expect(contactSelectors.getPredicate()).toEqual({
        hasError: false,
        isInitial: false,
        isPending: false,
        isSuccess: false
      });
    });

    it('should return the state', () => {
      expect(
        contactSelectors.getPredicate({
          contact: {
            hasError: 'hasError',
            isInitial: 'isInitial',
            isPending: 'isPending',
            isSuccess: 'isSuccess'
          }
        })
      ).toEqual({
        hasError: 'hasError',
        isInitial: 'isInitial',
        isPending: 'isPending',
        isSuccess: 'isSuccess'
      });
    });
  });
});
