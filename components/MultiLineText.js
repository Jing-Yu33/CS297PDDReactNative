import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import { scale, verticalScale, moderateScale } from "./Scale";

const { width } = Dimensions.get("window");

const MultiLineText = ({ placeholder, type, onChangeText }) => (
  <TextInput
    style={styles.textInput}
    mode="outlined"
    multiline={true}
    placeholder={placeholder}
    onChangeText={(text) => onChangeText(type, text)}
  />
);

const styles = StyleSheet.create({
  textInput: {
    //height: height * 0.2,
    backgroundColor: "white",
    textAlignVertical: "top",
    width: width - scale(40),
    //height: height * 0.4,
  },
});

export default MultiLineText;
