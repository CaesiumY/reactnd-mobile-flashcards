import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { colorList } from "../constants/Colors";

export class HomeScreen extends Component {
  render() {
    const { titles } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          {titles.map((title, index) => (
            <TouchableOpacity
              key={`${title}-${index}`}
              style={[
                styles.buttonList,
                { backgroundColor: colorList[index % colorList.length] },
              ]}
              onPress={() => console.log("pushed", title)}
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
  },
  contentContainer: {},
  buttonList: {
    height: 70,
    justifyContent: "center",
    borderWidth: 1,
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
  const titles = Object.keys(decks);
  return {
    titles,
  };
};

export default connect(mapStateToProps)(HomeScreen);
