import React, { Component } from "react";
import { View, Text, StyleSheet, Animated, Platform } from "react-native";
import { connect } from "react-redux";
import { tintColor } from "../constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ResultScreen from "./ResultScreen";

class QuizScreen extends Component {
  state = {
    currentIndex: 0,
    frontSide: true,
    rotate: new Animated.Value(0),
    platform: Platform.OS === "ios",
    userAnswer: [],
    score: 0,
  };

  onRestart = () => {
    this.setState({
      currentIndex: 0,
      frontSide: true,
      userAnswer: [],
      rotate: new Animated.Value(0),
    });
  };

  handleFlip = () => {
    const { frontSide, platform, rotate } = this.state;

    this.setState((state) => ({
      frontSide: !state.frontSide,
    }));

    Animated.spring(rotate, {
      toValue: Number(frontSide),
      useNativeDriver: platform,
    }).start();
  };

  handleSubmit = (answer) => {
    this.setState((state) => ({
      userAnswer: [...state.userAnswer, answer],
      currentIndex: state.currentIndex + 1,
    }));

    if (this.state.frontSide === false) {
      this.handleFlip();
    }
  };

  render() {
    const { currentIndex, frontSide } = this.state;
    const { deck, questionCount, title, navigation } = this.props;
    const { questions } = deck;

    if (currentIndex >= questionCount) {
      const score = this.state.userAnswer.filter(
        (answer) => answer === "correct"
      ).length;
      return (
        <ResultScreen
          title={title}
          score={score}
          questionCount={questionCount}
          navigation={navigation}
          onRestart={this.onRestart}
        />
      );
    }

    return (
      <View style={[styles.container, !frontSide && styles.cardBack]}>
        <Animated.View
          style={[
            styles.card,
            {
              transform: [
                {
                  rotateY: this.state.rotate.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0deg", "180deg"],
                  }),
                },
              ],
            },
          ]}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.cardHeaderText}>
              Quiz {questions[currentIndex] ? currentIndex + 1 : "?"} /
              {questionCount}
            </Text>
          </View>
          <View style={styles.cardContent}>
            <TouchableOpacity
              style={styles.cardContentButton}
              onPress={this.handleFlip}
            >
              {frontSide === true ? (
                <Text style={styles.cardContentText}>
                  {questions[currentIndex]
                    ? questions[currentIndex].question
                    : "No Quiz..."}
                </Text>
              ) : (
                <Text
                  style={[styles.cardContentText, styles.cardContentAnswerText]}
                >
                  {questions[currentIndex]
                    ? questions[currentIndex].answer
                    : "No Quiz..."}
                </Text>
              )}
              <Text style={styles.cardContentSubText}>
                <MaterialCommunityIcons
                  name="rotate-3d"
                  size={16}
                  style={{ padding: 5 }}
                />
                Touch to Flip!
              </Text>
            </TouchableOpacity>
          </View>
          {questions[currentIndex] && (
            <View style={styles.cardButtonContainer}>
              <View style={styles.cardButton}>
                <TouchableOpacity
                  style={styles.correct}
                  onPress={() => this.handleSubmit("correct")}
                >
                  <Text style={styles.cardButtonText}>Correct</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.cardButton}>
                <TouchableOpacity
                  style={styles.incorrect}
                  onPress={() => this.handleSubmit("incorrect")}
                >
                  <Text style={styles.cardButtonText}>Incorrect</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Animated.View>
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
  cardBack: {
    transform: [{ scaleX: -1 }],
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
  cardContentText: {
    fontSize: 35,
    textAlign: "center",
    padding: 20,
    fontWeight: "bold",
  },
  cardContentAnswerText: {
    fontSize: 20,
    fontWeight: "normal",
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
  const questionCount = deck.questions.length;

  return {
    deck,
    questionCount,
    title,
  };
};

export default connect(mapStateToProps)(QuizScreen);
