/* eslint-disable global-require */
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import thunk from 'redux-thunk';
import { Platform } from 'react-native';
import firebase from 'react-native-firebase';
import * as reducers from './reducers';
import * as appActions from './reducers/app/actions';
import * as socketActions from './reducers/socket/actions';
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
    store.dispatch(socketActions.connectSocket());

    // Initiate Event listeners
    Navigation.events().registerAppLaunchedListener(() => {
      // tracker.trackEvent('lunch', 'appLunched');
      firebase.analytics().logEvent('appLunched', { user: 'timothy' });
      store.subscribe(this.onStoreUpdate.bind(this));
      store.dispatch(appActions.appInitialized());
    });
    // Navigation.events().registerComponentDidAppearListener(
    //   ({ componentName }) => tracker.trackEvent('pageEntry', componentName)
    // );
    // Navigation.events().registerComponentDidDisappearListener(
    //   ({ componentName }) => tracker.trackEvent('pageExit', componentName)
    // );
    // Navigation.events().registerNavigationButtonPressedListener(
    //   ({ buttonId }) => tracker.trackEvent('navigationButtonPressed', buttonId)
    // );
    // Navigation.events().registerBottomTabSelectedListener(
    //   ({ selectedTabIndex, unselectedTabIndex }) =>
    //     tracker.trackEvent(
    //       'navigationBetweenTabs',
    //       `${selectedTabIndex}->${unselectedTabIndex}`
    //     )
    // );
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
  // single with sidemenue
  // root: {
  //   sideMenu: {
  //     left: {
  //       component: {
  //         name: 'example.BottomTabsSideMenu',
  //       },
  //     },

  //     center: {
  //       stack: {
  // }
  // }

  static startApp(root) {
    switch (root) {
      case 'AUTH':
        // tracker.trackEvent('accessLevel', 'guest');
        if (Platform.OS === 'ios') {
          Navigation.setRoot({
            root: {
              stack: {
                id: 'Auth',
                options: {
                  topBar: {
                    visible: false,
                    hideOnScroll: true,
                    buttonColor: 'black',
                  },
                  popGesture: true,
                  statusBar: {
                    visible: true,
                    style: 'light',
                  },
                  layout: {
                    backgroundColor: 'white',
                    orientation: ['portrait' /* , 'landscape' */],
                  },
                },
                children: [
                  {
                    component: {
                      name: 'tlikes.WelcomeScreen',
                      passProps: {
                        str: "This is a prop passed in 'startSingleScreenApp()'!",
                        obj: {
                          str: 'This is a prop passed in an object!',
                          arr: [
                            {
                              str: 'This is a prop in an object in an array in an object!',
                            },
                          ],
                          arr2: [['array of strings', 'with two strings'], [1, 2, 3]],
                        },
                        num: 1234,
                        fn() {
                          return 'Hello from a function!';
                        },
                      },
                    },
                  },
                ],
              },
            },
          });
        } else {
          Navigation.setDefaultOptions({
            topBar: {
              visible: false,
              drawBehind: true,
              background: {
                color: 'white',
              },
              title: {
                color: '#1CABE2',
              },
            },
            statusBar: {
              backgroundColor: '#1CABE2',
              drawBehind: false,
              visible: true,
            },
          });
          Navigation.setRoot({
            root: {
              stack: {
                id: 'Auth',
                children: [
                  {
                    component: {
                      name: 'tlikes.WelcomeScreen',
                      passProps: {
                        str: "This is a prop passed in 'startSingleScreenApp()'!",
                        obj: {
                          str: 'This is a prop passed in an object!',
                          arr: [
                            {
                              str: 'This is a prop in an object in an array in an object!',
                            },
                          ],
                          arr2: [['array of strings', 'with two strings'], [1, 2, 3]],
                        },
                        num: 1234,
                        fn() {
                          return 'Hello from a function!';
                        },
                      },
                    },
                  },
                ],
              },
            },
          });
        }
        return;
      case 'DASHBOARD':
        // tracker.trackEvent('accessLevel', 'user');
        Navigation.setRoot({
          root: {
            sideMenu: {
              left: {
                component: {
                  name: 'tlikes.BottomTabsSideMenu',
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
                              name: 'tlikes.TrendingScreen',
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
                                    text: 'Chat with the Doctor',
                                    fontSize: 20,
                                    color: 'white',
                                  },
                                  background: {
                                    color: '#1CABE2',
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
                              name: 'tlikes.TalentsScreen',
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
                                    color: '#1CABE2',
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
                              name: 'tlikes.ContestsScreen',
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
                                    color: '#1CABE2',
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
