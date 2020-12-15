import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Dimensions,
  AsyncStorage,
} from "react-native";
import NavigationArrows from "../../components/NavigationArrows";
import RadioGroup from "react-native-custom-radio-group";
import RadioButtonGroup from "../../components/RadioButtonGroup";

const { width } = Dimensions.get("window");

export default class SendTime extends Component {
  state = {
    sendTime: "",
    ButtonArray: [
      {
        label: "Now",
        value: "now",
      },
      {
        label: "3 days before my visit on 6/27",
        value: "past",
      },
      {
        label: "I'll pick a time",
        value: "custom",
      },
    ],
  };

  calcDaysBeforeVisit = () => {
    const { appointmentDate } = this.props.route.params;
    return new Date(appointmentDate).toUTCString();
  };

  shareReport = async (sendTime) => {
    const userId = (await AsyncStorage.getItem("userId")) || "none";
    const { selectedContacts, reportNumber } = this.props.route.params;

    let contactsArray = [];
    contactsArray.push(selectedContacts);

    const headers = {
      Authorization: userId,
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    const postObj = {
      reportRecipients: contactsArray,
      reportShareTime: sendTime,
    };
    console.log("Share report post obj");
    console.log(postObj);

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
      this.props.navigation.popToTop();
    } catch (e) {
      console.error(e);
    }
  };

  /* selectedContacts = this.props.route.params.selectedContacts;
  appointmentDate = this.props.route.params.appointmentDate;

  today = new Date().toUTCString();
  threeDaysBefore = this.today.setDate( - 3).toUTCString(); */

  updateProperty = (key, value) => {
    let sendTime = "";
    if (value === "custom") {
      this.props.navigation.push("DatePicker", { ...this.props.route.params });
    } else if (value == "past") {
      sendTime = this.calcDaysBeforeVisit();
      this.shareReport(sendTime);
    } else {
      sendTime = new Date().toUTCString();
      this.shareReport(sendTime);
    }
    this.setState({ sendTime: sendTime });
  };

  render() {
    console.log(this.props.route.params);
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.orangeText}>Send the report now?</Text>
        <Text style={styles.message}>When you’d like to send the report?</Text>
        <RadioButtonGroup
          ButtonArray={this.state.ButtonArray}
          updateFunc={this.updateProperty}
          property="sendTime"
        />
        <NavigationArrows
          nextScreen=""
          lastStep="check"
          props={this.props}
          //propsToPass={{ sendTime: this.state.sendTime }}
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
});
