import { Navigation } from 'react-native-navigation';

import WelcomeScreen from './auth/WelcomeScreen';
import LoginScreen from './auth/LoginScreen';
import SignUpScreen from './auth/SignUpScreen';
import BottomTabsSideMenu from './BottomTabsSideMenu';
import Trending from './Trending';
import Talents from './Talents';
import Contests from './Contests';

// register all screens of the app (including internal ones)
export default function registerScreens(store, Provider) {
  Navigation.registerComponentWithRedux(
    'market.WelcomeScreen',
    () => WelcomeScreen,
    Provider,
    store
  );

  Navigation.registerComponentWithRedux('market.ContestsScreen', () => Contests, Provider, store);

  Navigation.registerComponentWithRedux('market.TalentsScreen', () => Talents, Provider, store);

  Navigation.registerComponentWithRedux('market.TrendingScreen', () => Trending, Provider, store);

  Navigation.registerComponentWithRedux('market.SignUpScreen', () => SignUpScreen, Provider, store);

  Navigation.registerComponentWithRedux('market.LoginScreen', () => LoginScreen, Provider, store);

  Navigation.registerComponentWithRedux(
    'market.BottomTabsSideMenu',
    () => BottomTabsSideMenu,
    Provider,
    store
  );
}
