import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { FAB } from "react-native-paper";
import NavigationArrows from "../../components/NavigationArrows";
import RadioButtonGroup from "../../components/RadioButtonGroup";

const { width } = Dimensions.get("window");

export default class Frequency extends Component {
  state = {
    frequency: "",
    ButtonArray: [
      {
        label: "Daily",
        value: "Daily",
      },
      {
        label: "Weekly",
        value: "Weekly",
      },
      {
        label: "Monthly",
        value: "Monthly",
      },
    ],
  };

  updateProperty = (key, value) => {
    this.setState({ [key]: value });
  };

  params = this.props.route.params;

  render() {
    const onEditComplete = () => {
      this.params.updateParams("frequency", this.state.frequency);
      this.props.navigation.pop();
    };

    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.message}>How often does your symptom occur?</Text>
        <RadioButtonGroup
          ButtonArray={this.state.ButtonArray}
          updateFunc={this.updateProperty}
          property="frequency"
        />
        {this.params.updateParams ? (
          <FAB style={styles.fab} icon="check" onPress={onEditComplete} />
        ) : (
          <NavigationArrows
            nextScreen="Description"
            props={this.props}
            propsToPass={{ frequency: this.state.frequency }}
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
  fab: {
    position: "absolute",
    margin: 20,
    backgroundColor: "#ffc909",
    right: 0,
    bottom: 40,
  },
});
