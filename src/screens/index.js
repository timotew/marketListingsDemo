import { Navigation } from 'react-native-navigation';

import BottomTabsSideMenu from './BottomTabsSideMenu';
import Latest from './Latest';
import History from './History';

// register all screens of the app (including internal ones)
export default function registerScreens(store, Provider) {
  Navigation.registerComponentWithRedux('market.HistoryScreen', () => History, Provider, store);

  Navigation.registerComponentWithRedux('market.LatestScreen', () => Latest, Provider, store);

  Navigation.registerComponentWithRedux(
    'market.BottomTabsSideMenu',
    () => BottomTabsSideMenu,
    Provider,
    store
  );
}
