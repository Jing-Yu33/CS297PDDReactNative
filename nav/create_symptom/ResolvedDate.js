import React, { Component } from "react";

import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import NavigationArrows from "../../components/NavigationArrows";
import DatePicker2 from "../../components/DatePicker2";

export default class ResolvedDate extends Component {
  state = {
    resolvedDate: "",
  };

  onDateChange = (val) => {
    let formattedDate = this.formatDate(val);
    this.setState({
      resolvedDate: formattedDate,
    });
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
        <Text style={styles.message}>
          Tell us when your symptom got resolved.
        </Text>
        <DatePicker2
          dateAttribute="resolvedDate"
          onChange={this.onDateChange}
        />
        <NavigationArrows
          nextScreen="Summary"
          props={this.props}
          propsToPass={{
            resolvedDate:
              this.state.resolvedDate !== ""
                ? this.state.resolvedDate
                : this.formatDate(new Date()),
          }}
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
  btnText: {
    color: "#FFFFFF",
  },
  touchable: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
  messageWithName: {
    color: "#505050",
    fontSize: 25,
  },
  message: {
    color: "#505050",
    fontSize: 25,
    marginBottom: 20,
    textAlign: "center",
  },
  name: {
    color: "#505050",
    fontSize: 25,
    fontWeight: "bold",
  },
  flexRowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    flex: 1,
    margin: 5,
    marginBottom: 20,
    borderRadius: 4,
    height: 55,
    //marginBottom: 20,
    fontSize: 20,
    //fontFamily: "sans-serif",
    color: "#707070",
    backgroundColor: "#fff",
  },
  step: {
    fontSize: 15,
    color: "#707070",
    fontWeight: "bold",
  },
});

const theme = {
  colors: {
    text: "#F4892C",
    primary: "#F4892C",
    underlineColor: "transparent",
    background: "#003489",
  },
};
