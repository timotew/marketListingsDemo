import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert, Dimensions, StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { StockLine } from 'react-native-pathjs-charts';
import { Navigation } from 'react-native-navigation';
import * as Animatable from 'react-native-animatable';
import {AnimatableManager, ThemeManager,BorderRadiuses, ListItem, Colors, Card, Button, Image, LoaderScreen, View, Text} from 'react-native-ui-lib'; //eslint-disable-line

import * as appActions from '../reducers/app/actions';
import { stockData } from './data';
import * as listingActions from '../reducers/listings/actions';
// this is a traditional React component connected to the redux store

const chartConfig = {
  // backgroundColor: '#022173',
  backgroundGradientFrom: '#022173',
  backgroundGradientTo: '#1b3fa0',
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16,
  },
};
// {
//     backgroundColor: '#0091EA',
//     backgroundGradientFrom: '#0091EA',
//     backgroundGradientTo: '#0091EA',
//     color: (opacity = 1) => `rgba(${255}, ${255}, ${255}, ${opacity})`
//   }
const { width } = Dimensions.get('window');
const height = 220;
const animationProps = AnimatableManager.presets.fadeInRight;
const imageAnimationProps = AnimatableManager.getRandomDelay();

const graphStyle = {
  marginVertical: 8,
  ...chartConfig.style,
};

const options = {
  width: 250,
  height: 250,
  color: '#2980B9',
  margin: {
    top: 10,
    left: 35,
    bottom: 30,
    right: 10,
  },
  animate: {
    type: 'delayed',
    duration: 200,
  },
  axisX: {
    showAxis: true,
    showLines: true,
    showLabels: true,
    showTicks: true,
    zeroAxis: false,
    orient: 'bottom',
    tickValues: [],
    label: {
      fontFamily: 'Arial',
      fontSize: 8,
      fontWeight: true,
      fill: '#34495E',
    },
  },
  axisY: {
    showAxis: true,
    showLines: true,
    showLabels: true,
    showTicks: true,
    zeroAxis: false,
    orient: 'left',
    tickValues: [],
    label: {
      fontFamily: 'Arial',
      fontSize: 8,
      fontWeight: true,
      fill: '#34495E',
    },
  },
  interaction: true,
  cursorLine: {
    stroke: 'white',
    strokeWidth: 2,
  },
};

class Trending extends Component {
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
    this.props.loadListings();
    console.log('loo');
    this.state = {};
  }

  componentWillMount() {
    this._panHandlerStart = this._panHandlerStart.bind(this);
    this._panHandlerMove = this._panHandlerStart.bind(this);
    this._panHandlerEnd = this._panHandlerEnd.bind(this);
  }

  static navigationOptions = ({ navigation }) => ({
    title: `StockLine - Gesture`,
  });

  _panHandlerStart(cursorPositionX) {
    this.setState({
      selectedDataPointPosition: String(Math.floor(cursorPositionX * (stockData[0].length - 1))),
    });
  }

  _panHandlerMove(cursorPositionX) {
    this.setState({
      selectedDataPointPosition: String(Math.floor(cursorPositionX * (stockData[0].length - 1))),
    });
  }

  _panHandlerEnd(cursorPositionX) {
    this.setState({
      selectedDataPointPosition: '',
    });
  }

  navigationButtonPressed({ buttonId }) {
    const { menuOpened, toggleMenu, componentId } = this.props;
    if (buttonId === 'menu') {
      toggleMenu();
      Navigation.mergeOptions(componentId, {
        sideMenu: {
          left: {
            visible: !menuOpened,
          },
        },
      });
    }
  }

  renderItem = ({ item }) => {
    const statusColor = item.cmc_rank > 5 ? Colors.green30 : Colors.red30;

    return (
      <Animatable.View {...animationProps}>
        <ListItem
          activeBackgroundColor={Colors.dark60}
          activeOpacity={0.3}
          height={77.5}
          onPress={() => Alert.alert(`pressed on order #${item.id + 1}`)}
        >
          <ListItem.Part middle column containerStyle={[styles.border, { paddingRight: 17 }]}>
            <ListItem.Part containerStyle={{ marginBottom: 3 }}>
              <Text dark10 text70 style={{ flex: 1, marginRight: 10 }} numberOfLines={1}>
                {item.name}
              </Text>
              <Text dark10 text70 style={{ marginTop: 2 }}>
                {item.circulating_supply}
              </Text>
            </ListItem.Part>
            <ListItem.Part>
              <Text style={{ flex: 1, marginRight: 10 }} text90 dark40 numberOfLines={1}>{`${
                item.num_market_pairs
              } pairs`}</Text>
              <Text text90 color={statusColor} numberOfLines={1}>
                {item.symbol}
              </Text>
            </ListItem.Part>
          </ListItem.Part>
        </ListItem>
      </Animatable.View>
    );
  };

  renderHeader = () => {
    return (
      <View style={styles.scontainer}>

        <Card row  style={{marginBottom: 5, marginTop: 5}} onPress={() => {}} enableBlur>

          <View padding-20 flex>
            <StockLine
                panHandlerStart={this._panHandlerStart}
                panHandlerMove={this._panHandlerMove}
                panHandlerEnd={this._panHandlerEnd}
                data={stockData}
                options={options}
                xKey="x"
                yKey="y"
            />
          </View>
        </Card>
      </View>
    );
  };

  keyExtractor = item => {
    return `${item.symbol}`;
  };

  noData = () => {
    return (
      <View style={styles.noContentView}>
        {/* <Icon size={100} name="gear" color="white" /> */}
      </View>
    );
  };

  render() {
    const {
      latestListings,
      loading,
      loadMoreListings,
      loadListings,
      loadingMoreListings,
    } = this.props;

    if (loading) {
      return (
        <Animatable.View animatio="fadeOut">
          <LoaderScreen color={Colors.blue30} message="Loading..." overlay />
        </Animatable.View>
      );
    }
    return (
      <FlatList
        data={latestListings.data}
        onRefresh={loadListings}
        refreshing={loadingMoreListings}
        ListEmptyComponent={this.noData}
        ListHeaderComponent={this.renderHeader}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
        enableEmptySections
        onEndReached={loadMoreListings}
        onEndReachedThreshold={0.8}
      />
    );
  }
}

