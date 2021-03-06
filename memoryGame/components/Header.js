import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class Header extends React.Component {
  render() {
    return (
      <View style={styles.header}>
        <Text style={styles.header_text}>Memory Game</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'column',
    alignSelf: 'stretch',
    paddingTop: 20,
    paddingBottom: 5,
    backgroundColor: '#7775E5',
    height: 64,
  },
  header_text: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
  },
});
