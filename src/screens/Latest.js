import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import * as Animatable from 'react-native-animatable';
import {
  ThemeManager,
  BorderRadiuses,
  Colors,
  TextField,
  LoaderScreen,
  View,
  Toast,
} from 'react-native-ui-lib';

import * as appActions from '../reducers/app/actions';
import * as listingActions from '../reducers/listings/actions';
import MarketItem from '../components/MarketItem';
// this is a traditional React component connected to the redux store

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
    const { activeTab } = this.state;
    const { removeFromFav, favorites } = this.props;
    return (
      <MarketItem
        item={item}
        toggleMore={this.toggleMore}
        activeTab={activeTab}
        favorites={favorites}
        removeFromFav={removeFromFav}
        addToFav={this.showAddToFav}
      />
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
