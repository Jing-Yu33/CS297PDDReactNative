import React, { Component } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  FlatList,
  StatusBar,
  AsyncStorage,
  Dimensions
} from "react-native";
import { FAB, Card, Title, Searchbar } from "react-native-paper";
import { scale, moderateScale, verticalScale } from "../../components/Scale";
import { TouchableOpacity } from "react-native-gesture-handler";
import MultiSelect from "react-native-multiple-select";
const { width, height } = Dimensions.get("window");
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setProfileImageUrl } from '../../actions';
import { setUserInfo } from '../../actions';

class ChronicDisease extends Component {
  state = {
    chronicConditions: [
      {
        id: Math.floor(Math.random() * 100000),
        name: "HyperTension",
      },
      {
        id: Math.floor(Math.random() * 100000),
        name: "Migrane",
      },
    ],
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
    viewSearch: false,
    userInfo: ""
  };

  async componentDidMount() {
    console.log("Conditions:" + JSON.stringify(this.props.userInfo));
    if (this.props.userInfo.chronicCondition)
      this.setState({
        chronicConditions: this.props.userInfo.chronicCondition.known,
      });
  }
  showHideSearchBarState = () => {
    // this.setState({ viewSearch: !this.state.viewSearch });
    this.setState({ viewSearch: true });

  }
  onSelectedItemsChange = (selected) => {
    let { chronicDiseaseList } = this.state;
    let size = chronicDiseaseList.length;


    this.setState({ chronicConditions: selected });

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

  renderSearchBarState = () => {

    let { chronicDiseaseList, chronicConditions } = this.state;
    return (
      <View>
        <View>
          {this.multiSelect
            ? this.multiSelect.getSelectedItemsExt(chronicConditions)
            : null}
          <Text style={styles.space}></Text>

          <MultiSelect
            hideTags
            items={chronicDiseaseList}
            uniqueKey="symptomName"
            fixedHeight
            styleMainWrapper={{ width: width * 0.9, alignSelf: 'stretch', }}
            ref={(component) => {
              this.multiSelect = component;
            }}
            onSelectedItemsChange={this.onSelectedItemsChange}
            selectedItems={chronicConditions}
            selectText="Type to add Chronic Condition"
            searchInputPlaceholderText=""
            //canAddItems
            //onAddItem={this.onAddItems}
            onChangeInput={(text) => this.onSymptomTextChange(text)}
            tagRemoveIconColor="#F4892C"
            tagBorderColor="#F4892C"
            tagTextColor="#F4892C"
            selectedItemTextColor="#CCC"
            selectedItemIconColor="#F4892C"
            itemTextColor="#000"
            displayKey="symptomName"
            hideSubmitButton
            searchInputStyle={{ color: "#000", width: "100%" }}
            submitButtonColor="#F4892C"
            submitButtonText="Submit"
            styleTextDropdown={{ paddingBottom: 40, paddingTop: 40 }}
            tagContainerStyle = {{paddingStart : 400}}
            styleTextDropdownSelected = {{fontSize : 16, letterSpacing :2, alignSelf: "center", paddingStart : 15, overflow: "hidden", }}
            styleDropdownMenuSubsection = {{height:"150%", justifyContent:"center", backgroundColor: "#fff", borderColor: "#f0f0f0", borderWidth:1, shadowColor : "#00000033", shadowOffset : {width : 0, height :1}}}
          />
        </View>
      </View>
    )
  }
  updateUserInfo = async () => {
    let { chronicDiseaseList, chronicConditions } = this.state;
    let symptomNames = chronicDiseaseList
      .filter((x) => chronicConditions.includes(x.symptomName))
      .map((x) => x.symptomName);

    const postObj = {
      chronicCondition: {
        known: symptomNames,
        other: []
      }
    };
    const userId = (await AsyncStorage.getItem('userId')) || 'none';
    try {
      //TODOs:
      let res = await fetch(
        "https://srobvq5uw2.execute-api.us-west-2.amazonaws.com/dev/users",
        {
          method: "PUT",
          headers: {
            Authorization: userId,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postObj),
        }
      );
      res = await res.json();
      console.log(res);

    } catch (e) {
      console.log(e);
    }
    try {
      const response = await fetch(
        "https://srobvq5uw2.execute-api.us-west-2.amazonaws.com/dev/users",
        {
          headers: {
            Authorization: userId,
            "Content-Type": "application/json",
          },
        }
      );

      const registeredUserObj = await response.json();
      //console.log(registeredUserObj.data);
      if (registeredUserObj.data) {

        this.setState({ userInfo: registeredUserObj.data });
        this.props.setUserInfo(registeredUserObj.data);
      }
    } catch (e) {

    }
    this.props.navigation.pop();
  }
  render() {
    const renderItem = ({ item }) => (
      <TouchableOpacity style={styles.card}>
        <Text style={styles.orangeText}>{item.toString()}</Text>
      </TouchableOpacity>
    );
    return (
      <SafeAreaView style={styles.container}>
        { (this.renderSearchBarState())}
        <View style={styles.buttonRow}>
          <FAB
            style={styles.fab_right}
            icon="check"
            onPress={() => {
              // this.props.navigation.pop();
              this.updateUserInfo()
            }}
          />
        </View>

      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: moderateScale(20),
  },
  orangeText: {
    color: "#F4892C",
    fontSize: 16,
    fontWeight: "bold",
  },
  fab: {
    position: "absolute",
    margin: 16,
    backgroundColor: "#F4892C",
    right: 0,
    bottom: 40,
  },
  diseaseList: {
    marginHorizontal: scale(10),
  },
  card: {
    shadowColor: "rgba(0,0,0, .4)", // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    backgroundColor: "#fff",
    elevation: 2, // Android
    borderRadius: 3,
    padding: moderateScale(10),
    margin: moderateScale(10),
  },
  buttonRow: {
    position: "absolute",
    right: 0,
    bottom: 0,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  fab_left: {
    margin: 10,
    backgroundColor: "white",
  },
  fab_right: {
    margin: 10,
    backgroundColor: "#F4892C",
  },
  shadowContainer: {
    backgroundColor: "rgba(0,0,0, .4)",
    height: "100%",
    width: "100%",

  }

});

const mapStateToProps = (state) => {
  const { userInfo, } = state

  return { userInfo, }
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    setUserInfo,
  }, dispatch)
);
export default connect(mapStateToProps, mapDispatchToProps)(ChronicDisease);