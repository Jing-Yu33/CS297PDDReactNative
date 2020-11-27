import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { FAB } from "react-native-paper";

const { width } = Dimensions.get("window");

const NavigationArrowsOnPress = ({
  left,
  right,
  onPressLeft,
  onPressRight,
  showLeft = true,
}) => (
  <View style={styles.buttonRow}>
    {showLeft && (
      <FAB
        style={styles.fab_left}
        icon={
          (left === "left" && "arrow-left") || (left === "close" && "close")
        }
        onPress={onPressLeft}
      />
    )}
    <FAB
      style={styles.fab_right}
      icon={right === "right" && "arrow-right"}
      onPress={onPressRight}
    />
  </View>
);

const styles = StyleSheet.create({
  buttonRow: {
    position: "absolute",
    right: 0,
    bottom: 40,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  fab_right: {
    margin: 10,
    backgroundColor: "#ffc909",
  },
  fab_left: {
    margin: 10,
    backgroundColor: "white",
  },
});

export default NavigationArrowsOnPress;
