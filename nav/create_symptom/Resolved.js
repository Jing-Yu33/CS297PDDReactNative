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
import { FAB } from "react-native-paper";
import RadioGroup from "react-native-custom-radio-group";
import { scale, verticalScale, moderateScale } from "../../components/Scale";

const { width } = Dimensions.get("window");

export default class Resolved extends Component {
  state = {
    ButtonArray: [
      {
        label: "Ongoing",
        value: "Ongoing",
      },
      {
        label: "Resolved",
        value: "Resolved",
      },
    ],
    activeBgColor: "#F4892C3C",
    activeTxtColor: "#F4892C",
    inActiveBgColor: "white",
    inActiveTxtColor: "#505050",
  };

  updateProperty = (key, value) => {
    this.setState({ [key]: value });
  };

  setResolvedStatus = (value) => {
    const nav = this.props.navigation;
    if (value == "Ongoing") {
      nav.push("Review", { ...this.props.route.params });
    } else {
      nav.push("ResolvedDate", { ...this.props.route.params });
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.message}>
          Is your symptom ongoing or has it been resolved?
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
          onChange={(value) => this.setResolvedStatus(value)}
        />
        <FAB
          style={styles.fab}
          icon="arrow-left"
          small
          onPress={() => this.props.navigation.pop()}
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
  fab: {
    position: "absolute",
    margin: 20,
    padding: 10,
    backgroundColor: "white",
    right: 0,
    bottom: verticalScale(40),
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
