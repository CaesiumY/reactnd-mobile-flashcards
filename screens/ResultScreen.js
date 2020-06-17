import React, { Component } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { connect } from "react-redux";
import * as Progress from "react-native-progress";
import { tintColor } from "../constants/Colors";
import TextButton from "../components/TextButton";
import { clearLocalNotification, setLocalNotification } from "../utils/helpers";

export class ResultScreen extends Component {
  state = {
    resultText: "",
    scoreToPercent: 0,
    bounceValue: new Animated.Value(1),
    showContents: false,
  };

  componentDidMount() {
    const { score, questionCount } = this.props;
    const { bounceValue } = this.state;

    clearLocalNotification().then(setLocalNotification);

    this.setState(
      {
        scoreToPercent: score / questionCount,
      },
      () => {
        this.state.scoreToPercent === 1
          ? this.setState({ resultText: "Excellent!" })
          : this.setState({ resultText: "Cheer Up!" });
      }
    );

    Animated.sequence([
      Animated.timing(bounceValue, { toValue: 1.05, duration: 400 }),
      Animated.spring(bounceValue, { toValue: 1, friction: 4 }),
    ]).start(() => {
      this.setState({ showContents: true });
    });
  }

  render() {
    const { title, score, questionCount, navigation, onRestart } = this.props;
    const {
      scoreToPercent,
      resultText,
      bounceValue,
      showContents,
    } = this.state;
    return (
      <View style={styles.container}>
        <Animated.View
          style={[styles.card, { transform: [{ scale: bounceValue }] }]}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.cardHeaderText}>Your Score is...</Text>
          </View>

          <View style={styles.cardContent}>
            <>
              <View style={styles.progressContainer}>
                <Progress.Circle
                  size={160}
                  formatText={() => `${scoreToPercent * 100}%`}
                  animated={true}
                  progress={scoreToPercent}
                  showsText={true}
                  color={tintColor}
                  borderWidth={5}
                  thickness={8}
                />
              </View>
              {showContents && (
                <>
                  <Text style={styles.cardContentText}>
                    {score} / {questionCount}
                  </Text>
                  <Text style={styles.resultText}>{resultText}</Text>
                </>
              )}
            </>
          </View>
          {showContents && (
            <View style={styles.cardButtonContainer}>
              <TextButton onPress={() => navigation.goBack()}>
                Back to Deck
              </TextButton>
              <TextButton onPress={() => onRestart()} color="#a29bfe">
                Restart Quiz
              </TextButton>
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
    height: "100%",
    borderRadius: 20,
    justifyContent: "space-between",
  },
  cardHeader: {
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
  },
  cardContentText: {
    fontSize: 35,
    textAlign: "center",
    padding: 20,
  },
  progressContainer: {
    alignItems: "center",
  },
  resultText: {
    textAlign: "center",
    fontSize: 35,
    fontWeight: "bold",
  },
  cardButtonContainer: {
    justifyContent: "space-around",
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 15,
  },
});

export default ResultScreen;
