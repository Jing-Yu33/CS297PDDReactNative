import * as React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { ProgressBar } from "react-native-paper";

const { height, width } = Dimensions.get("window");

const CustomProgressBar = ({ length, maxLength }) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Text style={styles.step}>
        {" "}
        {this.state.stage} of {this.state.maxStage}{" "}
      </Text>
      <ProgressBar progress={length / maxLength} width="40%" color="#F4892C" />
    </View>
  );
};

const styles = StyleSheet.create({
  step: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#F4892C",
    marginRight: width * 0.05,
  },
});

export default CustomProgressBar;
