import { AsyncStorage } from 'react-native';

const APP_NAME = 'com.market';

const AddItem = async (item, name) => {
  const save = typeof item === 'string' ? item : JSON.stringify(item);
  return AsyncStorage.setItem(`@${APP_NAME}:${name}`, save);
};

const RemoveItem = async name => AsyncStorage.removeItem(`@${APP_NAME}:${name}`);
const GetItem = async name => {
  const value = await AsyncStorage.getItem(`@${APP_NAME}:${name}`);
  try {
    return await JSON.parse(value);
  } catch (e) {
    return value;
  }
};

export default { AddItem, RemoveItem, GetItem };
