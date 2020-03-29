import React from 'react';
import ReactDOM from 'react-dom';
import App from '.';

it('renders the app', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});
