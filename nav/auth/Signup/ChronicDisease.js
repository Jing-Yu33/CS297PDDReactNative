import React, { Component } from "react";

import { StyleSheet, Text, View, Dimensions } from "react-native";
import { Chip } from "react-native-paper";
import MultiSelect from "react-native-multiple-select";

const { width, height } = Dimensions.get("window");

export default class ChronicDisease extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDiseasesId: [],
      selectedDiseases: [],
      other: "",
      chronicDiseaseList: [
        {
          symptomName: "Arthritis",
        },
        {
          symptomName: "Alzheimer's/Dementia",
        },
        {
          symptomName: "Congestive Heart Failure",
        },
        {
          symptomName: "Cancer",
        },
        {
          symptomName: "Depression",
        },
        {
          symptomName: "Diabetes",
        },
        {
          symptomName: "Emphysema/Asthma/COPD",
        },
        {
          symptomName: "Hyperlipidemia",
        },
        {
          symptomName: "Hypertension",
        },
        {
          symptomName: "Other Heart Disease(s)",
        },
        {
          symptomName: "Osteoporosis",
        },
        {
          symptomName: "Stroke",
        },
        {
          symptomName: "",
        },
      ],
    };
  }

  onSelectedItemsChange = (selected) => {
    let { chronicDiseaseList } = this.state;
    let size = chronicDiseaseList.length;

    let symptomNames = chronicDiseaseList
      .filter((x) => selected.includes(x.symptomName))
      .map((x) => x.symptomName);

    this.setState({ selectedDiseasesId: selected });

    this.props.addToParent("chronicCondition", {
      known: symptomNames,
      other: [],
    });

    //checking if the custom symptom enetred is selected or not
    if (selected.includes(chronicDiseaseList[size - 1].symptomName)) {
      chronicDiseaseList.push({ symptomName: "" });
      this.setState({
        chronicDiseaseList: chronicDiseaseList,
      });
    }
  };

  onSymptomTextChange = (text) => {
    let arr = this.state.chronicDiseaseList;
    if (arr.findIndex((x) => x.symptomName === text) === -1) {
      arr[arr.length - 1].symptomName = text;
      this.setState({ chronicDiseaseList: arr });
    }
  };

  /* onAddItems = (items) => {
    this.setState({ chronicDiseaseList: items });
    let selectedIds = this.state.selectedDiseasesId;
    selectedIds.push(items[items.length - 1].symptomName);
    console.log(selectedIds);
    this.setState({ selectedDiseasesId: selectedIds });
  }; */

  render() {
    let { chronicDiseaseList, selectedDiseasesId } = this.state;
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.message}>Do you have any chronic diseases?</Text>
        </View>
        <View
          style={{
            flex: 5,
            //alignItems: "center",
            justifyContent: "center",
            width: width * 0.8,
          }}
        >
          {this.multiSelect
            ? this.multiSelect.getSelectedItemsExt(selectedDiseasesId)
            : null}
          <Text style={styles.space}></Text>
          <MultiSelect
            hideTags
            items={chronicDiseaseList}
            uniqueKey="symptomName"
            fixedHeight
            ref={(component) => {
              this.multiSelect = component;
            }}
            onSelectedItemsChange={this.onSelectedItemsChange}
            selectedItems={selectedDiseasesId}
            selectText="Pick Items"
            searchInputPlaceholderText="Search Items..."
            //canAddItems
            //onAddItem={this.onAddItems}
            onChangeInput={(text) => this.onSymptomTextChange(text)}
            tagRemoveIconColor="#ffc909"
            tagBorderColor="#ffc909"
            tagTextColor="#ffc909"
            selectedItemTextColor="#CCC"
            selectedItemIconColor="#ffc909"
            itemTextColor="#000"
            displayKey="symptomName"
            hideSubmitButton
            searchInputStyle={{ color: "#CCC" }}
            submitButtonColor="#ffc909"
            submitButtonText="Submit"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
    // alignItems: "center",
    justifyContent: "center",
    width: width * 0.9,
  },
  message: {
    color: "#505050",
    fontSize: 25,
  },
});
