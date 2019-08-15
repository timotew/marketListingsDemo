import Request, { REQUEST_METHOD_GET } from '../utils/request';
// import { AddItem, RemoveItem, GetItem } from '../utils/cache';

const getLatestListings = (skip, limit) => {
  return Request(`/listings/latest?start=${skip}&limit=${limit}`, REQUEST_METHOD_GET);
};

export default {
  getLatestListings,
};
