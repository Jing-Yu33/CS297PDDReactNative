import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Dimensions,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";
import { Button } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import CareGiverCard from "../../../components/CareGiverCard.js";
const { width, height } = Dimensions.get("window");
export default class CareGiver extends Component {
  state = {
    caregiver: { id: "0", name: "", phone: "", email: "", relationship: "" },
    // textTypeError: {nameError:"", emailError:""},
    caregivers: [],
    showForm: false,
  };

  onAdd = () => {
    this.setState({ showForm: true });
  };

  showInputBox = (placeholder, key) => {
    return (
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder={placeholder}
          onChangeText={(text) => {
            let { caregiver } = this.state;
            caregiver[key] = text;
            this.setState({
              caregiver,
            });
          }}
          onBlur={() =>
            this.state.caregiver[key].trim() === "" &&
            (key === "name" || key === "email") &&
            alert(`${key} field is required.`)
          }
        />
      </View>
    );
  };
  onAddNewCareGiver = () => {
    const caregivers = [...this.state.caregivers, this.state.caregiver];
    this.setState({ caregivers, showForm: false });
    this.setState({
      caregiver: { name: "", phone: "", email: "", relationship: "" },
    });
    this.setState({ textTypeError: { nameError: "", emailError: "" } });
    // async
    this.props.addToParent("emergencyContact", caregivers);
  };
  caregiverForm = () => {
    return (
      // <Container>
      <View>
        {this.showInputBox("Full Name", "name")}
        {this.showInputBox("Tel. No.", "phone")}
        {this.showInputBox("Email", "email")}
        {this.showInputBox("Relationship", "relationship")}
        <Button
          mode="contained"
          labelStyle={{ color: "#ffc909", fontSize: 17 }}
          theme={theme}
          color="#fff"
          onPress={this.onAddNewCareGiver}
        >
          Save
        </Button>
      </View>
    );
  };

  showCareGiverList = () => {
    return (
      // <Container>
      <View>
        {this.state.caregivers.map((caregiver) => {
          console.log(caregiver.name);
          // TODOs: change the card component to be the same as the profile one
          return <CareGiverCard style={styles.card} caregiver={caregiver} />;
        })}
      </View>
      // {/* </Container> */}
    );
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <Text style={styles.message}>
            Do you wish to add any caregiver's contact?
          </Text>
        </View>
        <View style={{ flex: 5, justifyContent: "center" }}>
          {this.state.showForm && this.state.caregivers.length > 0
            ? null
            : this.showCareGiverList()}
          {this.state.showForm ? (
            this.caregiverForm()
          ) : (
            <Button
              icon={() => <AntDesign name="plus" size={24} color="#ffc909" />}
              mode="contained"
              labelStyle={{ color: "#ffc909", fontSize: 17 }}
              theme={theme}
              color="#fff"
              onPress={this.onAdd}
            >
              Add new..
            </Button>
          )}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // margin: 10,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
    width: width * 0.9,
  },
  message: {
    color: "#505050",
    fontSize: 25,
    marginBottom: 40,
  },
  flatList: {
    width: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  inputView: {
    width: "90%",
    //backgroundColor: "#465881",
    borderRadius: 25,
    height: 35,
    width: width - 40,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    borderColor: "#ffc909",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  card: {
    paddingVertical: 20,
    borderWidth: 0.5,
    //borderColor: "#505050",
    marginBottom: 20,
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 2,
    shadowColor: "rgb(0, 0, 0)",
    shadowOffset: {
      width: 3,
      height: 3,
    },
  },
});

const theme = {
  colors: {
    text: "#ffc909",
    primary: "#ffc909",
    underlineColor: "transparent",
    background: "#003489",
  },
};
