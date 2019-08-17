import { Navigation } from 'react-native-navigation';

import BottomTabsSideMenu from './BottomTabsSideMenu';
import Latest from './Latest';
import Talents from './Talents';
import Contests from './Contests';

// register all screens of the app (including internal ones)
export default function registerScreens(store, Provider) {
  Navigation.registerComponentWithRedux('market.ContestsScreen', () => Contests, Provider, store);

  Navigation.registerComponentWithRedux('market.TalentsScreen', () => Talents, Provider, store);

  Navigation.registerComponentWithRedux('market.LatestScreen', () => Latest, Provider, store);

  Navigation.registerComponentWithRedux(
    'market.BottomTabsSideMenu',
    () => BottomTabsSideMenu,
    Provider,
    store
  );
}
