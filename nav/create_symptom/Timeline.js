import React, { Component } from "react";

import { StyleSheet, Text, SafeAreaView, Dimensions } from "react-native";
import { FAB } from "react-native-paper";
import NavigationArrows from "../../components/NavigationArrows";
import RadioGroup from "react-native-custom-radio-group";

const { width } = Dimensions.get("window");

let today = new Date();
let yesterday = new Date();
let fewDaysAgo = new Date();
let weekAgo = new Date();
let monthAgo = new Date();
let moreThanMonth = new Date();
yesterday.setDate(today.getDate() - 1);
fewDaysAgo.setDate(today.getDate() - 3);
weekAgo.setDate(today.getDate() - 7);
monthAgo.setDate(today.getDate() - 30);
moreThanMonth.setDate(today.getDate() - 60);

export default class Timeline extends Component {
  state = {
    ButtonArray: [
      {
        label: "Today",
        value: (today.getMonth()+1) + "-" + today.getDate() + "-" + today.getFullYear(),
      },
      {
        label: "Yesterday",
        value: (yesterday.getMonth()+1) + "-" + yesterday.getDate() + "-" + yesterday.getFullYear(),
      },
      {
        label: "A few days ago",
        value: (fewDaysAgo.getMonth()+1) + "-" + fewDaysAgo.getDate() + "-" + fewDaysAgo.getFullYear(),
      },
      {
        label: "A week ago",
        value: (weekAgo.getMonth()+1) + "-" + weekAgo.getDate() + "-" + weekAgo.getFullYear(),
      },
      {
        label: "A month or a few months ago",
        value: (monthAgo.getMonth()+1) + "-" + monthAgo.getDate() + "-" + monthAgo.getFullYear(),
      },
    ],
    activeBgColor: "#ffc9093C",
    activeTxtColor: "#ffc909",
    inActiveBgColor: "white",
    inActiveTxtColor: "#505050",
    selectedTime: "",
  };

  updateState = (key, value) => {
    this.setState({ [key]: value });
  };

  params = this.props.route.params;

  render() {
    const onEditComplete = () => {
      this.params.updateParams("startDate", this.state.startDate);
      this.props.navigation.pop();
    };

    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.message}>When did your symptom first start?</Text>
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
            this.updateState("startDate", value);
          }}
        />
        {this.params.updateParams ? (
          <FAB style={styles.fab} icon="check" onPress={onEditComplete} />
        ) : (
            <NavigationArrows
              nextScreen="Location"
              props={this.props}
              propsToPass={{ startDate: this.state.startDate }}
            />
          )}
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
  buttonContainer: {
    flexDirection: "column",
  },
  button: {
    margin: 10,
    width: width - 40,
    borderColor: "#E2E2E2",
    borderWidth: 1,
    borderRadius: 25,
  },
  buttonText: {
    fontSize: 20,
  },
  fab: {
    position: "absolute",
    margin: 20,
    backgroundColor: "#ffc909",
    right: 0,
    bottom: 40,
  },
});
