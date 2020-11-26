import React from "react";
import { TouchableHighlight, Text, View, StyleSheet } from "react-native";

const ActionButton = ({ onPress, title }) => (
  <TouchableHighlight
    onPress={onPress}
    style={styles.buttonContainer}
    underlayColor="#F4992C"
  >
    <View style={styles.button}>
      <Text style={styles.buttonText}>{title}</Text>
    </View>
  </TouchableHighlight>
);

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: "#ffc909",
    borderRadius: 4,
  },
  button: {
    height: 55,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    //fontFamily: 'SourceSansPro-SemiBold'
  },
});

export default ActionButton;
