import React from "react";
import { Dimensions, StyleSheet, TextInput } from "react-native";

const { width } = Dimensions.get("window");

const Input = ({
  placeholder,
  type,
  secureTextEntry = false,
  onChangeText,
  onBlur,
}) => (
  <TextInput
    style={styles.input}
    placeholder={placeholder}
    autoCapitalize="none"
    autoCorrect={false}
    onChangeText={(v) => onChangeText(type, v)}
    secureTextEntry={secureTextEntry}
    placeholderTextColor="#707070"
    selectionColor={"#707070"}
    onBlur={onBlur}
  />
);

const styles = StyleSheet.create({
  input: {
    //backgroundColor: "#fcf3db",
    borderRadius: 4,
    borderColor: "black",
    borderWidth: 0.5,
    height: 55,
    width: width - 40,
    marginBottom: 10,
    fontSize: 20,
    paddingHorizontal: 14,
    //fontFamily: "sans-serif",
    color: "#707070",
  },
});

export default Input;
