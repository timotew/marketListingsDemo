import Immutable from 'seamless-immutable';
import * as types from './actionTypes';

const initialState = Immutable({
  latest: [],
  fetchingListings: false,
  listingLoaded: false,
});

export default function app(state = initialState, action = {}) {
  switch (action.type) {
    case types.FETCH_ALL_LISTINGS:
      return state.merge({
        fetchingListings: true,
      });
    case types.FETCH_ALL_LISTINGS_SUCCESS:
      return state.merge({
        fetchingListings: false,
        listings: action.listings,
        listingsLoaded: true,
      });
    case types.FETCH_ALL_LISTINGS_FAILED:
      return state.merge({
        fetchingListings: false,
        listingsLoaded: false,
      });

    default:
      return state;
  }
}
