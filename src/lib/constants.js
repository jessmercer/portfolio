export const routes = {
  home: '/',
  project: '/project',
  contact: '/contact'
};

export const prependRequest =
  window.location.hostname === 'localhost'
    ? ''
    : 'https://cors-anywhere.herokuapp.com/';
