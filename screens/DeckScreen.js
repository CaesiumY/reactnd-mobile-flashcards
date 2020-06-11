import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { connect } from "react-redux";

export class DeckScreen extends Component {
  render() {
    const { title, deck } = this.props;
    console.log("DeckScreen -> render -> this.props", this.props);
    return (
      <View style={{ justifyContent: "center" }}>
        <Text> {title} </Text>
        <Text>{JSON.stringify(deck)}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({});

const mapStateToProps = (decks, { route }) => {
  const { title } = route.params;
  const deck = decks[title];
  console.log("mapStateToProps -> decks", decks);

  return {
    deck,
    title,
  };
};

export default connect(mapStateToProps)(DeckScreen);
