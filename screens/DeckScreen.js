import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import TextButton from "../components/TextButton";
import { TouchableOpacity } from "react-native-gesture-handler";
import { deleteDeck } from "../actions";
import { removeDeck } from "../utils/api";

export class DeckScreen extends Component {
  handleDelete = () => {
    const { navigation, dispatch, title } = this.props;
    navigation.popToTop();
    dispatch(deleteDeck(title));
    removeDeck(title);
  };

  handleStart = () => {
    const { navigation, title } = this.props;
    navigation.navigate("Quiz", { title });
  };

  shouldComponentUpdate(nextProps) {
    return !!nextProps.deck;
  }

  render() {
    const { navigation, title, deck } = this.props;
    const questionCount = deck.questions.length;

    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text
            style={[styles.titleText, { fontSize: 50, fontWeight: "bold" }]}
          >
            {title}
          </Text>
          <Text style={[styles.titleText, { color: "gray" }]}>
            {questionCount} Cards
          </Text>
        </View>
        <View>
          <TextButton
            onPress={() => navigation.navigate("AddCard", { title })}
            color="#a29bfe"
          >
            Add Card
          </TextButton>
          {questionCount != 0 && (
            <TextButton onPress={this.handleStart}>Start Quiz</TextButton>
          )}
          <TouchableOpacity
            style={styles.removeButton}
            onPress={this.handleDelete}
          >
            <Text style={styles.removeButtonText}>Delete Deck</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: 20,
    marginTop: 25,
    marginBottom: 25,
  },
  titleContainer: {
    flex: 1,
  },
  titleText: {
    textAlign: "center",
  },

  removeButton: {
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "red",
  },
  removeButtonText: {
    color: "red",
    textAlign: "center",
    borderRadius: 5,
    fontWeight: "bold",
    fontSize: 16,
  },
});

const mapStateToProps = (decks, { route }) => {
  const { title } = route.params;
  const deck = decks[title];

  return {
    title,
    deck,
  };
};

export default connect(mapStateToProps)(DeckScreen);
