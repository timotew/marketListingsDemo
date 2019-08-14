import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, Dimensions, Text } from 'react-native';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import { LineChart, BarChart } from 'react-native-chart-kit';
import * as appActions from '../reducers/app/actions';
import { data } from './data';
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

class Trending extends Component {
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
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

  render() {
    const { latestListings } = this.props;
    console.log(latestListings);
    const { width } = Dimensions.get('window');
    const height = 220;

    const labelStyle = {
      color: chartConfig.color(),
      marginVertical: 10,
      textAlign: 'center',
      fontSize: 16,
    };
    const graphStyle = {
      marginVertical: 8,
      ...chartConfig.style,
    };
    return (
      <ScrollView
        key={Math.random()}
        style={{
          backgroundColor: chartConfig.backgroundColor,
        }}
      >
        <Text style={labelStyle}>Latest Listings</Text>
        <LineChart
          data={data}
          width={width}
          height={height}
          chartConfig={chartConfig}
          bezier
          style={graphStyle}
        />
      </ScrollView>
    );
  }
}

// which props do we want to inject, given the global state?
function mapStateToProps(state) {
  return {
    menuOpened: state.app.menuOpened,
    latestListings: state.listings.latest,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    toggleMenu: () => dispatch(appActions.toggleMenu()),
  };
};
Trending.propTypes = {
  menuOpened: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  latestListings: PropTypes.object.isRequired,
  // sendMessages: PropTypes.func.isRequired,
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Trending);
