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

export default class PainMovement extends Component {
  state = {
    symptomMovement: "",
  };

  updateProperty = (key, value) => {
    this.setState({ [key]: value });
  };
  params = this.props.route.params;
  render() {
    const onEditComplete = () => {
      this.params.updateParams("symptomMovement", this.state.symptomMovement);
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
          Does your symptom move anywhere? Leave it blank if it doesn’t.
        </Text>
        <MultiLineText
          placeholder="Both sides of my head"
          onChangeText={this.updateProperty}
          type="symptomMovement"
        />
        {this.params.updateParams ? (
          <FAB style={styles.fab} icon="check" onPress={onEditComplete} />
        ) : (
          <NavigationArrows
            nextScreen="Frequency"
            props={this.props}
            propsToPass={{ symptomMovement: this.state.symptomMovement }}
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
    //paddingTop: 0,
    //paddingBottom: 0,
    backgroundColor: "white",
    textAlignVertical: "top",
    //flexWrap: "wrap",
    width: width - 40,
    //height: height * 0.4,
  },
  fab: {
    position: "absolute",
    margin: 20,
    backgroundColor: "#F4892C",
    right: 0,
    bottom: 40,
  },
  avoidingView: {
    borderRadius: 10,
    height: verticalScale(150),
    marginTop: verticalScale(50),
    width: width - 30,
  },
});
