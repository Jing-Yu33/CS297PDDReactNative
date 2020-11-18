import React, { Component } from "react";

import { StyleSheet, Text, View, Dimensions } from "react-native";
import AwesomeButton from "react-native-really-awesome-button";
import { ProgressBar } from "react-native-paper";

const { width, height } = Dimensions.get("window");

export default class Gender extends Component {
  state = {
    gender: "Male",
    progress: this.props.stage / this.props.maxStage,
  };
  onChange = (gender) => {
    this.props.addToParent("gender", gender);
  };
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.message}>What is your <Text style={{fontWeight: "bold"}}>biological</Text> gender?</Text>
        </View>
        <View style={{ flex: 5, flexDirection: "column", alignItems: "center", justifyContent: "space-around"}}>
          <View style={{ flex: 1 }}/>
          <View style={{ flex: 2, flexDirection: "column", justifyContent: "space-around"}}>
            <AwesomeButton
                textColor={this.props.gender === "male"? "#FFFFFF" : "#505050" }
                backgroundColor={this.props.gender === "male"? "#F4892C" : "#FFFFFF" }
                borderWidth={0.5}
                width={200}
                raiseLevel={0}
                borderColor="#DDDDDD"
                backgroundActive="#F6A056"
                onPress={() => this.onChange("male")}
              >
                <Text style={styles.genderText}>Male</Text>
              </AwesomeButton>

              <AwesomeButton
                textColor={this.props.gender === "female"? "#FFFFFF" : "#505050" }
                backgroundColor={this.props.gender === "female"? "#F4892C" : "#FFFFFF" }
                borderWidth={0.5}
                width={200}
                raiseLevel={0}
                borderColor="#DDDDDD"
                backgroundActive="#F6A056"
                onPress={() => this.onChange("female")}
              >
                <Text style={styles.genderText}>Female</Text>
              </AwesomeButton>
            </View>
            <View style={{ flex: 1, backgroundColor: 'red' }} />
          </View>
        </View>   
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: 'column',
    // alignItems: "center",
    justifyContent: "center",
    width: width * 0.9
  },
  message: {
    color: "#505050",
    fontSize: 25,
  },
  genderText: {
    color: "#505050",
    fontSize: 20,
  },
});
