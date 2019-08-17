/* eslint-disable no-undef */
/* eslint-disable func-names */
import * as types from './actionTypes';

import LatestRepo from '../../repositories/latest';

export function receiveMessage(ev, content) {
  console.log(ev, content);
  return { type: ev, content };
}

export function fetchMoreListings() {
  return async function(dispatch, getState) {
    const { limit, skip, loadingMore, latest } = getState().listings;
    if (latest.length >= 99 || loadingMore) {
      return;
    }
    try {
      dispatch({ type: types.FETCH_MORE_LISTINGS });
      const more = await LatestRepo.getLatestListings(skip + limit, limit);
      console.log(skip, limit, more);
      dispatch({ type: types.FETCH_MORE_LISTINGS_SUCCESS, skip: skip + limit, more });
    } catch (e) {
      dispatch({ type: types.FETCH_ALL_LISTINGS_FAILED });
      console.log(e);
    }
  };
}

export function requestLatestListings() {
  return async function(dispatch, getState) {
    try {
      const { limit, skip } = getState().listings;
      const latest = await LatestRepo.getLatestListings(skip, limit);
      dispatch({ type: types.FETCH_ALL_LISTINGS_SUCCESS, latest });
    } catch (e) {
      dispatch({ type: types.FETCH_ALL_LISTINGS_FAILED });
      console.log(e);
    }
  };
}

export function addToFav(cur) {
  return { type: types.ADD_TO_FAVORITES, currency: cur};
}

export function removeFromFav(cur) {
  return { type: types.REMOVE_FROM_FAVORITES, currency: cur};
}
