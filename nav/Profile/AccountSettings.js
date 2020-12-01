import React, { Component } from "react";
import { StyleSheet, SafeAreaView, View, AsyncStorage } from "react-native";
import { List, Divider, FAB } from "react-native-paper";
import { scale, moderateScale, verticalScale } from "../../components/Scale";

import { Auth } from "aws-amplify";

const clearAppData = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    await AsyncStorage.multiRemove(keys);
  } catch (error) {
    console.error("Error clearing app data.");
  }
};

async function signOut(props) {
  try {
    await clearAppData();
    await Auth.signOut();
    props.updateAuth("auth");
  } catch (error) {
    console.log("error signing out: ", error);
  }
}

export default class AccountSettings extends Component {
  state = {};

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.settingsList}>
          {console.log(this.props)}
          <List.Section>
            <List.Item
              title="Email and password"
              onPress={() => {
                this.props.navigation.push("Email Password");
              }}
            />
            <Divider />
            <List.Item
              titleStyle={styles.red}
              title="Logout"
              onPress={() => {
                signOut(this.props);
              }}
            />
            <Divider />
            <List.Item
              titleStyle={styles.red}
              title="DELETE ACCOUNT"
              onPress={() => {}}
            />
          </List.Section>
        </View>
        <FAB
          style={styles.fab}
          icon="arrow-left"
          color = "#F4892C"
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
  },
  greeting: {
    fontSize: moderateScale(26),
  },
  name: {
    fontSize: moderateScale(26),
    fontWeight: "bold",
  },
  red: {
    color: "#FF2828",
  },
  fab: {
    position: "absolute",
    margin: 16,
    backgroundColor: "#FFF",
    right: 0,
    bottom: 40,
  },
});
