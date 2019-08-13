import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Platform, StyleSheet, TextInput } from 'react-native';
import { View } from 'react-native-animatable';

const IS_ANDROID = Platform.OS === 'android';

const styles = StyleSheet.create({
  container: {
    marginTop: 2,
    marginBottom: 10,
  },
  textInputWrapper: {
    height: 42,
    marginBottom: 2,
    borderBottomWidth: 1,
  },
  textInput: {
    flex: 1,
    color: '#6B609A',
    margin: IS_ANDROID ? -1 : 0,
    height: 42,
    padding: 7,
  },
});
export default class CustomTextInput extends Component {
  static propTypes = {
    isEnabled: PropTypes.bool,
    onPress: PropTypes.func.isRequired,
  };

  static defaultProps = {
    isEnabled: true,
  };

  state = {
    isFocused: false,
  };

  focus = () => this.textInputRef.focus();

  render() {
    const { isEnabled, onPress, ...otherProps } = this.props;
    const { isFocused } = this.state;
    const color = isEnabled ? 'grey' : '#6B609A';
    const borderColor = isFocused ? 'grey' : '#6B609A';
    return (
      <View style={styles.container}>
        <View onPress={onPress} style={[styles.textInputWrapper, { borderColor }]}>
          <TextInput
            ref={ref => {
              this.textInputRef = ref;
            }}
            autoCapitalize="none"
            autoCorrect={false}
            style={[styles.textInput, { color }]}
            maxLength={32}
            underlineColorAndroid="transparent"
            placeholderTextColor="#6B609A"
            selectionColor="#6B609A"
            onFocus={() => {
              this.setState({ isFocused: true });
              if (onPress) onPress();
            }}
            onBlur={() => this.setState({ isFocused: false })}
            {...otherProps}
          />
        </View>
      </View>
    );
  }
}
