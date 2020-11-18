import React, { Component } from "react";

import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image } from "react-native";
import { Button } from 'react-native-paper'

import AwesomeButton from 'react-native-really-awesome-button/src/themes/blue';
import { scale, verticalScale, moderateScale } from "../../components/Scale";

import { Auth } from "aws-amplify";

export default class HomeScreen extends Component {
  state = {};
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Button
          style={[styles.conditionButton, styles.LoginButton]}
          color="#fff"
          mode="outlined"
          labelStyle={styles.conditionlabel}
          onPress={() => this.props.updateAuth("auth")}>
          Login with Email
        </Button>
        <Button
          style={styles.conditionButton}
          color="#505050"
          mode="outlined"
          labelStyle={styles.conditionlabel}
          onPress={() => this.props.updateAuth("auth")}>
          Create New Account
        </Button>
        {/* <AwesomeButton
          style={styles.conditionButton}
          
          
          stretch
          type="primaryFlat"
          
          onPress={() => Auth.federatedSignIn({ provider: "Google" })}>
          <Image source = {require('../../assets/GoogleLogo.png')} />
          <Text>Login with Google</Text>
        </AwesomeButton>
        <AwesomeButton
          style={styles.conditionButton}
          
          stretch
          type="primaryFlat"
          
          onPress={() => Auth.federatedSignIn({ provider: "LoginWithAmazon" })}>
          <Image source = {require('../../assets/AmazonLogo.png')} />
          <Text>Login with Amazon</Text>
        </AwesomeButton> */}
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
    margin: 15
  },

  conditionButton: {
    marginHorizontal: scale(10),
    borderRadius: 20,
    width: "95%",
    height: "9%",
    justifyContent: "center",
    marginBottom: 15,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor :"#d5d5d5"
  },
  LoginButton : {
    backgroundColor : "#F4892C",
    color : "#fff"
  },
  conditionlabel: {
    fontSize: 18,
  },
});
