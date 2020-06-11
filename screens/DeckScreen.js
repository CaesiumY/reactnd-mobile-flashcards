import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { connect } from "react-redux";

export class DeckScreen extends Component {
  render() {
    const { title, deck } = this.props;
    return (
      <View>
        <Text> {title} </Text>
        <Text>{JSON.stringify(deck)}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({});

const mapStateToProps = (decks, { title }) => {
  const deck = decks[title];
  return {
    deck,
  };
};

export default connect(mapStateToProps)(DeckScreen);
