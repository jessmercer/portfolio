import isRequired from '.';

describe('validation: isRequired', () => {
  it('returns default error message', () => {
    expect(isRequired()).toEqual('This is required');
  });

  it('returns a custom error message', () => {
    expect(isRequired(undefined, 'Name is required')).toEqual(
      'Name is required'
    );
  });

  it.each([undefined, null, false, '', {}, []])('should fail: %p', (value) => {
    expect(isRequired(value)).toEqual('This is required');
  });

  it.each(['A', '0', 'false', 'undefined', 'null'])(
    'should pass: %p',
    (value) => {
      expect(isRequired(value)).toBeUndefined();
    }
  );
});
