import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Dimensions,
  ays,
  AsyncStorage,
} from "react-native";
import { FAB } from "react-native-paper";
import DatePicker2 from "../../components/DatePicker2";

const { width } = Dimensions.get("window");

export default class DatePicker extends Component {
  state = {
    sendTime: "",
    selectedDateObj: "",
  };

  updateProperty = (key, value) => {
    this.setState({ [key]: value });
  };

  onDateChange = (val) => {
    this.setState({
      sendTime: val,
      selectedDateObj: new Date(val),
    });
  };

  shareReport = async (selectedDateObj) => {
    const userId = (await AsyncStorage.getItem("userId")) || "none";
    const { selectedContact, reportNumber } = this.props.route.params;

    let contactsArray = [];
    contactsArray.push(selectedContact);

    const headers = {
      Authorization: userId,
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    const postObj = {
      reportRecipients: contactsArray,
      reportShareTime: selectedDateObj,
    };

    try {
      let res = await fetch(
        "https://srobvq5uw2.execute-api.us-west-2.amazonaws.com/dev/users/reports/" +
          reportNumber,
        {
          method: "PUT",
          headers,
          body: JSON.stringify(postObj),
        }
      );
      res = await res.json();
      console.log(res);
      //this.props.navigation.popToTop();
    } catch (e) {
      console.error(e);
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.orangeText}>Pick a time</Text>
        <Text style={styles.message}>Select the date...</Text>
        <DatePicker2 dateAttribute="sendTime" onChange={this.onDateChange} />
        <FAB
          style={styles.fab}
          icon="arrow-right"
          onPress={() => {
            // TODO: Send API request to schedule
            this.shareReport(this.state.selectedDateObj);
            this.props.navigation.popToTop({ snackBar: "" });
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
  message: {
    marginHorizontal: 20,
    textAlign: "left",
    fontSize: 25,
    marginBottom: 20,
  },
  boldText: {
    fontWeight: "bold",
  },
  orangeText: {
    color: "#ffc909",
    fontSize: 20,
    textAlign: "left",
    alignSelf: "stretch",
    fontWeight: "bold",
    paddingHorizontal: 20,
    //  marginTop: 20,
  },
  fab: {
    position: "absolute",
    margin: 16,
    backgroundColor: "#ffc909",
    right: 0,
    bottom: 40,
  },
});
