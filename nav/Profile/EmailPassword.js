import React, { Component } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Text,
  View,
  StatusBar,
  AsyncStorage,
} from "react-native";
import { FAB } from "react-native-paper";
import { scale, moderateScale, verticalScale } from "../../components/Scale";

export default class EmailPassword extends Component {
  state = {
    userObj: {},
  };

  async componentDidMount() {
    let userObj = (await AsyncStorage.getItem("userObj")) || "none";
    userObj = JSON.parse(userObj);
    userObj.password = "*********";
    this.setState({ userObj: userObj });
  }

  onUserIdPress = () => {
    this.props.navigation.push("UserNameChange");
  };

  onEmailPress = () => {
    this.props.navigation.push("EmailChange");
  };

  onPasswordPress = () => {
    this.props.navigation.push("PasswordChange");
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.userinfo}>
          <TouchableOpacity style={styles.button} onPress={this.onEmailPress}>
            <Text style={styles.orangeText}>Email</Text>
            <Text style={styles.userText}>{this.state.userObj.email}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={this.onPasswordPress}
          >
            <Text style={styles.orangeText}>Password</Text>
            <Text style={styles.userText}>{this.state.userObj.password}</Text>
          </TouchableOpacity>
        </View>
        <FAB
          style={styles.fab}
          icon="check"
          onPress={() => {
            // TODO: Send API request to schedule
            this.props.navigation.pop();
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
    padding: moderateScale(20),
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  userinfo: {
    justifyContent: "flex-start",
    alignSelf: "stretch",
    alignItems: "flex-start",
  },
  orangeText: {
    color: "#F4892C",
    fontSize: 16,
    fontWeight: "bold",
  },
  userText: {
    fontSize: moderateScale(26),
    marginBottom: verticalScale(10),
  },
  fab: {
    position: "absolute",
    margin: 16,
    backgroundColor: "#F4892C",
    right: 0,
    bottom: 40,
  },
});
