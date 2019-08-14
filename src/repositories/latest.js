import Request, { REQUEST_METHOD_GET } from '../utils/request';
// import { AddItem, RemoveItem, GetItem } from '../utils/cache';

const getLatestListings = () => {
  return Request(`/listings/latest`, REQUEST_METHOD_GET);
};

export default {
  getLatestListings,
};
