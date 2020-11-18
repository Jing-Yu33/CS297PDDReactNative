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
import { ActivityIndicator, FAB } from "react-native-paper";
import MultiSelect from "react-native-multiple-select";
import { scale, verticalScale, moderateScale } from "../../components/Scale";

const { height } = Dimensions.get("window");

export default class commonSymptomList extends Component {
  state = {
    commonSymptomList: [],
    otherRelatedSymptom: [],
    selectedIds: [],
    isLoading: true,
    symptomText: "",
  };

  onChangeState = (key, value) => {
    this.setState({ [key]: value });
  };

  /* searchData = (type, text) => {
    const newData = this.arrayholder.filter((item) => {
      const itemData = item.name.toUpperCase();
      const textData = text.toUpperCase();
      const idx = itemData.indexOf(textData);
     
      return idx > -1;
    });

    this.setState({
      dataSource: newData,
      symptomText: text,
    });
    //console.log(this.state.commonSymptomList);
  }; */

  loadSymptomList(headers) {
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
    this.loadSymptomList(headers);
  }

  onSelectedItemsChange = (selected) => {
    let { commonSymptomList } = this.state;
    let size = commonSymptomList.length;

    let symptomNames = commonSymptomList
      .filter((x) => selected.includes(x.symptomName))
      .map((x) => x.symptomName);
    this.setState({ selectedIds: selected });
    this.setState({ otherRelatedSymptom: symptomNames });

    //checking if the custom symptom enetred is selected or not
    if (selected.includes(commonSymptomList[size - 1].symptomName)) {
      commonSymptomList.push({ symptomName: "" });
      this.setState({
        commonSymptomList: commonSymptomList,
      });
    }
  };

  onSymptomTextChange = (text) => {
    let arr = this.state.commonSymptomList;
    arr[arr.length - 1].symptomName = text;
    this.setState({ commonSymptomList: arr });
  };

  params = this.props.route.params;

  render() {
    const { commonSymptomList, selectedIds } = this.state;
    const onEditComplete = () => {
      this.params.updateParams("otherRelatedSymptom", this.state.otherRelatedSymptom);
      this.props.navigation.pop();
    };

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "height" : ""}
        keyboardVerticalOffset={verticalScale(80)}
        //contentContainerStyle={styles.avoidingView}
        style={styles.container}
      >
        <Text style={styles.message}>
          Have you noticed any other related symptoms? Skip if not applicable.
        </Text>
        {/* <Input
          placeholder="Enter Symptom"
          type="data"
          secureTextEntry={false}
          onChangeText={this.searchData}
        />
        <MultiSelectChip
          dataSource={this.state.dataSource}
          setState={this.onChangeState}
          selectedArray={this.state.commonSymptomList}
          selectedArrayName="commonSymptomList"
        /> */}
        <View style={styles.multiSelect}>
          {this.state.isLoading ? (
            <ActivityIndicator />
          ) : (
            <React.Fragment>
              {this.multiSelect
                ? this.multiSelect.getSelectedItemsExt(selectedIds)
                : null}
              <Text style={styles.space}></Text>
              <MultiSelect
                hideTags
                items={commonSymptomList}
                uniqueKey="symptomName"
                ref={(component) => {
                  this.multiSelect = component;
                }}
                onSelectedItemsChange={this.onSelectedItemsChange}
                selectedItems={selectedIds}
                selectText="Pick Items"
                searchInputPlaceholderText="Search Items..."
                onChangeInput={(text) => this.onSymptomTextChange(text)}
                tagRemoveIconColor="#F4892C"
                tagBorderColor="#F4892C"
                tagTextColor="#F4892C"
                selectedItemTextColor="#CCC"
                selectedItemIconColor="#F4892C"
                itemTextColor="#000"
                displayKey="symptomName"
                hideSubmitButton
                searchInputStyle={{ color: "#CCC" }}
                submitButtonColor="#F4892C"
                submitButtonText="Submit"
              />
            </React.Fragment>
          )}
        </View>
        {this.params.updateParams ? (
          <FAB style={styles.fab} icon="check" onPress={onEditComplete} />
        ) : (
          <NavigationArrows
            nextScreen="BotherScale"
            props={this.props}
            propsToPass={{ otherRelatedSymptom: this.state.otherRelatedSymptom }}
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
    //alignItems: "center",
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
  fab: {
    position: "absolute",
    margin: 20,
    backgroundColor: "#F4892C",
    right: 0,
    bottom: 40,
  },
});
