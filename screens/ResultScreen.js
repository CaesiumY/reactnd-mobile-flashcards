import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";

export class ResultScreen extends Component {
  render() {
    return (
      <View>
        <Text> prop </Text>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps)(ResultScreen);
