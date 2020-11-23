import React, { Component } from "react";
import { StyleSheet, Text, SafeAreaView, Dimensions } from "react-native";
import NavigationArrows from "../../components/NavigationArrows";
import RadioButtonGroup from "../../components/RadioButtonGroup";
import ProgressBar from "../../components/ProgressBar";

const { width } = Dimensions.get("window");

export default class Frequency extends Component {
  state = {
    reportType: "",
    ButtonArray: [
      {
        label: "General Physician Appointment",
        value: "General Physician Appointment",
      },
      {
        label: "Specialty Doctor Appointment",
        value: "Specialty Doctor Appointment",
      },
      {
        label: "Other",
        value: "Other",
      },
    ],
  };

  changeProperty = (key, value) => {
    this.setState({ [key]: value });
  };

  render() {
    //const { length } = this.props.route.state.routes;
    return (
      <SafeAreaView style={styles.container}>
        {/* <ProgressBar
          length={this.props.route.state.routes.length}
          maxLength={5}
        ></ProgressBar> */}
        <Text style={styles.message}>Select report type</Text>
        <RadioButtonGroup
          ButtonArray={this.state.ButtonArray}
          updateFunc={this.changeProperty}
          property="reportType"
        />
        <NavigationArrows
          nextScreen="VisitDate"
          props={this.props}
          propsToPass={{ reportType: this.state.reportType }}
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
