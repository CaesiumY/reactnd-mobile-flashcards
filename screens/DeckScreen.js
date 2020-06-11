import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import TextButton from "../components/TextButton";
import { TouchableOpacity } from "react-native-gesture-handler";

export class DeckScreen extends Component {
  render() {
    const { deck, questionCount } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text
            style={[styles.titleText, { fontSize: 50, fontWeight: "bold" }]}
          >
            {deck.title}
          </Text>
          <Text style={[styles.titleText, { color: "gray" }]}>
            {questionCount} Cards
          </Text>
        </View>
        <View>
          <TextButton color="#a29bfe">Add Card</TextButton>
          <TextButton>Start Quiz</TextButton>
          <TouchableOpacity style={styles.removeButton}>
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
  const questionCount = deck.questions.length;

  return {
    deck,
    questionCount,
  };
};

export default connect(mapStateToProps)(DeckScreen);
