import * as types from './actionTypes';
/* eslint-disable func-names */

export function changeAppRoot(root) {
  return { type: types.ROOT_CHANGED, root };
}

export function appInitialized() {
  return async function(dispatch) {
    // since all business logic should be inside redux actions
    // this is a good place to put your app initialization code
    dispatch(changeAppRoot('AUTH'));
  };
}

export function toggleMenu() {
  return { type: types.MENU_TOGGLED };
}

// export function updateUser(fields) {
//   return { type: types.ACCOUNT_UPDATE_USER, fields };
// }

export function login() {
  return async function(dispatch) {
    // login logic would go here, and when it's done, we switch app roots
    dispatch(changeAppRoot('DASHBOARD'));
  };
}
