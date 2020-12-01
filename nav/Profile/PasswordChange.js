import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from "react-native";
import NavigationArrows from "../../components/NavigationArrows";
import Input from "../../components/Input";

const { width, height } = Dimensions.get("window");

export default class PasswordChange extends Component {
  state = {
    oldPassword: "",
    newPassword: "",
    reEnterPassword: "",
  };

  updateProperty = (key, value) => {
    this.setState({ [key]: value });
  };

  onFinish = () => {
    this.props.navigation.pop();
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.orangetext}>Passoword Change</Text>
        <Input
          placeholder="Old Password"
          type="oldPassword"
          onChangeText={this.updateProperty}
        ></Input>
        <Input
          placeholder="New Password"
          type="newPassword"
          onChangeText={this.updateProperty}
        ></Input>
        <Input
          placeholder="Re-enter New Password"
          type="reEnterPassword"
          onChangeText={this.updateProperty}
        ></Input>
        <NavigationArrows
          lastStep="check"
          props={this.props}
          checkOnPress={this.onFinish}
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
  orangetext: {
    color: "#F4892C",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "left",
    alignSelf: "stretch",
    marginLeft: 20,
    marginBottom: 10,
  },
  message: {
    marginHorizontal: 20,
    textAlign: "center",
    fontSize: 25,
    marginBottom: 20,
  },
  textInput: {
    //height: height * 0.2,
    //paddingTop: 0,
    //paddingBottom: 0,
    backgroundColor: "white",
    textAlignVertical: "top",
    //flexWrap: "wrap",
    width: width - 40,
    //height: height * 0.4,
  },
});
