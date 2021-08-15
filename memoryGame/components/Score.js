import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class Score extends React.Component {
  render() {
    return (
      <View style={styles.score_container}>
        <Text style={styles.score}>
          No. Of Attempts : {this.props.attempts}
        </Text>
        <Text style={styles.score}>Matches : {this.props.score}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  score_container: {
    alignItems: 'center',
    padding: 10,
  },
  score: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
