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

    it('should return the state', () => {
      expect(
        contactSelectors.getPredicate({
          contact: {
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
        expect(contactSelectors.getSimple().description).toBeUndefined();
      });
      it('should return the state', () => {
        expect(
          contactSelectors.getSimple({
            contact: {
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

    describe('number', () => {
      it('should return the default state', () => {
        expect(contactSelectors.getSimple().number).toBeUndefined();
      });
      it('should return the state', () => {
        expect(
          contactSelectors.getSimple({
            contact: {
              data: {
                acf: {
                  number: 'number'
                }
              }
            }
          }).number
        ).toBe('number');
      });
    });

    describe('email', () => {
      it('should return the default state', () => {
        expect(contactSelectors.getSimple().email).toBeUndefined();
      });
      it('should return the state', () => {
        expect(
          contactSelectors.getSimple({
            contact: {
              data: {
                acf: {
                  email: 'email'
                }
              }
            }
          }).email
        ).toBe('email');
      });
    });
  });
});