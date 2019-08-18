import React from 'react';
import PropTypes from 'prop-types';
import * as Animatable from 'react-native-animatable';
import { AreaChart, Grid } from 'react-native-svg-charts';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as shape from 'd3-shape';
import { Colors, LoaderScreen } from 'react-native-ui-lib';
import numeral from 'numeral';

const HistoryChart = ({ currency }) => {
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
        {currency.name}
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
      <Animatable.Text duration={300} easing="ease-out" animation="zoomIn">
        {`Market Cap:${numeral(currency.quote.USD.market_cap).format('$0.00a')}  Supply:${numeral(
          currency.total_supply
        ).format('$0.00a')}  Volume:${numeral(currency.quote.USD.volume_24h).format('$0.00a')}  `}
      </Animatable.Text>
    </Animatable.View>
  );
};

HistoryChart.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  currency: PropTypes.object,
};

HistoryChart.defaultProps = {
  currency: {},
};

export default HistoryChart;
