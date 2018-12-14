import { combineReducers } from 'redux';

import auth from './auth';
import uptime from './uptime';

const rootReducer = combineReducers({
  auth: auth,
  uptime: uptime
});

export default rootReducer;