import { store } from '../index';
import { bindActionCreators } from 'redux';


export const USER_ACTIONS = {
  SET_USER: 'SET_USER',
  UNSET_USER: 'UNSET_USER'
} as const;

type SetUserAction = {
  type: typeof USER_ACTIONS.SET_USER;
  payload: User;
};

type UnsetUserAction = {
  type: typeof USER_ACTIONS.UNSET_USER;
};

export type UserActions = SetUserAction | UnsetUserAction

const setUser = (payload: User): SetUserAction => ({
  type: USER_ACTIONS.SET_USER,
  payload: payload
});

const unsetUser = (): UnsetUserAction => ({
  type: USER_ACTIONS.UNSET_USER
});


export const boundUserActions = bindActionCreators(
  {
    set: setUser,
    unset: unsetUser
  },
  store.dispatch
);
