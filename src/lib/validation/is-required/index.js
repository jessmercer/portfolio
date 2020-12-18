export default (value, errorMessage = 'This is required') =>
  typeof value === 'string' && value ? undefined : errorMessage;
