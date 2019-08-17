import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
  sideMenu: {
    flex: 1,
    width: 260,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 15,
  },
  button: {
    textAlign: 'center',
    fontSize: 18,
    borderBottomWidth: 1,
    borderColor: 'grey',
    marginBottom: 10,
    marginTop: 10,
    color: 'black',
  },
});
const SideMenu = () => {
  return (
    <View style={styles.sideMenu}>
      <Text style={styles.title}>Hi there!</Text>
    </View>
  );
};

export default connect()(SideMenu);
