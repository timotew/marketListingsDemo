import React from 'react';
import PropTypes from 'prop-types';
import {
  Platform,
  View,
  TouchableNativeFeedback,
  TouchableOpacity,
  ViewPropTypes,
} from 'react-native';

const IS_ANDROID = Platform.OS === 'android';
const IS_RIPPLE_EFFECT_SUPPORTED = Platform.Version >= 21 && IS_ANDROID;

const TouchableView = ({ isRippleDisabled, rippleColor, children, style, ...props }) => {
  if (IS_RIPPLE_EFFECT_SUPPORTED && !isRippleDisabled) {
    const background = TouchableNativeFeedback.Ripple('#FFF');
    return (
      <TouchableNativeFeedback {...props} background={background}>
        <View style={style}>{children}</View>
      </TouchableNativeFeedback>
    );
  }
  return (
    <TouchableOpacity {...props} style={style}>
      {children}
    </TouchableOpacity>
  );
};

TouchableView.propTypes = {
  isRippleDisabled: PropTypes.bool,
  rippleColor: PropTypes.string,
  children: PropTypes.node,
  style: ViewPropTypes.style,
};

TouchableView.defaultProps = {
  isRippleDisabled: false,
  rippleColor: '',
  children: null,
  style: {},
};

export default TouchableView;
