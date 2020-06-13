import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import TextButton from "../components/TextButton";
import { TouchableOpacity } from "react-native-gesture-handler";
import { deleteDeck } from "../actions";

export class DeckScreen extends Component {
  handleDelete = () => {
    const { navigation, dispatch, title } = this.props;
    navigation.popToTop();
    dispatch(deleteDeck(title));
  };

  render() {
    const { questionCount, navigation, title } = this.props;

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
          <TextButton>Start Quiz</TextButton>
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
  const questionCount = deck.questions.length;

  return {
    questionCount,
    title,
  };
};

export default connect(mapStateToProps)(DeckScreen);
