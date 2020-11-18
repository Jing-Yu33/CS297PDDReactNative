import React, { Fragment, Component } from "react";
import { View, StyleSheet, Text, Dimensions, AsyncStorage } from "react-native";
import { ProgressBar } from "react-native-paper";
import AwesomeButton from "react-native-really-awesome-button";

import Input from "../../components/Input";
import ActionButton from "../../components/ActionButton";

import DateOfBirth from "./Signup/DateOfBirth";
import Gender from "./Signup/Gender";
import ChronicDisease from "./Signup/ChronicDisease";
import CareGiver from "./Signup/CareGiver";
import PrivacyPolicy from "./Signup/PrivacyPolicy";
import SignupDone from "./Signup/SignupDone";
import NavigationArrowsOnPress from "../../components/NavigationArrowsOnPress";
import { Auth, API } from "aws-amplify";

const { width } = Dimensions.get("window");

const apiName = "backend";

class Signup extends Component {
  state = {
    userId: "",
    username: "",
    password: "",
    email: "",
    phone_number: "",
    confirmPassword: "",
    alexaPin: 0,
    alexaConfirmPin: 1,
    error: "",
    dateOfBirth: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    ),
    gender: "",
    chronicCondition: {
      known: [],
      other: "",
    },
    nickname: "",
    emergencyContact: [],
    authCode: "",
    stage: 0,
    maxStage: 6,
    //userObject: {}
  };

  componentDidMount() {
    if (this.props.showSignUpFlow) {
      this.setState({ stage: 1 });
      console.log(this.props);
      const { email, name, userId } = this.props;
      this.setState({ email: email, nickname: name, userId: userId });
    }
  }

  onChangeText = (key, value) => {
    this.setState({ [key]: value });
  };
  changeStage = (stage) => {
    this.setState({ stage });
  };
  addToParent = (key, value) => {
    console.log("here ", value);
    this.setState({ [key]: value });
  };

  /* areInputsValid = () => {
    const { password, email, nickname, confirmPassword } = this.state;
    if()
  } */

  validateEmail = (email) => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  validateConfirmPassword = (confirmPassword) => {
    return confirmPassword === this.state.password;
  };

  signUp = async () => {
    const { password, email, nickname } = this.state;
    try {
      //TODOs:
      const { userSub } = await Auth.signUp({
        username: email,
        password: password,
        attributes: { email: email, name: nickname },
      });
      //console.log(userSub);
      /* if (userSub) {
        await AsyncStorage.setItem("cognitoId", userSub);
      } */
      console.log("successful sign up..");
      //this.setState({ stage: 1, username: nickname });
      //this.props.updateAuth("auth");
      this.props.toggleAuthType("showSignIn");
    } catch (err) {
      this.setState({ error: err.message });
      console.log("error signing up...", err);
    }
    //}
  };

  // confirmSignUp = async () => {
  //   const { username, authCode, password } = this.state;
  //   try {
  //     await Auth.confirmSignUp(username, authCode);
  //     // this.props.toggleLogo(false);
  //     // this.props.toggleBottomMessage(false);
  //     this.setState({ stage: 2 });
  //     //this.props.toggleAuthType('showSignIn')
  //   } catch (err) {
  //     console.log("error signing up...", err);
  //   }
  // };

  createPatientAndRedirect = async () => {
    const {
      username,
      userId,
      password,
      email,
      nickname,
      dateOfBirth,
      gender,
      alexaPin,
      chronicCondition,
      emergencyContact,
    } = this.state;
    console.log("username: " + email + ", password: " + password);
    /* await Auth.signIn(email, password);
    console.log("successfully signed in");
    const userObj = await Auth.currentAuthenticatedUser().catch((err) =>
      console.log(err)
    ); */
    //console.log(userObj);
    //const cognitoId = (await AsyncStorage.getItem("cognitoId")) || "none";

    const postObj = {
      userId: userId,
      email: email,
      username: nickname,
      dateOfBirth: dateOfBirth,
      gender: gender,
      alexaPin: alexaPin,
      chronicCondition: chronicCondition,
      emergencyContact: emergencyContact,
      skipInitialSymptomPage: false,
      skipInitialReportPage: false,
      firstLogin: true,
    };
    this.sendUserData(postObj);
  };

  sendUserData = async (postObj) => {
    try {
      //TODOs:
      let res = await fetch(
        "https://srobvq5uw2.execute-api.us-west-2.amazonaws.com/dev/users",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postObj),
        }
      );
      res = await res.json();
      console.log(res);
      //this.props.updateAuth("auth");
      /* this.props.toggleAuthType("showSignIn");
      this.props.toggleLogo(true);
      this.props.toggleBottomMessage(true); */
      this.props.navigation.replace("Home");
    } catch (e) {
      console.log(e);
    }
  };

  renderSignUpComponent = () => {
    if (this.state.stage === Number(0)) {
      return (
        <Fragment>
          <Input
            placeholder="Email"
            type="email"
            onChangeText={this.onChangeText}
            onBlur={() => {
              if (!this.validateEmail(this.state.email)) {
                this.setState({ emailError: "The entered email is not valid" });
              } else {
                this.setState({ emailError: "" });
              }
            }}
          />
          {this.state.emailError ? (
            <Text style={styles.errorMsg}>{this.state.emailError}</Text>
          ) : null}
          <Input
            placeholder="Password"
            type="password"
            onChangeText={this.onChangeText}
            secureTextEntry
          />
          <Input
            placeholder="Re-Enter Password"
            type="confirmPassword"
            onChangeText={this.onChangeText}
            secureTextEntry
            onBlur={() => {
              if (!this.validateConfirmPassword(this.state.confirmPassword)) {
                this.setState({
                  confirmPwdError: "The passwords do not match",
                });
              } else {
                this.setState({ confirmPwdError: "" });
              }
            }}
          />
          {this.state.confirmPwdError ? (
            <Text style={styles.errorMsg}>{this.state.confirmPwdError}</Text>
          ) : null}
          <Input
            placeholder="Preferred Name"
            type="nickname"
            onChangeText={this.onChangeText}
            /*  onBlur={() => {
              if (!this.validateName(this.state.nickname)) {
                this.setState({ nickname: "The entered email is not valid" });
              } else {
                this.setState({ emailError: "" });
              }
            }} */
          />
          {this.state.error ? (
            <Text style={styles.errorMsg}>{this.state.error}</Text>
          ) : null}
          <ActionButton title="Sign Up" onPress={this.signUp} />
        </Fragment>
      );
    }
  };

  prevComponent = () => {
    if (this.state.stage === Number(1)) {
      // TODOs:
      console.log("Jump to Login Screen?");
    } else if (this.state.stage === Number(6)) {
      this.createPatientAndRedirect();
    } else {
      this.setState({ stage: this.state.stage - 1 });
    }
  };

  nextComponent = () => {
    if (this.state.stage === Number(7)) {
      if (this.state.alexaPin !== this.state.alexaPin) return;
    }
    this.setState({ stage: this.state.stage + 1 });
  };

  renderButtons = () => {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "flex-end",
        }}
      >
        <NavigationArrowsOnPress
          left={
            this.state.stage === Number(1) || this.state.stage === Number(6)
              ? "close"
              : "left"
          }
          right="right"
          onPressLeft={this.prevComponent}
          onPressRight={this.nextComponent}
        />
      </View>
    );
  };

  renderSurveyComponent = () => {
    if (this.state.stage !== Number(0) && this.state.stage !== Number(6)) {
      return (
        <View>
          <View style={{ flex: 1 }}></View>
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.step}>
              {" "}
              {this.state.stage <= this.state.maxStage
                ? this.state.stage
                : this.state.maxStage}{" "}
              of {this.state.maxStage}{" "}
            </Text>
            <ProgressBar
              progress={
                this.state.stage <= this.state.maxStage
                  ? this.state.stage / this.state.maxStage
                  : this.state.maxStage / this.state.maxStage
              }
              width="40%"
              color="#F4892C"
            />
          </View>
          <View style={{ flex: 5 }}>
            {this.state.stage === Number(1) && <PrivacyPolicy />}
            {this.state.stage === Number(2) && (
              <DateOfBirth
                addToParent={this.addToParent}
                nickname={this.state.nickname}
                dateOfBirth={this.state.dateOfBirth}
              />
            )}
            {this.state.stage === Number(3) && (
              <Gender
                addToParent={this.addToParent}
                gender={this.state.gender}
              />
            )}
            {this.state.stage === Number(4) && (
              <ChronicDisease addToParent={this.addToParent} />
            )}
            {this.state.stage === Number(5) && (
              <CareGiver addToParent={this.addToParent} />
            )}
          </View>
          <View
            style={{
              flex: 2,
              alignItems: "flex-end",
              justifyContent: "flex-end",
            }}
          >
            {this.renderButtons()}
          </View>
        </View>
      );
    }
  };

  renderDoneComponent = () => {
    if (this.state.stage === Number(6)) {
      return (
        <SignupDone createPatientAndRedirect={this.createPatientAndRedirect} />
      );
    }
  };

  render() {
    return (
      <View style={styles.container}>
        {!this.props.showSignUpFlow && this.renderSignUpComponent()}
        {this.props.showSignUpFlow && this.renderSurveyComponent()}
        {this.props.showSignUpFlow && this.renderDoneComponent()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  input: {
    backgroundColor: "#fcf3db",
    borderRadius: 30,
    height: 45,
  },
  signUpMessage: {
    //fontFamily: 'SourceSansPro-Regular',
    fontSize: 16,
    width: width - 40,
    flexWrap: "wrap",
    marginBottom: 10,
    paddingHorizontal: 14,
    color: "#00000099",
    opacity: 0.8,
  },
  step: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#F4892C",
    marginRight: width * 0.05,
  },
  btnText: {
    color: "#FFFFFF",
  },
  errorMsg: {
    color: "red",
  },
});

export default Signup;
