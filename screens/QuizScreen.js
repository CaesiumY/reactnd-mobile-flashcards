import React, { Component } from "react";
import { View, Text, StyleSheet, Animated, Platform } from "react-native";
import { connect } from "react-redux";
import { tintColor } from "../constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";

class QuizScreen extends Component {
  state = {
    currentIndex: 0,
    frontSide: true,
    rotate: new Animated.Value(0),
    platform: Platform.OS === "ios",
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
    console.log("QuizScreen -> handleSubmit -> answer", answer);
  };

  render() {
    const { currentIndex, frontSide } = this.state;
    const { deck } = this.props;
    const { questions } = deck;
    return (
      <View
        style={[
          styles.container,
          { transform: !frontSide ? [{ scaleX: -1 }] : [] },
        ]}
      >
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
            <Text style={styles.cardHeaderText}>Quiz {currentIndex + 1}.</Text>
          </View>
          <View style={styles.cardContent}>
            <TouchableOpacity
              style={styles.cardContentButton}
              onPress={this.handleFlip}
            >
              {frontSide === true ? (
                <Text style={styles.cardContentText}>
                  {questions[currentIndex].question}
                </Text>
              ) : (
                <Text
                  style={[styles.cardContentText, styles.cardContentAnswerText]}
                >
                  {questions[currentIndex].answer}
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
          <View style={styles.cardButtonContainer}>
            <View style={styles.cardButton}>
              <TouchableOpacity
                style={styles.correct}
                onPress={this.handleSubmit}
              >
                <Text style={styles.cardButtonText}>Corrent</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.cardButton}>
              <TouchableOpacity
                style={styles.incorrect}
                onPress={this.handleSubmit}
              >
                <Text style={styles.cardButtonText}>Incorrent</Text>
              </TouchableOpacity>
            </View>
          </View>
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
  return {
    deck,
  };
};

export default connect(mapStateToProps)(QuizScreen);
