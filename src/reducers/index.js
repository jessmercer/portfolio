import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import home from './home-reducers';
import projects from './projects-reducers';

const rootReducer = combineReducers({
  projects,
  home,
  routing: routerReducer
});

export default rootReducer;
