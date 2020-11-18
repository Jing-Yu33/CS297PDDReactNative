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
import MultiSelect from "react-native-multiple-select";
import { ActivityIndicator, FAB } from "react-native-paper";
import { scale, verticalScale, moderateScale } from "../../components/Scale";
import { Auth } from "aws-amplify";

const { width, height } = Dimensions.get("window");

export default class DescriptionText extends Component {
  state = {
    symptomDescription: "",
    commonSymptomList: [
      {
        symptomName: "Gassy"
      },
      {
        symptomName: "Stabbing"
      },
      {
        symptomName: "Dull"
      },
      {
        symptomName: "Sharp"
      },
      {
        symptomName: "Dry"
      },
    ],
    selectedDescriptions: [],
    selectedIds: [],
    isLoading: true,
  };

  loadCommonSymptomList(headers) {
    //console.log(headers);

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
    let { commonSymptomList } = this.state;
    const size = commonSymptomList.length;

    let descriptions = commonSymptomList
      .filter((x) => selected.includes(x.symptomName))
      .map((x) => x.symptomName);
    this.setState({ selectedIds: selected });
    this.setState({ symptomDescription: selected.toString() });

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
    let str = this.state.symptomDescription;
    arr[arr.length - 1].symptomName = text;
    this.setState({ commonSymptomList: arr });
    this.setState({ symptomDescription: text });
  };

  params = this.props.route.params;

  render() {
    const { commonSymptomList, selectedIds } = this.state;
    const onEditComplete = () => {
      this.params.updateParams(
        "symptomDescription",
        this.state.symptomDescription
      );
      this.props.navigation.pop();
    };

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "height" : ""}
        keyboardVerticalOffset={verticalScale(80)}
        //contentContainerStyle={styles.avoidingView}
        style={styles.container}>
        <Text style={styles.message}>How would you describe your symptom?</Text>
        <View style={styles.multiSelect}>

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
              selectText="For Example - Is it stabbing, gassy, dull"
              searchInputPlaceholderText=""
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

        </View>
        {this.params.updateParams ? (
          <FAB style={styles.fab} icon="check" onPress={onEditComplete} />
        ) : (
            <NavigationArrows
              nextScreen="FeelBetter"
              props={this.props}
              propsToPass={{ symptomDescription: this.state.symptomDescription }}
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
    marginStart: "5%",
    marginEnd: "5%"
  },
  space: {
    marginVertical: 5,
  },
  message: {
    marginHorizontal: 20,
    textAlign: "center",
    fontSize: 25,
    marginBottom: 20,
  },
  greyMessage: {
    marginHorizontal: 20,
    textAlign: "center",
    fontSize: 18,
    color: "#E2E2E2",
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
  multiSelect: {
    width: width - 40,
  },
});
