import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import InputLayout from "../components/InputLayout";
import TextButton from "../components/TextButton";

export class AddCardScreen extends Component {
  state = {
    question: "",
    answer: "",
    errorMessage: "",
  };

  handleQuestionChange = (question) => {
    this.setState({ question });
  };
  handleAnswerChange = (answer) => {
    this.setState({ answer });
  };

  onSubmit = () => {
    const { question, answer } = this.state;
    if (question === "") {
      return this.setState({
        errorMessage: "Question is empty!",
      });
    }
    if (answer === "") {
      return this.setState({
        errorMessage: "Answer is empty!",
      });
    }

    // dispatch(createDeck(value));
    // // TODO - save title to asyncStorage
    this.setState({ question: "", answer: "", errorMessage: "" });
    // this.props.navigation.navigate("Decks");
  };

  render() {
    const { question, answer, errorMessage } = this.state;

    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Make your Card content!</Text>
          <InputLayout
            placeholder="Question"
            onChangeText={this.handleQuestionChange}
            value={question}
            name="question"
          ></InputLayout>
          <InputLayout
            placeholder="Answer"
            onChangeText={this.handleAnswerChange}
            value={answer}
            name="answer"
          ></InputLayout>
          {errorMessage !== "" && (
            <Text style={styles.errorText}>{errorMessage}</Text>
          )}
        </View>
        <TextButton onPress={this.onSubmit}>Create</TextButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: 20,
    marginTop: 25,
    marginBottom: 25,
  },
  title: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
  },
  errorText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "red",
  },
});

export default AddCardScreen;
