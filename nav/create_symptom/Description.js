import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from "react-native";
import NavigationArrows from "../../components/NavigationArrows";
import RadioGroup from "react-native-custom-radio-group";

const { width, height } = Dimensions.get("window");

export default class Description extends Component {
  state = {
    symptomConsistency: "Constant",
    ButtonArray: [
      {
        label: "Constant",
        value: "Constant",
      },
      {
        label: "Intermittent",
        value: "Intermittent",
      },
    ],
    activeBgColor: "#F4892C3C",
    activeTxtColor: "#F4892C",
    inActiveBgColor: "white",
    inActiveTxtColor: "#505050",
    descriptionText: "",
  };

  updateProperty = (key, value) => {
    this.setState({ [key]: value });
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.message}>
          Is your symptom constant or does it come and go?
        </Text>
        <RadioGroup
          radioGroupList={this.state.ButtonArray}
          buttonContainerActiveStyle={{
            backgroundColor: this.state.activeBgColor,
          }}
          buttonTextActiveStyle={{ color: this.state.activeTxtColor }}
          buttonContainerInactiveStyle={{
            backgroundColor: this.state.inActiveBgColor,
          }}
          buttonTextInactiveStyle={{ color: this.state.inActiveTxtColor }}
          containerStyle={styles.buttonContainer}
          buttonContainerStyle={styles.button}
          buttonTextStyle={styles.buttonText}
          onChange={(value) => {
            () => this.setState({ constancy: value });
          }}
        />
        <NavigationArrows
          nextScreen="PainScale"
          props={this.props}
          propsToPass={{
            symptomConsistency: this.state.symptomConsistency,
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
  buttonLabel: {
    color: "#505050",
    fontSize: 18,
  },
  button: {
    margin: 10,
    width: width * 0.5 - 20,
    borderColor: "#E2E2E2",
    borderWidth: 1,
    borderRadius: 25,
  },
  buttonContainer: {
    //flexDirection: "column",
  },
  buttonText: {
    fontSize: 20,
  },
  textInput: {
    //height: height * 0.2,
    backgroundColor: "white",
    width: width - 40,
    //height: height * 0.4,
  },
});
