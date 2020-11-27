import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";
import { FAB } from "react-native-paper";
import NavigationArrows from "../../components/NavigationArrows";
import MultiLineText from "../../components/MultiLineText";
import { scale, verticalScale, moderateScale } from "../../components/Scale";

const { width, height } = Dimensions.get("window");

export default class FeelWorse extends Component {
  state = {
    worseCondition: "",
  };

  updateProperty = (key, value) => {
    this.setState({ [key]: value });
  };
  params = this.props.route.params;
  render() {
    const onEditComplete = () => {
      this.params.updateParams("worseCondition", this.state.worseCondition);
      this.props.navigation.pop();
    };

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "height" : ""}
        keyboardVerticalOffset={verticalScale(120)}
        //contentContainerStyle={styles.avoidingView}
        style={styles.container}
      >
        <Text style={styles.message}>
          What makes your symptom worse?
        </Text>
        {/* <Text style={styles.orangetext}>I feel worse when</Text> */}
        <MultiLineText
          //placeholder="Both sides of my head"
          onChangeText={this.updateProperty}
          type="worseCondition"
        />
        {this.params.updateParams ? (
          <FAB style={styles.fab} icon="check" onPress={onEditComplete} />
        ) : (
          <NavigationArrows
            nextScreen="RelatedSymptoms"
            props={this.props}
            propsToPass={{ worseCondition: this.state.worseCondition }}
          />
        )}
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  message: {
    marginHorizontal: 20,
    textAlign: "center",
    fontSize: 25,
    marginBottom: 20,
  },
  textInput: {
    //height: height * 0.2,
    backgroundColor: "white",
    width: width - 40,
    height: height * 0.4,
  },
  orangetext: {
    color: "#ffc909",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "left",
    alignSelf: "stretch",
    marginLeft: 20,
    marginBottom: 10,
  },
  fab: {
    position: "absolute",
    margin: 20,
    backgroundColor: "#ffc909",
    right: 0,
    bottom: 40,
  },
});
