import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { FAB } from "react-native-paper";
import { scale, verticalScale, moderateScale } from "./Scale";

const { width } = Dimensions.get("window");

const NavigationArrows = ({
  nextScreen,
  props,
  propsToPass,
  lastStep,
  checkOnPress,
  onlyRight,
  onlyLeft,
  customIcon,
  rightOnPress

}) => (
  <View style={styles.buttonRow}>
    {!onlyRight? 
    <FAB
      style={styles.fab_left}
      icon="arrow-left"
      onPress={() => props.navigation.pop()}
    /> : <View /> }
    {lastStep === "close" && (
      <FAB
        style={styles.fab_right}
        icon="window-close"
        onPress={() => {
          props.navigation.popToTop();
        }}
      />
    )}
    {lastStep === "check" && (
      <FAB
        style={styles.fab_right}
        icon="check"
        onPress={() => {
          checkOnPress();
        }}
      />
    )}
    {!lastStep && (
      <FAB
        style={styles.fab_right}
        icon="arrow-right"
        onPress={() => {
          let currParams = props.route.params;
          //console.log({ ...currParams, ...propsToPass });
          checkOnPress?checkOnPress(): props.navigation.push(nextScreen, { ...currParams, ...propsToPass });
        }}
      />
    )}
  </View>
);

const styles = StyleSheet.create({
  buttonRow: {
    position: "absolute",
    right: scale(10),
    bottom: verticalScale(40),
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  fab_right: {
    margin: moderateScale(10),
    backgroundColor: "#ffc909",
  },
  fab_left: {
    margin: moderateScale(10),
    backgroundColor: "white",
  },
});

export default NavigationArrows;
