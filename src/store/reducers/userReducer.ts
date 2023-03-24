import { USER_ACTIONS, UserActions } from '../actions/userActions';

type userReducerState = {
  selectedUser?: User;
};

const initialState: userReducerState = {};

export const userReducer = (state = initialState, action: UserActions) => {
  switch (action.type) {
    case USER_ACTIONS?.UNSET_USER:
      return initialState;
    case USER_ACTIONS?.SET_USER:
      return { selectedUser: action.payload };
    default:
      return state;
  }
};
