import React, { Component } from "react";

import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import NavigationArrowsOnPress from "../../../components/NavigationArrowsOnPress";
const { width, height } = Dimensions.get("window");

export default class SignUpDone extends Component {
  prevComponent = () => {
    // TODOs: shouldn't have a back button
    console.log("Do nothing");
  };

  nextComponent = () => {
    // TODOS:
    console.log("Jump to Home");
    this.props.createPatientAndRedirect();
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}></View>
        <View>
          <Text
            style={{
              fontWeight: "bold",
              color: "#ffc909",
              fontSize: 20,
              marginBottom: width * 0.05,
            }}
          >
            {" "}
            Congratulations{" "}
          </Text>
        </View>
        <View style={{ flex: 5 }}>
          <View>
            <Text style={styles.message}>
              Your have created your account!
            </Text>
            <Text style={styles.message}>
              You may now log your symptoms now.
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 2,
            alignItems: "flex-end",
            justifyContent: "flex-end",
          }}
        >
          <NavigationArrowsOnPress
            left="left"
            right="right"
            onLeft={false}
            onPressLeft={this.prevComponent}
            onPressRight={this.nextComponent}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    justifyContent: "center",
    width: width * 0.9,
  },
  logo: {
    margin: width * 0.2,
  },
  btnText: {
    color: "#FFFFFF",
  },
  message: {
    color: "#505050",
    textAlign: "left",
    fontSize: 20,
  },
});
