/* eslint-disable no-undef */
/* eslint-disable func-names */
import Config from 'react-native-config';
// import * as types from './actionTypes';

let ws;

export function receiveMessage(ev, content) {
  console.log(ev, content);
  return { type: ev, content };
}

export function connectSocket(cb) {
  return async function(dispatch) {
    ws = new WebSocket(Config.SOCKET_URL);
    ws.onopen = () => {
      // connection opened
      // TODO: move to login
      ws.send('login|timothy'); // send a message
      if (cb) cb();
    };
    ws.onerror = e => {
      // an error occurred
      console.log(e.message);
    };

    ws.onclose = e => {
      // connection closed
      console.log(e.code, e.reason);
    };
    ws.onmessage = m => {
      // a message was received
      const data = m.data.split('|');
      const event = data.shift();
      const content = data.pop();
      dispatch(receiveMessage(event, content));
    };
  };
}

export function sendMessage(ev, content) {
  return async function(dispatch) {
    if (ws.readyState === 1) {
      const m = typeof content === 'string' ? content : JSON.stringify(content);
      ws.send(`${ev}|${m}`);
    } else if (ws.readyState !== 0) {
      dispatch(connectSocket(() => sendMessage(ev, content)));
    }
  };
}
