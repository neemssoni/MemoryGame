import React from 'react';
import {StyleSheet, Text, TouchableHighlight} from 'react-native';

export default class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let icon_name = ' ';
    const {name, is_open} = this.props;
    if (is_open) {
      icon_name = name;
    }
    return (
      <TouchableHighlight
        style={[
          styles.card,
          {backgroundColor: is_open ? '#E3B1C8' : '#543F7D'},
        ]}
        onPress={this.props.clickCard}
        activeOpacity={0.75}
        underlayColor={'#f1f1f1'}>
        <Text style={styles.card_text}>{icon_name}</Text>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 1,
    height: 140,
    borderRadius: 10,
    justifyContent: 'center',
  },
  card_text: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#543F7D',
  },
});
