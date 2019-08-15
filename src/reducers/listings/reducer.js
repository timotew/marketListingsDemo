import Immutable from 'seamless-immutable';
import * as types from './actionTypes';

const initialState = Immutable({
  latest: {},
  fetchingListings: false,
  listingsLoaded: false,
  loadingMore: false,
  skip: 1,
  limit: 30,
});

export default function app(state = initialState, action = {}) {
  switch (action.type) {
    case types.FETCH_MORE_LISTINGS:
      return state.merge({
        loadingMore: true,
      });
    case types.FETCH_MORE_LISTINGS_SUCCESS:
      return state.merge({
        skip: action.skip,
        loadingMore: false,
        latest: {
          ...state.latest,
          data: state.latest.data.concat(action.more.data),
        },
      });
    case types.FETCH_ALL_LISTINGS:
      return state.merge({
        fetchingListings: true,
        skip: 1,
        limit: 20,
      });
    case types.FETCH_ALL_LISTINGS_SUCCESS:
      return state.merge({
        fetchingListings: false,
        latest: action.latest,
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
