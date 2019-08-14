import { NetInfo } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import Config from 'react-native-config';

export const REQUEST_METHOD_POST = 'POST';
export const REQUEST_METHOD_GET = 'GET';
export const REQUEST_METHOD_PUT = 'PUT';
export const REQUEST_METHOD_DELETE = 'DELETE';

const Request = async (path, method, payload) => {
  if (NetInfo.ConnectionType === 'none') {
    return { error: true, message: 'Please connect to the internet.' };
  }
  let body = [];
  if (
    [REQUEST_METHOD_DELETE, REQUEST_METHOD_POST, REQUEST_METHOD_PUT].includes(method) &&
    typeof payload === 'object' &&
    !Array.isArray(payload)
  ) {
    for (const [key, value] of Object.entries(payload)) {
      body.push({
        name: key,
        data: typeof value === 'number' ? `${value}` : value,
      });
    }
  } else {
    body = payload;
  }
  if (
    ![REQUEST_METHOD_DELETE, REQUEST_METHOD_POST, REQUEST_METHOD_PUT, REQUEST_METHOD_GET].includes(
      method
    )
  ) {
    console.log('Invalid Request Method');
    return `Invalid Request Method ${method}`;
  }

  try {
    const response = await RNFetchBlob.fetch(
      method,
      Config.SERVER_URL + path,
      {
        'X-CMC_PRO_API_KEY': Config.API_KEY,
        'Content-Type': 'multipart/form-data',
      },
      body
    );
    if (response.respInfo.status === 200) {
      return await response.json();
    }
    console.log('Error in response', path, response.text());
    throw Error(`Invalid server response for route ${path}.`);
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export default Request;

export function updateToken(token) {
  requestToken = token;
}
