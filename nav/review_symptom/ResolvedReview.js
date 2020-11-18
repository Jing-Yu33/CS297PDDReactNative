import React, { Component } from "react";

import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  AsyncStorage,
} from "react-native";
import NavigationArrows from "../../components/NavigationArrows";
import DatePicker2 from "../../components/DatePicker2";

export default class ResolvedReview extends Component {
  state = {
    resolvedDate: "",
  };

  componentDidMount() {
    const { symptomNumber } = this.props.route.params;
    this.setState({ symptomNumber });
  }

  onDateChange = (val) => {
    let formattedDate = this.formatDate(val);
    this.setState({
      resolvedDate: formattedDate,
    });
  };

  onEditComplete = async () => {
    const userId = (await AsyncStorage.getItem("userId")) || "0";

    const headers = {
      Authorization: userId,
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    const postObj = {
      resolvedDate: this.state.resolvedDate,
      reviewTime: "0",
    };

    try {
      let res = await fetch(
        "https://srobvq5uw2.execute-api.us-west-2.amazonaws.com/dev/symptom/" +
          this.state.symptomNumber,
        {
          method: "PATCH",
          headers,
          body: JSON.stringify(postObj),
        }
      );
      res = await res.json();
      console.log(res);
      this.props.navigation.pop();
    } catch (e) {
      console.error(e);
    }
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
        <Text style={styles.orangetext}>Symptom Resolved</Text>
        <Text style={styles.message}>
          Tell us when your symptom got resolved.
        </Text>
        <DatePicker2
          dateAttribute="resolvedDate"
          onChange={this.onDateChange}
        />
        <NavigationArrows
          props={this.props}
          lastStep="check"
          checkOnPress={this.onEditComplete}
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
  orangetext: {
    color: "#F4892C",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "left",
    alignSelf: "stretch",
    marginLeft: 20,
    marginBottom: 10,
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
