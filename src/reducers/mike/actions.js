import { GiftedChat } from 'react-native-gifted-chat';
import * as types from './actionTypes';
import * as socketActions from '../socket/actions';
/* eslint-disable func-names */
// eslint-disable-next-line import/prefer-default-export
export function sendMessages(messages) {
  return async function(dispatch, getState, { ws }) {
    // TODO: call ws send message here
    dispatch(socketActions.sendMessage('chat', { messages }));
    const { mike } = getState();
    dispatch({
      type: types.SEND_MESSAGE,
      ws,
      messages: GiftedChat.append(mike.messages, messages),
    });
  };
}

// export function respond(ev, content) {
//   // TODO: send the message to the right type
//   // maybe send event type to go so it can send it back'
//   return async function(dispatch, getState, { ws }) {
//     const { mike } = getState();
//     const msg = {
//       text: content,
//       createdAt: new Date(),
//       user: {
//         _id: 2,
//         name: 'React Native',
//         avatar: 'https://placeimg.com/140/140/any',
//       },
//       _id: `${Math.random()}`,
//     };
//     dispatch({
//       type: types.RECEIVE_MESSAGE,
//       ev,
//       messages: GiftedChat.append(mike.messages, [msg]),
//     });
//   };
// }
