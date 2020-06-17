import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { colorList } from "../constants/Colors";
import Constants from "expo-constants";
import { setLocalNotification } from "../utils/helpers";
import { getDecks } from "../utils/api";
import { getDecksData } from "../actions";

export class HomeScreen extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    setLocalNotification();
    getDecks().then((results) => dispatch(getDecksData(JSON.parse(results))));
  }
  render() {
    const { DeckTitles, navigation } = this.props;

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
    marginTop: Constants.statusBarHeight / 2,
  },
  contentContainer: {},
  buttonList: {
    height: 70,
    justifyContent: "center",
    borderTopWidth: 1,
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
  const DeckTitles = Object.keys(decks);
  return {
    DeckTitles,
  };
};

export default connect(mapStateToProps)(HomeScreen);
