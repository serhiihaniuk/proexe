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

export const setUser = (payload: User): SetUserAction => ({
  type: USER_ACTIONS.SET_USER,
  payload: payload
});

export const unsetUser = (): UnsetUserAction => ({
  type: USER_ACTIONS.UNSET_USER
});