// which props do we want to inject, given the global state?
function mapStateToProps(state) {
  return {
    menuOpened: state.app.menuOpened,
    latestListings: state.listings.latest,
    loading: state.listings.fetchingListings,
    loadingMoreListings: state.listings.loadingMore,
    loaded: state.listings.listingsLoaded,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    toggleMenu: () => dispatch(appActions.toggleMenu()),
    loadListings: () => dispatch(listingActions.requestLatestListings()),
    loadMoreListings: () => dispatch(listingActions.fetchMoreListings()),
  };
};
Trending.propTypes = {
  menuOpened: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  latestListings: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  componentId: PropTypes.string.isRequired,
};
// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#3c0e65',
//     ...Platform.select({
//       ios: {
//         paddingTop: 64,
//       },
//     }),
//   },
//   progressBar: {
//     backgroundColor: '#3c0e65',
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   listHeading: {
//     paddingHorizontal: 16,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 15,
//     marginTop: 30,
//   },
//   listHeadingLeft: {
//     color: 'white',
//     fontWeight: 'bold',
//     fontSize: 18,
//   },
//   listHeadingRight: {
//     color: 'white',
//     ...Platform.select({
//       ios: {
//         fontSize: 15,
//       },
//       android: {
//         fontSize: 16,
//       },
//     }),
//   },
//   browseList: {
//     marginTop: 30,
//     paddingHorizontal: 16,
//     ...Platform.select({
//       ios: {
//         marginBottom: 60,
//       },
//       android: {
//         marginBottom: 30,
//       },
//     }),
//   },
//   browseListItem: {
//     ...Platform.select({
//       ios: {
//         paddingVertical: 8,
//       },
//       android: {
//         paddingVertical: 10,
//       },
//     }),
//     flexDirection: 'row',
//   },
//   browseListItemText: {
//     flex: 1,
//     color: 'white',
//     paddingLeft: 10,
//     ...Platform.select({
//       ios: {
//         fontSize: 15,
//         fontWeight: '500',
//       },
//       android: {
//         fontSize: 16,
//         fontWeight: '100',
//       },
//     }),
//   },
// });
const styles = StyleSheet.create({
  image: {
    width: 54,
    height: 54,
    borderRadius: BorderRadiuses.br20,
    marginHorizontal: 14,
  },
  border: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: ThemeManager.dividerColor,
  },
  scontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Trending);
