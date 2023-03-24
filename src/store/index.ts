import { bindActionCreators, createStore } from 'redux';
import { rootReducer } from './reducers';
import { setUser, unsetUser } from './actions/userActions';

export const store = createStore(rootReducer);


export const boundUserActions = bindActionCreators(
  {
    set: setUser,
    unset: unsetUser
  },
  store.dispatch
);
