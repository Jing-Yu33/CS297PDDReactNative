import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ForgotPassword from "./ForgotPassword";

const { width } = Dimensions.get("window");

class Auth extends React.Component {
  state = {
    showSignUp: false,
    formType: "showSignIn",
    logo: true,
    bottomMessage: true,
    showSignUpFlow: false,
  };
  toggleAuthType = (formType) => {
    this.setState({ formType });
  };
  toggleLogo = (logo) => {
    this.setState({ logo });
  };
  toggleBottomMessage = (bottomMessage) => {
    this.setState({ bottomMessage });
  };

  componentDidMount() {
    const { showSignUpFlow, formType } = this.props;
    console.log(this.props);
    if (showSignUpFlow != undefined && formType) {
      this.setState({ showSignUpFlow, formType });
      this.toggleLogo(false);
      this.toggleBottomMessage(false);
    }
    if (this.props.route) {
      const { email, name, userId } = this.props.route.params;
      console.log(userId);
      this.setState({ email, name, userId });
    }
  }

  render() {
    const showSignIn = this.state.formType === "showSignIn";
    const showSignUp = this.state.formType === "showSignUp";
    const showForgotPassword = this.state.formType === "showForgotPassword";

    const showLogo = this.state.logo == true;
    const showBottomMessage = this.state.bottomMessage == true;
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.Os == "ios" ? "padding" : "height"}
      >
        {/* {showLogo && (
          <Image
            style={styles.logo}
            resizeMode="contain"
            source={require("../../assets/logo.png")}
          />
        )} */}
        {/*  {showLogo && (
          <Text style={styles.subtitle}></Text>
        )} */}
        {showSignIn && (
          <SignIn
            toggleAuthType={this.toggleAuthType}
            updateAuth={() => this.props.updateAuth("mainNav")}
          />
        )}
        {showSignUp && (
          <SignUp
            toggleAuthType={this.toggleAuthType}
            toggleBottomMessage={this.toggleBottomMessage}
            toggleLogo={this.toggleLogo}
            // updateAuth={() => this.props.updateAuth("mainNav")}
            showSignUpFlow={this.state.showSignUpFlow}
            email={this.state.email}
            name={this.state.name}
            userId={this.state.userId}
            navigation={this.props.navigation}
          />
        )}
        {showForgotPassword && (
          <ForgotPassword toggleAuthType={this.toggleAuthType} />
        )}
        {showBottomMessage && (
          <View style={{ position: "absolute", bottom: 40 }}>
            {showSignUp || showForgotPassword ? (
              <Text style={styles.bottomMessage}>
                Already signed up?{" "}
                <Text
                  style={styles.bottomMessageHighlight}
                  onPress={() => this.toggleAuthType("showSignIn")}
                >
                  &nbsp;&nbsp;Sign In
                </Text>
              </Text>
            ) : (
              <Text style={styles.bottomMessage}>
                Need an account?
                <Text
                  onPress={() => this.toggleAuthType("showSignUp")}
                  style={styles.bottomMessageHighlight}
                >
                  &nbsp;&nbsp;Sign Up
                </Text>
              </Text>
            )}
          </View>
        )} 
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 40,
    backgroundColor: "white",
  },
  logo: {
    height: width / 2.5,
  },
  title: {
    fontSize: 26,
    marginTop: 15,
    marginBottom: 20,
    //fontFamily: 'SourceSansPro-SemiBold',
    color: "#F4892C",
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 20,
    color: "rgba(0, 0, 0, .75)",
    //fontFamily: 'SourceSansPro-Regular',
  },
  bottomMessage: {
    //fontFamily: 'SourceSansPro-Regular',
    fontSize: 18,
  },
  bottomMessageHighlight: {
    color: "#f4a63b",
    paddingLeft: 10,
  },
});

export default Auth;
