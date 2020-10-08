import isEmail from '.';

describe('validation: isEmail', () => {
  it('returns default error message', () => {
    expect(isEmail()).toEqual('This is required');
  });

  it('returns a custom error message', () => {
    expect(isEmail(undefined, 'Email is required')).toEqual(
      'Email is required'
    );
  });

  it.each([
    undefined,
    null,
    false,
    '',
    {},
    [],
    'test@test.c',
    'test@test.comxxxx',
    'test.com',
    'test@testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest.com',
    '@test.com',
    '!test.com',
    '!@test.com',
    'test@test',
    '.com',
    '.@test.com',
    '*@test.com',
    '+@test.com',
    '$@test.com',
    '£@test.com',
    'test$test',
    'test$test.com',
    'test@.com',
    '!£$%@test.com',
    '+@test.com',
    'test@test.co.',
    'test@test.c',
    'test!@test.com',
    'test*@test.com'
  ])('should fail: %p', (value) => {
    expect(isEmail(value)).toEqual('This is required');
  });

  it.each([
    'test@test.com',
    'testtesttesttesttesttesttesttesttest@test.com',
    '1@test.com',
    'test1@test.com',
    '-@test.com',
    '_@test.com'
  ])('should pass: %p', (value) => {
    expect(isEmail(value)).toBeUndefined();
  });
});
