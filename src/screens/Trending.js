import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert, Dimensions, StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import { LineChart } from 'react-native-chart-kit';
import * as Animatable from 'react-native-animatable';
import {AnimatableManager, ThemeManager,BorderRadiuses, ListItem, Colors, View, Card, Button, Text, Image, LoaderScreen} from 'react-native-ui-lib'; //eslint-disable-line
import * as appActions from '../reducers/app/actions';
import { data } from './data';
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

class Trending extends Component {
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
    this.props.loadListings();
    console.log('loo');
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
          <ListItem.Part left>
            {/* <Animatable.Image */}
            {/*    source={{uri: row.mediaUrl}} */}
            {/*    style={styles.image} */}
            {/*    {...imageAnimationProps} */}
            {/* /> */}
          </ListItem.Part>
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
      <LineChart
        data={data}
        width={width}
        height={height}
        chartConfig={chartConfig}
        bezier
        style={graphStyle}
      />
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
    const { latestListings, loading,  loadMoreListings, loadListings, loadingMoreListings } = this.props;

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
    loadMoreListings: () => dispatch(listingActions.fetchMoreListings())
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
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Trending);
