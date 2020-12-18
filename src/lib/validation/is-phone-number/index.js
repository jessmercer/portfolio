// export default (value, errorMessage = 'This is required') =>
//   typeof value === 'number' && value ? undefined : errorMessage;
export default (value, errorMessage = 'This is required') => {
  const regexp = /^(((\+44\s?\d{4}|\(?0\d{4}\)?)\s?\d{3}\s?\d{3})|((\+44\s?\d{3}|\(?0\d{3}\)?)\s?\d{3}\s?\d{4})|((\+44\s?\d{2}|\(?0\d{2}\)?)\s?\d{4}\s?\d{4}))(\s?#(\d{4}|\d{3}))?$/;
  return regexp.test(value) ? undefined : errorMessage;
};