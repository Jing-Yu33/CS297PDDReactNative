import React, { Component } from "react";

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from "react-native";
import NavigationArrows from "../../components/NavigationArrows";
import Input from "../../components/Input";
import MultiSelectChip from "../../components/MultiSelectChip";

const { height } = Dimensions.get("window");

export default class SelectSymptoms extends Component {
  state = {
    dataSource: [
      {
        name: "Headache",
        selected: false,
        style: { backgroundColor: "#FFF" },
      },
      {
        name: "Back Pain",
        selected: false,
        style: { backgroundColor: "#FFF" },
      },
      {
        name: "Stomach Ache",
        selected: false,
        style: { backgroundColor: "#FFF" },
      },
      {
        name: "Vomitting",
        selected: false,
        style: { backgroundColor: "#FFF" },
      },
    ],
    selectedSymptoms: [],
    symptomText: "",
  };

  arrayholder = [
    {
      name: "Headache",
      selected: false,
      style: { backgroundColor: "#FFF" },
    },
    {
      name: "Back Pain",
      selected: false,
      style: { backgroundColor: "#FFF" },
    },
    {
      name: "Stomach Ache",
      selected: false,
      style: { backgroundColor: "#FFF" },
    },
    {
      name: "Vomitting",
      selected: false,
      style: { backgroundColor: "#FFF" },
    },
  ];

  onChangeState = (key, value) => {
    this.setState({ [key]: value });
  };

  searchData = (type, text) => {
    const newData = this.arrayholder.filter((item) => {
      const itemData = item.name.toUpperCase();
      const textData = text.toUpperCase();
      const idx = itemData.indexOf(textData);
      // TODO: Unselect chips which are filtered out
      /* if(idx == -1) {
        MultiSelectChip.onPressItem()
      } */
      return idx > -1;
    });

    this.setState({
      dataSource: newData,
      symptomText: text,
    });
    //console.log(this.state.selectedSymptoms);
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.message}>
          Try describing your symptom with simple phrases, then select a match
          from the list.
        </Text>
        <Input
          placeholder="Enter Phrase"
          type="data"
          secureTextEntry={false}
          onChangeText={this.searchData}
        />
        <MultiSelectChip
          dataSource={this.state.dataSource}
          setState={this.onChangeState}
          selectedArray={this.state.selectedSymptoms}
          selectedArrayName="selectedSymptoms"
        />
        <NavigationArrows
          nextScreen="Timeline"
          props={this.props}
          propsToPass={{ selectedSymptoms: this.state.selectedSymptoms }}
        />
      </SafeAreaView>
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
    color: "#F4892C",
  },
});
