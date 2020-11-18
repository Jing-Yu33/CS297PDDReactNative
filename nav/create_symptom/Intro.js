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

const { height } = Dimensions.get("window");

export default class Intro extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.message}>
          To help your doctor understand your symptom, please answer the following questions. It will take about <Text style={styles.orangeText}>3 minutes</Text> to complete.
        </Text>
        <View style={styles.message}>
          <Text>If you are experiencing a medical emergency, please call 911 or go to your nearest emergency room for evaluation and treatment.DO NOT ATTEMPT TO ACCESS EMERGENCY CARE THROUGH THIS APP.</Text>
        </View>
        <FAB
          style={styles.fab}
          icon="arrow-right"
          onPress={() =>
            this.props.navigation.push("SelectSymptomsNew", { dummy: "" })
          }
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
    fontSize: 20,
    marginBottom: 20,
  },
  fab: {
    position: "absolute",
    margin: 16,
    backgroundColor: "#F4892C",
    right: 0,
    bottom: 40,
  },
  orangeText: {
    color: "#F4892C",
  },
});
