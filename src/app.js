/* eslint-disable global-require */
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import thunk from 'redux-thunk';

import * as reducers from './reducers';
import * as appActions from './reducers/app/actions';
import * as listingActions from './reducers/listings/actions';
import getDefaultNavigationStyle from './theme';
import registerScreens from './screens';
// import Config from 'react-native-config';

// redux related book keeping
const createStoreWithMiddleware = applyMiddleware(thunk.withExtraArgument({}))(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

// screen related book keeping
registerScreens(store, Provider);

// notice that this is just a simple class, it's not a React component
export default class App {
  constructor() {
    // since react-redux only works on components, we need to subscribe this class manually

    // new socket message
    store.dispatch(listingActions.requestLatestListings());

    // Initiate Event listeners
    Navigation.events().registerAppLaunchedListener(() => {
      // tracker.trackEvent('lunch', 'appLunched');
      store.subscribe(this.onStoreUpdate.bind(this));
      store.dispatch(appActions.appInitialized());
    });
  }

  onStoreUpdate() {
    const { root } = store.getState().app;
    // handle a root change
    // if your app doesn't change roots in runtime, you can remove onStoreUpdate() altogether
    if (this.currentRoot !== root) {
      this.currentRoot = root;
      App.startApp(root);
    }
  }


  static startApp(root) {
    switch (root) {
      case 'DASHBOARD':
        Navigation.setRoot({
          root: {
            sideMenu: {
              left: {
                component: {
                  name: 'market.BottomTabsSideMenu',
                },
              },
              center: {
                bottomTabs: {
                  id: 'Dashboard',
                  options: {
                    bottomTabs: {
                      titleDisplayMode: 'alwaysShow',
                      barStyle: 'black',
                      translucent: true,
                      hideShadow: false,
                    },
                    popGesture: true,
                    statusBar: {
                      visible: true,
                      style: 'light',
                    },
                    topBar: {
                      visible: true,
                      hideOnScroll: false,
                      buttonColor: 'white',
                      drawBehind: true,
                    },
                    layout: {
                      orientation: ['portrait' /* , 'landscape' */],
                      // topMargin: Navigation.constants().statusBarHeight,
                    },
                  },
                  children: [
                    {
                      stack: {
                        children: [
                          {
                            component: {
                              name: 'market.TrendingScreen',
                              options: {
                                statusBar: {
                                  visible: true,
                                  style: 'dark',
                                },
                                popGesture: true,
                                topBar: {
                                  visible: true,
                                  buttonColor: 'white',
                                  hideOnScroll: true,
                                  title: {
                                    text: 'Latest listings',
                                    fontSize: 20,
                                    color: '#524E53',
                                  },
                                  background: {
                                    color: '#E1EBF8',
                                  },

                                  rightButtons: [
                                    {
                                      icon: require('./img/tlogo.png'),
                                      id: 'tlogo',
                                      color: 'white',
                                    },
                                  ],
                                  leftButtons: [
                                    {
                                      icon: require('./img/men.png'),
                                      id: 'menu',
                                      color: '#524E53',
                                    },
                                  ],
                                },
                                bottomTab: {
                                  fontSize: 12,
                                  badge: 'New',
                                  text: 'Trending',
                                  icon: require('./img/trending.png'),
                                  selectedIcon: require('./img/trending_selected.png'),
                                },
                              },
                            },
                          },
                        ],
                      },
                    },
                    {
                      stack: {
                        children: [
                          {
                            component: {
                              name: 'market.TalentsScreen',
                              options: {
                                statusBar: {
                                  visible: true,
                                  style: 'light',
                                },
                                popGesture: true,
                                topBar: {
                                  visible: true,
                                  buttonColor: 'white',
                                  hideOnScroll: true,
                                  title: {
                                    text: 'Disco',
                                    fontSize: 20,
                                    color: 'white',
                                  },
                                  background: {
                                    color: '#E1EBF8',
                                  },
                                  rightButtons: [
                                    {
                                      icon: require('./img/tlogo.png'),
                                      id: 'tlogo',
                                      color: 'white',
                                    },
                                  ],
                                  leftButtons: [
                                    {
                                      icon: require('./img/men.png'),
                                      id: 'menu',
                                      color: 'white',
                                    },
                                  ],
                                },
                                bottomTab: {
                                  fontSize: 12,
                                  text: 'Discover',
                                  icon: require('./img/discover.png'),
                                  selectedIcon: require('./img/discover_selected.png'),
                                },
                              },
                            },
                          },
                        ],
                      },
                    },
                    {
                      stack: {
                        children: [
                          {
                            component: {
                              name: 'market.ContestsScreen',
                              options: {
                                statusBar: {
                                  visible: true,
                                  style: 'light',
                                },
                                popGesture: true,
                                topBar: {
                                  visible: true,
                                  buttonColor: 'white',
                                  hideOnScroll: true,
                                  title: {
                                    text: 'Compete With the Best of Bests',
                                    fontSize: 20,
                                    color: 'white',
                                  },
                                  background: {
                                    color: '#E1EBF8',
                                  },
                                  rightButtons: [
                                    {
                                      icon: require('./img/tlogo.png'),
                                      id: 'tlogo',
                                      color: 'white',
                                    },
                                  ],
                                  leftButtons: [
                                    {
                                      icon: require('./img/men.png'),
                                      id: 'menu',
                                      color: 'white',
                                    },
                                  ],
                                },
                                bottomTab: {
                                  fontSize: 12,
                                  text: 'Contests',
                                  icon: require('./img/contest.png'),
                                  selectedIcon: require('./img/contest_selected.png'),
                                },
                              },
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            },
          },
        });
        return;
      default:
        console.error('Unknown app root');
    }
  }
}
