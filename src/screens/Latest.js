import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import * as Animatable from 'react-native-animatable';
import { AreaChart, Grid } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import {
  AnimatableManager,
  ThemeManager,
  BorderRadiuses,
  ListItem,
  Colors,
  TextField,
  LoaderScreen,
  View,
  Text,
  Toast,
} from 'react-native-ui-lib';
import VectorIco from 'react-native-vector-icons/dist/FontAwesome';
import numeral from 'numeral';

import * as appActions from '../reducers/app/actions';
import * as listingActions from '../reducers/listings/actions';
// this is a traditional React component connected to the redux store

const animationProps = AnimatableManager.presets.fadeInRight;
const imageAnimationProps = AnimatableManager.getRandomDelay();

const icos = require(`../img/icons/ico`);
const defaultIcon = require(`../img/icons/coin.png`);
const upIcon = <VectorIco name="angle-up" size={20} color={Colors.green30} />;
const downIcon = <VectorIco name="angle-down" size={20} color={Colors.red30} />;
const FavStar = action => (
  <VectorIco
    middle
    name="star"
    size={20}
    color={Colors.green30}
    onPress={action}
    style={{ marginRight: 8 }}
  />
);
const Star = action => (
  <VectorIco
    middle
    name="star-o"
    size={20}
    onPress={action}
    color={Colors.green30}
    style={{ marginRight: 8 }}
  />
);

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

class Latest extends Component {
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
    this.state = { filtered: [], toastVisible: false, activeTab: '' };
    const { loadListings } = this.props;
    loadListings();
  }

  dismissToast = () => this.setState({ toastVisible: false });

  showAddToFav = cur => () => {
    const { addToFav, removeFromFav } = this.props;
    addToFav(cur)();
    const action = [{ label: 'Undo', backgroundColor: Colors.red40, onPress: removeFromFav(cur) }];
    let { toastVisible } = this.state;
    toastVisible = true || toastVisible;
    return (
      <Toast
        visible={toastVisible}
        position="top"
        backgroundColor={Colors.green30}
        message={`${cur.name} added to favorites`}
        onDismiss={this.dismissToast}
        allowDismiss
        actions={action}
      />
    );
  };

  toggleMore = cur => () => {
    const { activeTab } = this.state;
    this.setState({ activeTab: cur.symbol === activeTab ? '' : cur.symbol });
  };

  renderItem = ({ item }) => {
    const { removeFromFav, favorites } = this.props;
    const { activeTab } = this.state;
    const isActiveTab = activeTab === item.symbol;
    const statusColor = item.quote.USD.percent_change_24h > 0 ? Colors.green30 : Colors.red30;
    const Progress = item.quote.USD.percent_change_24h > 0 ? upIcon : downIcon;
    const infav = typeof favorites.find(e => e === item.symbol) !== 'undefined';
    const Favicon = infav ? FavStar(removeFromFav(item)) : Star(this.showAddToFav(item));
    let icon = icos[item.symbol.toLowerCase()];
    if (typeof icon === 'undefined') {
      icon = defaultIcon;
    }
    return (
      <Animatable.View {...animationProps}>
        <ListItem
          activeBackgroundColor={Colors.dark60}
          activeOpacity={0.3}
          height={77.5}
          onPress={this.toggleMore(item)}
        >
          <ListItem.Part left>
            <Animatable.Image source={icon} style={styles.image} {...imageAnimationProps} />
          </ListItem.Part>
          <ListItem.Part middle column containerStyle={[styles.border, { paddingRight: 17 }]}>
            <ListItem.Part containerStyle={{ marginBottom: 3 }}>
              <Text dark10 text70 style={{ flex: 1, marginRight: 10 }} numberOfLines={1}>
                {item.name}
              </Text>
              {Favicon}
              <Text dark10 text70 style={{ marginTop: 2 }}>
                {`${numeral(item.quote.USD.price).format('$0,0.00')}`}
              </Text>
            </ListItem.Part>
            <ListItem.Part>
              <Text
                style={{ flex: 1, marginRight: 10 }}
                text90
                dark40
                numberOfLines={1}
              >{`Cap:${numeral(item.quote.USD.market_cap).format('$0.00a')} | supply:${numeral(
                item.total_supply
              ).format('$0.00a')} | vol:${numeral(item.quote.USD.volume_24h).format(
                '$0.00a'
              )}  `}</Text>
              <Text text90 color={statusColor} numberOfLines={1}>
                {Progress} {`${numeral(item.quote.USD.percent_change_24h).format('0%')} 24h`}
              </Text>
            </ListItem.Part>
          </ListItem.Part>
        </ListItem>
        {isActiveTab && this.moreInfo(item)}
      </Animatable.View>
    );
  };

  moreInfo = cur => {
    // FIXME: free API KEY don't have access to historical data
    const loadingHistory = false;
    const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80];
    return (
      <Animatable.View
        duration={300}
        transition="backgroundColor"
        style={{ backgroundColor: 'rgba(245,252,255,1)', margin: 5 }}
      >
        {loadingHistory && <LoaderScreen color={Colors.blue30} message="Loading..." overlay />}
        <Animatable.Text duration={300} easing="ease-out" animation="zoomIn">
          {cur.name}
        </Animatable.Text>
        <AreaChart
          style={{ height: 200 }}
          data={data}
          contentInset={{ top: 30, bottom: 30 }}
          curve={shape.curveNatural}
          svg={{ fill: '#8800cc' }}
        >
          <Grid />
        </AreaChart>
      </Animatable.View>
    );
  };

  search = txt => {
    const pattern = new RegExp(txt, 'i');
    const {
      latestListings: { data },
    } = this.props;
    const filtered = data.filter(cur => {
      return cur.name.search(pattern) !== -1 || cur.symbol.search(pattern) !== -1;
    });

    this.setState({ filtered });
  };

  renderHeader = () => {
    return (
      <TextField
        text70
        containerStyle={{ backgroundColor: Colors.white }}
        floatingPlaceholder
        placeholder="Search..."
        onChangeText={this.search}
        floatOnFocus
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

  render() {
    const {
      latestListings,
      loading,
      loadMoreListings,
      loadListings,
      loadingMoreListings,
      favorites,
    } = this.props;
    const { filtered, activeTab } = this.state;
    if (loading) {
      return (
        <Animatable.View animatio="fadeOut">
          <LoaderScreen color={Colors.blue30} message="Loading..." overlay />
        </Animatable.View>
      );
    }
    const source = filtered.length > 0 ? filtered : latestListings.data;
    return (
      <FlatList
        data={source}
        onRefresh={loadListings}
        refreshing={loadingMoreListings}
        ListEmptyComponent={this.noData}
        ListHeaderComponent={this.renderHeader}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
        extraData={{ favorites, activeTab }}
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
    favorites: state.listings.favorites,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    toggleMenu: () => dispatch(appActions.toggleMenu()),
    loadListings: () => dispatch(listingActions.requestLatestListings()),
    loadMoreListings: () => dispatch(listingActions.fetchMoreListings()),
    addToFav: cur => () => dispatch(listingActions.addToFav(cur)),
    removeFromFav: cur => () => dispatch(listingActions.removeFromFav(cur)),
  };
};

Latest.propTypes = {
  menuOpened: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  latestListings: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  componentId: PropTypes.string.isRequired,
  loadMoreListings: PropTypes.func.isRequired,
  loadListings: PropTypes.func.isRequired,
  loadingMoreListings: PropTypes.bool.isRequired,
  favorites: PropTypes.arrayOf(PropTypes.string).isRequired,
  addToFav: PropTypes.func.isRequired,
  removeFromFav: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Latest);
