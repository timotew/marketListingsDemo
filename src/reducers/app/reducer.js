import Immutable from 'seamless-immutable';
import * as types from './actionTypes';

const initialState = Immutable({
  root: undefined, // 'login' / 'after-login'
  menuOpened: false,
  user: { username: '', password: '' },
});

export default function app(state = initialState, action = {}) {
  switch (action.type) {
    case types.ROOT_CHANGED:
      return state.merge({
        root: action.root,
      });
    case types.MENU_TOGGLED:
      return state.merge({
        menuOpened: !state.menuOpened,
      });
    case types.UPDATE_USER:
      return state.merge({
        user: { ...state.user, ...action.fields },
      });
    default:
      return state;
  }
}
