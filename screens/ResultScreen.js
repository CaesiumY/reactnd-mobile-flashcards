import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
// import * as Progress from "react-native-progress";

export class ResultScreen extends Component {
  render() {
    const { title, score, questionCount } = this.props.route.params;
    return (
      <View>
        <Text> {title} </Text>
        <Text> {score} </Text>
        <Text> {questionCount} </Text>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps)(ResultScreen);
