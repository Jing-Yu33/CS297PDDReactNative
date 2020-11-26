import React, { Component } from "react";
import RadioGroup from "react-native-custom-radio-group";
import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

const RadioButtonGroup = ({ ButtonArray, updateFunc, property }) => (
  <RadioGroup
    radioGroupList={ButtonArray}
    buttonContainerActiveStyle={{
      backgroundColor: "#ffc9093C",
    }}
    buttonTextActiveStyle={{ color: "#ffc909" }}
    buttonContainerInactiveStyle={{
      backgroundColor: "white",
    }}
    buttonTextInactiveStyle={{ color: "#505050" }}
    containerStyle={styles.buttonContainer}
    buttonContainerStyle={styles.button}
    buttonTextStyle={styles.buttonText}
    onChange={(value) => updateFunc(property, value)}
  />
);

const styles = StyleSheet.create({
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

export default RadioButtonGroup;
