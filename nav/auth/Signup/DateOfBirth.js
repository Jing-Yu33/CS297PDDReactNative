import React, { Component } from "react";

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import DatePicker2 from "../../../components/DatePicker2";

const { width, height } = Dimensions.get("window");

export default class DateOfBirth extends Component {
  state = { selectedDate: "" };

  onChange = (selectedDate) => {
    this.setState({
      selectedDate: this.formatDate(selectedDate),
    });
    const dateOfBirth = selectedDate || this.state.dateOfBirth;
    this.props.addToParent("dateOfBirth", dateOfBirth);
  };

  formatDate = (date) => {
    let formattedDate =
      (date.getMonth() > 8
        ? date.getMonth() + 1
        : "0" + (date.getMonth() + 1)) +
      "-" +
      (date.getDate() > 9 ? date.getDate() : "0" + date.getDate()) +
      "-" +
      date.getFullYear();
    return formattedDate;
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ flex: 1, marginBottom: width * 0.05 }}>
          <View /* style={{ flexWrap: "no-wrap" }} */>
            <Text style={styles.message}>
              Delighted to see you,{" "}
              <Text style={styles.name}>{this.props.nickname}</Text>!
            </Text>
            <Text style={styles.message}>What is your Date of birth?</Text>
          </View>
        </View>

        <DatePicker2 dateAttribute="selectedDate" onChange={this.onChange} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
    // alignItems: "center",
    justifyContent: "center",
    width: width * 0.9,
  },
  message: {
    color: "#505050",
    fontSize: 25,
    flexWrap: "wrap",
  },
  name: {
    color: "#505050",
    fontSize: 25,
    fontWeight: "bold",
  },
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
