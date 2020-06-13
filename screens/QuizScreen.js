import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";

class QuizScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={{ borderWidth: 1 }}>
          <Text> prop </Text>
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
