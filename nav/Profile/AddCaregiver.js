import React, { Fragment, Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  SafeAreaView,
  StatusBar,
  AsyncStorage,
} from "react-native";

import Input from "../../components/Input";
import { scale, moderateScale, verticalScale } from "../../components/Scale";
import NavigationArrows from "../../components/NavigationArrows";

const { width } = Dimensions.get("window");

class AddCaregiver extends Component {
  state = {
    name: "",
    number: "",
    email: "",
    area: "",
    userObj: [],
  };

  onChangeText = (key, value) => {
    this.setState({ [key]: value });
  };

  fetchUserObject = async (userId) => {
    const headers = {
      Authorization: userId,
      "Content-Type": "application/json",
    };
    //Fetch user object
    const response = await fetch(
      "https://srobvq5uw2.execute-api.us-west-2.amazonaws.com/dev/users",
      { headers }
    );
    console.log("response " + JSON.stringify(response)) 
    try {
      const registeredUserObj = await response.json();
      console.log("fetch user data " + JSON.stringify(registeredUserObj.data));
      if (registeredUserObj.data) {
        this.setState({ userObj: registeredUserObj.data });
      }
    } catch (err) {
      console.log(err);
    }
  };

  postCaregiverData = async () => {
    console.log("here")
    const userId = (await AsyncStorage.getItem("userId")) || "none";

    await this.fetchUserObject(userId);

    const { name, number, email, area } = this.state;

    //constructng the caregiver object
    let careGiverDetails = {
      name: name,
      telNo: number,
      email: email,
      relationship: area,
    };

    //updating the user object with new care giver
    let parsedUser = this.state.userObj;
    console.log("parsedUser " + JSON.stringify(parsedUser));
    console.log("contact " + JSON.stringify(careGiverDetails));
    parsedUser.emergencyContact.push(careGiverDetails);

    let postObj = {
      emergencyContact: parsedUser.emergencyContact,
    };
    console.log("postObj " + JSON.stringify(postObj));

    const headers = {
      Authorization: userId,
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    try {
      let res = await fetch(
        "https://srobvq5uw2.execute-api.us-west-2.amazonaws.com/dev/users",
        {
          // method: "PUT",
          method:"POST",
          headers,
          body: JSON.stringify(parsedUser),
        }
      );
      res = await res.json();
      console.log(JSON.stringify(res));
      this.props.navigation.pop();
    } catch (e) {
      console.error(e);
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.orangeText}>Add Contact</Text>
        <Input
          placeholder="Name"
          type="name"
          onChangeText={this.onChangeText}
        />
        <Input
          placeholder="Phone number"
          type="number"
          onChangeText={this.onChangeText}
        />
        <Input
          placeholder="Email"
          type="email"
          onChangeText={this.onChangeText}
        />
        <Input
          placeholder="Field of doctor"
          type="area"
          onChangeText={this.onChangeText}
        />
        <NavigationArrows
          lastStep="check"
          props={this.props}
          //propsToPass={{ sendTime: this.state.sendTime }}
          checkOnPress={this.postCaregiverData}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // justifyContent: "center",
    alignItems: "center",
    // padding: moderateScale(20),
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  input: {
    backgroundColor: "#fcf3db",
    borderRadius: 30,
    height: 45,
  },
  signUpMessage: {
    //fontFamily: 'SourceSansPro-Regular',
    fontSize: 16,
    width: width - 40,
    flexWrap: "wrap",
    marginBottom: 10,
    paddingHorizontal: 14,
    color: "#00000099",
    opacity: 0.8,
  },
  orangeText: {
    color: "#F4892C",
    fontSize: moderateScale(20),
    fontWeight: "bold",
    marginBottom: verticalScale(20),
    // alignSelf: "flex-start",
    marginTop: verticalScale(80),
  },
});

export default AddCaregiver;
