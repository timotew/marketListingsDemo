import Immutable from 'seamless-immutable';
import { GiftedChat } from 'react-native-gifted-chat';
import * as types from './actionTypes';

const initialState = Immutable({
  messages: [
    {
      _id: 1,
      text: "Hello I'm Mo, How can i help you today?",
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'Mo',
        avatar: 'https://placeimg.com/140/140/any',
      },
    },
  ],
});

export default function mike(state = initialState, action = {}) {
  switch (action.type) {
    case types.SEND_MESSAGE:
      // TODO: push message to messages
      return state.set('messages', Immutable(action.messages));
    case types.RECEIVE_MESSAGE:
      // eslint-disable-next-line no-case-declarations
      try {
        console.log(action.content);
        const m = JSON.parse(action.content);

        return state.set(
          'messages',
          GiftedChat.append(
            state.messages,
            m.reverse().map(ms => ({
              text: ms.fulfillmentMessage.pop(),
              createdAt: new Date(),
              _id: `${Math.random()}`,
              user: { _id: 2, name: 'Mo', avatar: 'https://placeimg.com/140/140/any' },
            }))
          )
        );
      } catch (e) {
        console.log(e, action.content);
        return state;
      }
    default:
      return state;
  }
}
