import React, { Component } from "react";
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  AsyncStorage,
} from "react-native";

import { Auth } from "aws-amplify";

import Input from "../../components/Input";
import ActionButton from "../../components/ActionButton";

const clearAppData = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    await AsyncStorage.multiRemove(keys);
  } catch (error) {
    console.error("Error clearing app data.");
  }
};

class SignIn extends Component {
  state = {
    username: "",
    password: "",
    error: "",
  };

  onChangeText = (key, value) => {
    this.setState({ [key]: value });
  };

  signIn = async () => {
    const { username, password } = this.state;
    try {
      await Auth.signIn(username, password);
      //await clearAppData();
      console.log("successfully signed in");
    //   this.props.updateAuth("MainNav");
    } catch (err) {
      this.setState({ error: err.message });
      console.log("error signing in...", err);
    }
  };

  showForgotPassword = () => {
    this.props.toggleAuthType("showForgotPassword");
  };

  render() {
    return (
      <View>
        <Input
          onChangeText={this.onChangeText}
          type="username"
          placeholder="Email/Username"
        />
        <Input
          onChangeText={this.onChangeText}
          type="password"
          placeholder="Password"
          secureTextEntry
        />
        {this.state.error ? (
          <Text style={styles.errorMsg}>{this.state.error}</Text>
        ) : null}
        <ActionButton title="Login" onPress={this.signIn} />
        <View style={styles.buttonContainer}>
          <TouchableHighlight onPress={this.showForgotPassword}>
            <Text>Forget your password?</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    paddingTop: 15,
    justifyContent: "center",
    flexDirection: "row",
  },
  errorMsg: {
    color: "red",
  },
});

export default SignIn;
