import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import { isEqual } from 'lodash';
import createHistory from 'history/createBrowserHistory';
import rootReducer from '../reducer/root';
import { getStateFromLocalStorage, setStateToLocalStorage } from '../helpers/auth-helpers'

export const history = createHistory();

const enhancers = [];
const middleware = [
  thunk,
  routerMiddleware(history)
];

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.devToolsExtension;
  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
)

const persistedState = getStateFromLocalStorage();

const store = createStore(
  rootReducer,
  persistedState,
  composedEnhancers
);

store.subscribe(() => {
  if(store.getState().auth.userSession != null) {
    if(!persistedState) {
      setStateToLocalStorage({
        auth: store.getState().auth,
      });
    }
    else if(!isEqual(persistedState.auth.userSession, store.getState().auth.userSession)) {
      setStateToLocalStorage({
        auth: store.getState().auth,
      });
    }
  }
});

export default store;