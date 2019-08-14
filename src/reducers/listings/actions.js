/* eslint-disable no-undef */
/* eslint-disable func-names */
import * as types from './actionTypes';

import LatestRepo from '../../repositories/latest';

export function receiveMessage(ev, content) {
  console.log(ev, content);
  return { type: ev, content };
}

export function requestLatestListings() {
  return async function(dispatch) {
    try {
      const latest = await LatestRepo.getLatestListings();
      dispatch({ type: types.FETCH_ALL_LISTINGS_SUCCESS, latest });
    } catch (e) {
      dispatch({ type: types.FETCH_ALL_LISTINGS_FAILED });
      console.log(e);
    }
  };
}
