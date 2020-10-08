import isPhoneNumber from '.';

describe('validation: isPhoneNumber', () => {
  it('returns default error message', () => {
    expect(isPhoneNumber()).toEqual('This is required');
  });

  it('returns a custom error message', () => {
    expect(isPhoneNumber(undefined, 'Please enter a valid number')).toEqual(
      'Please enter a valid number'
    );
  });

  it.each([
    undefined,
    null,
    false,
    '',
    {},
    [],
    '£1234567890',
    '12345+67890',
    'abc12345678',
    '123456789012',
    '1234567890',
    '+2212345678901'
  ])('should fail: %p', (value) => {
    expect(isPhoneNumber(value)).toEqual('This is required');
  });

  it.each([
    '+441234567890',
    '07123456789',
    '01234567890',
    '02345678901',
    '03456789012',
    '04567890123',
    '05678901234',
    '06789012345',
    '08901234567',
    '09123456789'
  ])('should pass: %p', (value) => {
    expect(isPhoneNumber(value)).toBeUndefined();
  });
});
