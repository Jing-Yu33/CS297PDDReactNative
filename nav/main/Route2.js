import React from "react";
import { View, Text, StyleSheet, AsyncStorage } from "react-native";
import { Auth } from "aws-amplify";

class Route2 extends React.Component {
  async componentDidMount() {
    const userObj = await Auth.currentAuthenticatedUser().catch((err) =>
      console.log(err)
    );
    //console.log(userObj);
    await AsyncStorage.setItem(
      "userId",
      userObj.signInUserSession.idToken.jwtToken
    );

    const headers = {
      Authorization: userObj.signInUserSession.idToken.jwtToken,
      "Content-Type": "application/json",
    };

    //Fetch user object
    const response = await fetch(
      "https://srobvq5uw2.execute-api.us-west-2.amazonaws.com/dev/users",
      { headers }
    );

    try {
      const registeredUserObj = await response.json();
      if (registeredUserObj.data) {
        this.props.navigation.replace("Home");
      } else if (registeredUserObj.error) {
        this.props.navigation.replace("Auth", {
          email: userObj.attributes.email,
          name: userObj.attributes.name,
          userId: userObj.attributes.sub,
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
  render() {
    return <View style={styles.container}></View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});

export default Route2;
