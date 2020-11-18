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
import RadioButtonGroup from "../../components/RadioButtonGroup";

const { width } = Dimensions.get("window");

let today = new Date(),
  fewDaysLater = new Date(),
  weekLater = new Date(),
  monthLater = new Date(),
  moreThanMonth = new Date();

fewDaysLater = fewDaysLater.setDate(today.getDate() + 3);
weekLater = weekLater.setDate(today.getDate() + 7);
monthLater = monthLater.setDate(today.getDate() + 30);
moreThanMonth = moreThanMonth.setDate(today.getDate() + 60);

export default class Review extends Component {
  state = {
    reviewTime: "",
    ButtonArray: [
      {
        label: "Today",
        value: today.getTime().toString(),
      },
      {
        label: "In a few days",
        value: fewDaysLater.toString(),
      },
      {
        label: "In a week",
        value: weekLater.toString(),
      },
      {
        label: "In a month",
        value: monthLater.toString(),
      },
    ],
  };
  params = this.props.route.params;
  updateProperty = (key, value) => {
    this.setState({ [key]: value });
  };
  
  reviewUpdateReviewTime = async (code) => {
    const userId = (await AsyncStorage.getItem("userId")) || "0";

    const headers = {
      Authorization: userId,
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    const postObj = {
      severity: this.params.severity,
      reviewTime: this.state.reviewTime,
    };

    try {
      let res = await fetch(
        "https://srobvq5uw2.execute-api.us-west-2.amazonaws.com/dev/symptom/" +
        this.params.symptomNumber,
        {
          method: "PATCH",
          headers,
          body: JSON.stringify(postObj),
        }
      );
      res = await res.json();
      console.log(res);
      this.props.navigation.popToTop()
    } catch (e) {
      console.error(e);
    }
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.message}>
          When would you like us to remind you to update this symptom in the future? Leave it
          blank if you don't want to review
        </Text>
        <RadioButtonGroup
          ButtonArray={this.state.ButtonArray}
          updateFunc={this.updateProperty}
          property="reviewTime"
        />
        {console.log("REVIEW :: " + this.params.reviewProcess)}
        { this.params.reviewProcess===true ? ( <NavigationArrows checkOnPress= {this.reviewUpdateReviewTime} lastStep ="check" />) : (<NavigationArrows
          nextScreen="Summary"
          props={this.props}
          propsToPass={{ reviewTime: this.state.reviewTime }}
        />)}
        
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
    textAlign: "center",
    fontSize: 25,
    marginBottom: 20,
  },
});
