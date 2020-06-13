import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { tintColor } from "../constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";

class QuizScreen extends Component {
  state = {
    currentIndex: 0,
  };

  render() {
    const { currentIndex } = this.state;
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
              style={{ backgroundColor: "#999", flex: 1 }}
              onPress={() => console.log("first")}
            >
              <Text style={styles.cardContentText}>
                {questions[currentIndex].question}
              </Text>
              <Text style={styles.cardContentSubText}>Touch to Flip!</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.cardButtonContainer}>
            <TouchableOpacity
              style={[
                styles.cardButton,
                { backgroundColor: "#27ae60", borderBottomLeftRadius: 20 },
              ]}
            >
              <Text style={styles.cardButtonText}>Corrent</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.cardButton,
                { backgroundColor: "#e74c3c", borderBottomRightRadius: 20 },
              ]}
            >
              <Text style={styles.cardButtonText}>Incorrent</Text>
            </TouchableOpacity>
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
    backgroundColor: tintColor,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
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
  cardContentText: {
    fontSize: 30,
    textAlign: "center",
  },
  cardContentSubText: {
    color: "gray",
    textAlign: "center",
    padding: 10,
  },
  cardButtonContainer: {
    backgroundColor: "#999",
    flex: 0.3,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  cardButton: {
    flex: 1,
    alignItems: "stretch",
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
