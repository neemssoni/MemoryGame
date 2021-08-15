import React from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Card from './components/Card';
import Header from './components/Header';
import Score from './components/Score';

Array.prototype.shuffle = function () {
  let i = this.length,
    j,
    temp;
  if (i == 0) return this;
  while (--i) {
    j = Math.floor(Math.random() * (i + 1));
    temp = this[i];
    this[i] = this[j];
    this[j] = temp;
  }
  return this;
};

export default class App extends React.Component {
  constructor(props) {
    super(props);

    let cards = [
      {
        name: 'A',
      },
      {
        name: 'B',
      },
      {
        name: 'C',
      },
      {
        name: 'D',
      },
      {
        name: 'E',
      },
      {
        name: 'F',
      },
      {
        name: 'G',
      },
      {
        name: 'H',
      },
    ];

    let clone = JSON.parse(JSON.stringify(cards));

    this.cards = cards.concat(clone);
    this.cards.map(obj => {
      let id = Math.random().toString(36).substring(7);
      obj.id = id;
      obj.is_open = false;
    });
    this.cards = this.cards.shuffle();
    this.state = {
      current_selection: [],
      selected_pairs: [],
      score: 0,
      cards: this.cards,
    };
  }

  resetCards = () => {
    let cards = this.cards.map(obj => {
      obj.is_open = false;
      return obj;
    });

    cards = cards.shuffle();

    this.setState({
      current_selection: [],
      selected_pairs: [],
      cards: cards,
      score: 0,
    });
  };

  renderRows = () => {
    return (
      <FlatList
        scrollEnabled={false}
        contentContainerStyle={{flex: 1}}
        numColumns={4}
        data={this.state.cards}
        renderItem={({item, index}) => {
          return (
            <Card
              key={index}
              name={item.name}
              color={item.color}
              is_open={item.is_open}
              clickCard={() => {
                this.clickCard(item.id);
              }}
            />
          );
        }}
      />
    );
  };
  clickCard = id => {
    let selected_pairs = this.state.selected_pairs;
    let current_selection = this.state.current_selection;
    let score = this.state.score;
    let index = this.state.cards.findIndex(card => {
      return card.id === id;
    });

    let cards = this.state.cards;
    if (
      cards[index].is_open === false &&
      selected_pairs.indexOf(cards[index].name) === -1
    ) {
      cards[index].is_open = true;
      current_selection.push({
        index: index,
        name: cards[index].name,
      });

      if (current_selection.length === 2) {
        if (current_selection[0].name === current_selection[1].name) {
          score += 1;
          selected_pairs.push(cards[index].name);
        } else {
          cards[current_selection[0].index].is_open = false;

          setTimeout(() => {
            cards[index].is_open = false;
            this.setState({
              cards: cards,
            });
          }, 500);
        }

        current_selection = [];
      }
      this.setState({
        score: score,
        cards: cards,
        current_selection: current_selection,
      });
    }
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Header />
        <View style={styles.body}>{this.renderRows.call(this)}</View>
        <Score score={this.state.score} />
        <TouchableOpacity onPress={this.resetCards} style={styles.buttonStyle}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  buttonText: {color: 'white', fontSize: 16},
  row: {
    flex: 1,
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  body: {
    flex: 1,
    padding: 10,
  },
  buttonStyle: {
    height: 56,
    width: '96%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7775E5',
    borderRadius: 10,
    marginBottom: 10,
    marginHorizontal: 10,
  },
});
