import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { colorList } from "../constants/Colors";

export class HomeScreen extends Component {
  render() {
    const { DeckTitles, navigation } = this.props;
    console.log("HomeScreen -> render -> this.props", this.props);

    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          {DeckTitles.map((title, index) => (
            <TouchableOpacity
              key={`${title}-${index}`}
              style={[
                styles.buttonList,
                { backgroundColor: colorList[index % colorList.length] },
              ]}
              onPress={() => navigation.navigate("Deck", { title })}
            >
              <Text style={styles.buttonText}>{title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderColor: "white",
  },
  contentContainer: {},
  buttonList: {
    height: 70,
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "white",
  },
  buttonText: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
});

const mapStateToProps = (decks) => {
  console.log("mapStateToProps -> decks", decks);
  const DeckTitles = Object.keys(decks);
  const test = "test";
  return {
    DeckTitles,
    test,
  };
};

export default connect(mapStateToProps)(HomeScreen);
