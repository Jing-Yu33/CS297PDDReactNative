import React, { Component } from "react";
import { StyleSheet, Text, SafeAreaView, Dimensions } from "react-native";
import NavigationArrows from "../../components/NavigationArrows";
import RadioButtonGroup from "../../components/RadioButtonGroup";

const { width } = Dimensions.get("window");

export default class SymptomRange extends Component {
  state = {
    symptomRange: "",
    ButtonArray: [
      {
        label: "Last 3 months",
        value: "Last 3 months",
      },
      {
        label: "Last 6 months",
        value: "Last 6 months",
      },
      {
        label: "Last 9 months",
        value: "Last 9 months",
      },
      {
        label: "Last 1 year",
        value: "Last 1 year",
      },
      {
        label: "All symptoms",
        value: "All symptoms",
      },
    ],
    symptomRangeNumeric: 0,
  };

  calcLastDay = (value) => {
    if (value.toLowerCase() !== "all symptoms") {
      const days =
        value.split(" ")[2] == "year"
          ? 365
          : parseInt(value.split(" ")[1]) * 30;
      this.setState({ symptomRangeNumeric: days });
      console.log(this.state.symptomRangeNumeric);
    }
  };

  changeProperty = (key, value) => {
    this.calcLastDay(value);
    this.setState({ [key]: value });
  };

  /* componentDidMount() {
    return fetch(
      "https://srobvq5uw2.execute-api.us-west-2.amazonaws.com/dev/symptoms",
      { headers }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({
          symptomList: responseJson.data.Items,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  } */

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.message}>
          How long do you want your report to reflect?
        </Text>
        <RadioButtonGroup
          ButtonArray={this.state.ButtonArray}
          updateFunc={this.changeProperty}
          property="symptomRange"
        />
        <NavigationArrows
          nextScreen="SymptomList"
          props={this.props}
          propsToPass={{
            symptomRange: this.state.symptomRange,
            symptomRangeNumeric: this.state.symptomRangeNumeric,
          }}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  message: {
    marginHorizontal: 20,
    textAlign: "center",
    fontSize: 25,
    marginBottom: 20,
  },
  boldText: {
    fontWeight: "bold",
  },
  buttonLabel: {
    color: "#505050",
    fontSize: 18,
  },
  button: {
    margin: 10,
    width: width - 40,
    borderColor: "#E2E2E2",
    borderWidth: 1,
    borderRadius: 25,
  },
  buttonContainer: {
    flexDirection: "column",
  },
  buttonText: {
    fontSize: 20,
  },
});
