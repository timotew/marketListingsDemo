import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import * as Animatable from 'react-native-animatable';
import numeral from 'numeral';
import {
  ListItem,
  Colors,
  Text,
  AnimatableManager,
  ThemeManager,
  BorderRadiuses,
} from 'react-native-ui-lib';
import VectorIco from 'react-native-vector-icons/dist/FontAwesome';
import HistoryChart from './HistoryChart';

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

const animationProps = AnimatableManager.presets.fadeInRight;
const imageAnimationProps = AnimatableManager.getRandomDelay();

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

const MarketItem = ({ item, toggleMore, addToFav, removeFromFav, favorites, activeTab }) => {
  const isActiveTab = activeTab === item.symbol;
  const statusColor = item.quote.USD.percent_change_24h > 0 ? Colors.green30 : Colors.red30;
  const Progress = item.quote.USD.percent_change_24h > 0 ? upIcon : downIcon;
  const infav = typeof favorites.find(e => e === item.symbol) !== 'undefined';
  const Favicon = infav ? FavStar(removeFromFav(item)) : Star(addToFav(item));
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
        onPress={toggleMore(item)}
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
      {isActiveTab && <HistoryChart currency={item} />}
    </Animatable.View>
  );
};

MarketItem.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  item: PropTypes.object.isRequired,
  toggleMore: PropTypes.func,
  addToFav: PropTypes.func,
  removeFromFav: PropTypes.func,
  favorites: PropTypes.arrayOf(PropTypes.object),
  activeTab: PropTypes.string,
};

MarketItem.defaultProps = {
  activeTab: '',
  favorites: [],
  removeFromFav: null,
  addToFav: null,
  toggleMore: null,
};

export default MarketItem;
