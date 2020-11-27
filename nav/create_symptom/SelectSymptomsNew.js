import React, { Component } from "react";

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Dimensions,
  AsyncStorage,
  KeyboardAvoidingView,
} from "react-native";
import NavigationArrows from "../../components/NavigationArrows";
import { scale, moderateScale, verticalScale } from "../../components/Scale";
import MultiSelect from "react-native-multiple-select";
import { FAB, ActivityIndicator } from "react-native-paper";
import { Auth } from "aws-amplify";

const { width } = Dimensions.get("window");

export default class SelectSymptomsNew extends Component {
  state = {
    commonSymptomList: [],
    symptomName: [],
    selectedIds: [],
    isLoading: true,
  };

  loadCommonSymptomList(headers) {
    //console.log(headers);
    return fetch(
      "https://srobvq5uw2.execute-api.us-west-2.amazonaws.com/dev/meta/symptoms",
      { headers }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        responseJson.data.push({ symptomName: "" });
        this.setState({
          isLoading: false,
          commonSymptomList: responseJson.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async componentDidMount() {
    const userId = (await AsyncStorage.getItem("userId")) || "none";
    const headers = {
      Authorization: userId,
      "Content-Type": "application/json",
    };
    this.loadCommonSymptomList(headers);
  }

  onSelectedItemsChange = (selected) => {
    let symptomName = this.state.commonSymptomList.find(
      (x) => x.symptomName === selected[0]
    ).symptomName;
    this.setState({ selectedIds: selected });
    this.setState({ symptomName: symptomName });
  };

  onSymptomTextChange = (text) => {
    let arr = this.state.commonSymptomList;
    arr.pop();
    arr.push({ symptomName: text });
    this.setState({ commonSymptomList: arr });
    this.setState({ symptomName: text });
  };

  params = this.props.route.params;

  render() {
    const onEditComplete = () => {
      this.params.updateParams("symptomName", this.state.symptomName);
      this.props.navigation.pop();
    };

    const { commonSymptomList, selectedIds } = this.state;
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "height" : ""}
        keyboardVerticalOffset={verticalScale(80)}
        //contentContainerStyle={styles.avoidingView}
        style={styles.container}
      >
        <Text style={styles.message}>
        What is your main symptom? Please describe it in short phrases
        </Text>
        <View style={styles.multiSelect}>
          {this.state.isLoading ? (
            <ActivityIndicator />
          ) : (
            <MultiSelect
              hideTags
              items={commonSymptomList}
              uniqueKey="symptomName"
              ref={(component) => {
                this.multiSelect = component;
              }}
              single
              onSelectedItemsChange={this.onSelectedItemsChange}
              selectedItems={selectedIds}
              selectText="Pick Items"
              searchInputPlaceholderText="Search Items..."
              onChangeInput={(text) => this.onSymptomTextChange(text)}
              tagRemoveIconColor="#ffc909"
              tagBorderColor="#ffc909"
              tagTextColor="#ffc909"
              selectedItemTextColor="#CCC"
              selectedItemIconColor="#ffc909"
              itemTextColor="#000"
              displayKey="symptomName"
              searchInputStyle={{ color: "#CCC" }}
              submitButtonColor="#48d22b"
              submitButtonText="Submit"
            />
          )}
        </View>
        {this.params.updateParams ? (
          <FAB style={styles.fab} icon="arrow-right" onPress={onEditComplete} />
        ) : (
          <NavigationArrows
            nextScreen="Timeline"
            props={this.props}
            propsToPass={{ symptomName: this.state.symptomName }}
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
  orangeText: {
    color: "#ffc909",
  },
  multiSelect: {
    width: width - 20,
  },
  fab: {
    position: "absolute",
    margin: 20,
    backgroundColor: "#ffc909",
    right: 0,
    bottom: 40,
  },
});
