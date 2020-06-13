import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { tintColor } from "../constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";

class QuizScreen extends Component {
  state = {
    currentIndex: 0,
    currentSide: "front",
  };

  render() {
    const { currentIndex, currentSide } = this.state;
    const { deck } = this.props;
    const { questions } = deck;
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardHeaderText}>Quiz {currentIndex + 1}.</Text>
          </View>
          <View style={styles.cardContent}>
            <TouchableOpacity
              style={styles.cardContentButton}
              onPress={() => console.log("first")}
            >
              <Text style={styles.cardContentText}>
                {questions[currentIndex].question}
              </Text>
              <Text style={styles.cardContentSubText}>Touch to Flip!</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.cardButtonContainer}>
            <View style={styles.cardButton}>
              <TouchableOpacity style={styles.correct}>
                <Text style={styles.cardButtonText}>Corrent</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.cardButton}>
              <TouchableOpacity style={styles.incorrect}>
                <Text style={styles.cardButtonText}>Incorrent</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "white",
    height: "75%",
    borderRadius: 20,
    justifyContent: "space-between",
  },
  cardHeader: {
    flex: 0.25,
    justifyContent: "center",
    backgroundColor: tintColor,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  cardHeaderText: {
    color: "white",
    fontWeight: "bold",
    padding: 10,
    fontSize: 24,
    textAlign: "center",
  },
  cardContent: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  cardContentButton: {},
  cardContentText: {
    fontSize: 30,
    textAlign: "center",
    padding: 20,
  },
  cardContentSubText: {
    color: "gray",
    textAlign: "center",
    padding: 20,
  },
  cardButtonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  cardButton: {
    flex: 1,
  },
  correct: {
    backgroundColor: "#27ae60",
    borderBottomLeftRadius: 20,
  },
  incorrect: {
    backgroundColor: "#e74c3c",
    borderBottomRightRadius: 20,
  },
  cardButtonText: {
    textAlign: "center",
    padding: 20,
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
});

const mapStateToProps = (decks, { route }) => {
  const title = route.params.title;
  const deck = decks[title];
  return {
    deck,
  };
};

export default connect(mapStateToProps)(QuizScreen);
