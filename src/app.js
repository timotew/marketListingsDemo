/* eslint-disable global-require */
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import thunk from 'redux-thunk';

import * as reducers from './reducers';
import * as appActions from './reducers/app/actions';
import * as listingActions from './reducers/listings/actions';
import registerScreens from './screens';

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
                      barStyle: 'default',
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
                              name: 'market.LatestScreen',
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
                                    text: 'Market Latest',
                                    fontSize: 20,
                                    color: '#FAFAFA',
                                  },
                                  background: {
                                    color: '#1C2053',
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
                                  badge: 'New',
                                  text: 'Market',
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
                              name: 'market.HistoryScreen',
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
                                    text: 'Favorite History',
                                    fontSize: 20,
                                    color: 'white',
                                  },
                                  background: {
                                    color: '#1C2053',
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
                                  text: 'History',
                                  icon: require('./img/discover.png'),
                                  selectedIcon: require('./img/discover_selected.png'),
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
