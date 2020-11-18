import React, { Component } from "react";

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
const { width, height } = Dimensions.get("window");

const formatDate = (date) => {
  let formattedDate =
    (date.getMonth() > 8 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1)) +
    "-" +
    (date.getDate() > 9 ? date.getDate() : "0" + date.getDate()) +
    "-" +
    date.getFullYear();
  return formattedDate;
};

const DatePicker = ({ onChange, toggleCalendar }) => {
  return (
    <View>
      <TouchableOpacity
        style={styles.touchable}
        onPress={() => this.setState({ showCalendar: true })}
      >
        <Text style={styles.message}>
          {this.state.selectedDate !== ""
            ? this.state.selectedDate
            : formatDate(new Date())}
        </Text>
      </TouchableOpacity>

      {this.state.showCalendar && (
        <View style={styles.flexRowContainer}>
          <DateTimePicker
            testID="dateTimePickerId"
            style={{ width: "100%" }}
            value={this.props.dateOfBirth}
            mode="date"
            display="spinner"
            onChange={this.onChange}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  flexRowContainer: {
    flex: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  touchable: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
});

export default DatePicker;
