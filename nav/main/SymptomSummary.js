import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Dimensions,
  StatusBar,
  Platform,
  AsyncStorage,
  Image
} from "react-native";
import { Divider, FAB } from "react-native-paper";
import { scale, verticalScale, moderateScale } from "../../components/Scale";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { connect } from 'react-redux';

const { width, height } = Dimensions.get("window");

class SymptomSummary extends Component {
  state = {
    editMode: false,
  };

  postCompleteData = async (postCompleteObj, symptomNumber) => {
    const userId = (await AsyncStorage.getItem("userId")) || "none";
    const headers = {
      Authorization: userId,
      "Content-Type": "application/json",
    };
    console.log("incomplete symptom number");
    console.log(symptomNumber);
    console.log("Symptom Summary postCompleteData   " + JSON.stringify(postCompleteObj));
    try {
      let res = await fetch(
        "https://srobvq5uw2.execute-api.us-west-2.amazonaws.com/dev/symptom/" +
        symptomNumber,
        {
          method: "PATCH",
          headers,
          body: JSON.stringify(postCompleteObj),
        }
      );
      res = await res.json();
      this.setState({editMode: false})
      console.log(res);
    } catch (e) {
      console.error(e);
    }
  };

  onSubmit = () => {

    if (!this.state.editMode) {
      console.log("SymptomSummary : OnSubmit");
      this.props.navigation.pop();

    } else {
      this.constructPostObject();
    }
  };
  constructPostObject = () => {
    let {
      betterCondition,
      impactToLife,
      symptomConsistency,
      symptomDescription,
      frequency,
      symptomLocationDescription,
      severity,
      symptomMovement,
      otherRelatedSymptom,
      resolvedDate,
      reviewTime,
      symptomName,
      startDate,
      worseCondition,
      symptomLocation,
      recordTime,
      incompleteFlag,
    } = this.state;

    let postCompleteObj = {
      betterCondition,
      worseCondition,
      reviewTime: reviewTime ? reviewTime : "0",
      impactToLife,
      otherRelatedSymptom: otherRelatedSymptom.toString(),
      resolvedDate: resolvedDate ? resolvedDate : "",
      symptomName,
      startDate: startDate,
      symptomLocation,
      symptomLocationDescription: symptomLocationDescription ? symptomLocationDescription : "N/A",
      symptomConsistency,
      severity: severity ? severity : 0,
      symptomDescription: symptomDescription.toString(),
      symptomMovement,
      frequency,
      previousItemId: "0",
    };
    this.postCompleteData(postCompleteObj, recordTime.split('#')[1]);
  };
  updateProperty = (key, value) => {
    this.setState({ [key]: value });
  };
  onEdit = () => {
    this.setState({ editMode: !this.state.editMode });
  };

  formData = this.props.route.params;

  updateParams = (key, value) => {
    this.setState({ [key]: value });
  };

  componentDidMount() {
    if (this.props.route.params.notEditItem) {
      this.setState(this.props.route.params.item);
    } else {
      this.setState(this.props.route.params);
    }
  }

  render() {
    // console.log("SymptomSummary : props from Render is " + JSON.stringify(this.props))
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ width: "100%" }}>
          {this.state.editMode ? (
            <Text style={styles.orangeTitle}>Edit Mode</Text>
          ) : (
              <Text style={styles.orangeTitle}>Summary</Text>
            )}
          <View style={styles.row}>
            <Text style={styles.mainHeader}>
              {this.state.symptomName
                ? this.state.symptomName
                : "N/A"}
            </Text>
            {this.state.editMode && (
              <MaterialCommunityIcons paddingStart = "10"
                name="pencil"
                size={24}
                color="#F4892C"
                onPress={() =>
                  this.props.navigation.push("SelectSymptomsNew", {
                    updateParams: this.updateParams,
                  })
                }
              />
            )}
          </View>
          <View>
            {this.state.symptomLocation ? <Image source={{ uri: 'https://myhealthtoday-body-parts.s3.us-west-2.amazonaws.com/public/' + this.props.userInfo.gender.toString().toLowerCase() + '_full_body_' + this.state.symptomLocation.toString().replace(/\s/g, '_').toLowerCase() + '.png' }}
              style={styles.bodyImage} /> : <Image source={{ uri: 'https://myhealthtoday-body-parts.s3.us-west-2.amazonaws.com/public/' + this.props.userInfo.gender.toString().toLowerCase() + '_full_body_na.png' }}
                style={styles.bodyImage} />}
            <Divider />
          </View>
        </View>
        {/* {console.log(this.state)} */}
        <ScrollView style={{ width: "100%" }}>
          <Text style={styles.header}>Onset</Text>
          <View style={styles.row}>
            <Text style={styles.value}>
              {this.state.startDate
                ? this.state.startDate
                : "N/A"}
            </Text>
            {this.state.editMode && (
              <MaterialCommunityIcons paddingStart = "10"
                name="pencil"
                size={24}
                color="#F4892C"
                onPress={() =>
                  this.props.navigation.push("Timeline", {
                    updateParams: this.updateParams,
                  })
                }
              />
            )}
          </View>
          <Text style={styles.header}>Impact</Text>
          <View style={styles.row}>
            <Text style={styles.value}>
              {this.state.impactToLife ? this.state.impactToLife : "N/A"}/10
            </Text>
            {this.state.editMode && (
              <MaterialCommunityIcons paddingStart = "10"
                name="pencil"
                size={24}
                color="#F4892C"
                onPress={() =>
                  this.props.navigation.push("BotherScale", {
                    updateParams: this.updateParams,
                  })
                }
              />
            )}
          </View>
          <Text style={styles.header}>Severity</Text>
          <View style={styles.row}>
            <Text style={styles.value}>
              {this.state.severity ? this.state.severity : "N/A"}/10
            </Text>
            {this.state.editMode && (
              <MaterialCommunityIcons paddingStart = "10"
                name="pencil"
                size={24}
                color="#F4892C"
                onPress={() =>
                  this.props.navigation.push("PainScale", {
                    updateParams: this.updateParams,
                  })
                }
              />
            )}
          </View>
          <Text style={styles.header}>Location</Text>
          <View style={styles.row}>
            <Text style={styles.value}>
              {this.state.symptomLocation ? this.state.symptomLocation : "N/A"}
            </Text>
            {this.state.editMode && (
              <MaterialCommunityIcons paddingStart = "10"
                name="pencil"
                size={24}
                color="#F4892C"
                onPress={() =>
                  this.props.navigation.push("Location", {
                    updateParams: this.updateParams,
                    "symptomLocation"  : this.state.symptomLocation
                  })
                }
              />
            )}
          </View>
          <Text style={styles.header}>Timing</Text>
          <View style={styles.row}>
            <Text style={styles.value}>
              {this.state.frequency ? this.state.frequency : "N/A"};{" "}
              {this.state.symptomConsistency ? this.state.symptomConsistency : "N/A"}
            </Text>
            {this.state.editMode && (
              <MaterialCommunityIcons paddingStart = "10"
                name="pencil"
                size={24}
                color="#F4892C"
                onPress={() =>
                  this.props.navigation.push("Frequency", {
                    updateParams: this.updateParams,
                  })
                }
              />
            )}
          </View>
          <Text style={styles.header}>Characteristics</Text>
          <View style={styles.row}>
            <Text style={styles.value}>
              {this.state.symptomDescription
                ? this.state.symptomDescription.toString()
                : "N/A"}
            </Text>
            {this.state.editMode && (
              <MaterialCommunityIcons paddingStart = "10"
                name="pencil"
                size={24}
                color="#F4892C"
                onPress={() =>
                  this.props.navigation.push("DescriptionText", {
                    updateParams: this.updateParams,
                  })
                }
              />
            )}
          </View>
          <Text style={styles.header}>Alleviation (I feel better when...)</Text>
          <View style={styles.row}>
            <Text style={styles.value}>
              {this.state.betterCondition ? this.state.betterCondition : "N/A"}
            </Text>
            {this.state.editMode && (
              <MaterialCommunityIcons paddingStart = "10"
                name="pencil"
                size={24}
                color="#F4892C"
                onPress={() =>
                  this.props.navigation.push("FeelBetter", {
                    updateParams: this.updateParams,
                  })
                }
              />
            )}
          </View>
          <Text style={styles.header}>Aggrevation (I feel worse when...)</Text>
          <View style={styles.row}>
            <Text style={styles.value}>
              {this.state.worseCondition ? this.state.worseCondition : "N/A"}
            </Text>
            {this.state.editMode && (
              <MaterialCommunityIcons paddingStart = "10"
                name="pencil"
                size={24}
                color="#F4892C"
                onPress={() =>
                  this.props.navigation.push("FeelWorse", {
                    updateParams: this.updateParams,
                  })
                }
              />
            )}
          </View>
          <Text style={styles.header}>Associated Symptoms</Text>
          <View style={styles.row}>
            <Text style={styles.value}>
              {this.state.otherRelatedSymptom
                ? this.state.otherRelatedSymptom.toString()
                : "N/A"}
            </Text>
            {this.state.editMode && (
              <MaterialCommunityIcons paddingStart = "10"
                name="pencil"
                size={24}
                color="#F4892C"
                
                onPress={() =>
                  this.props.navigation.push("RelatedSymptoms", {
                    updateParams: this.updateParams,
                  })
                }
              />
            )}
          </View>
          <Text style={styles.header}>Symptom Radiation</Text>
          <View style={styles.row}>
            <Text style={styles.value}>
              {this.state.symptomMovement ? this.state.symptomMovement : "N/A"}
            </Text>
            {this.state.editMode && (
              <MaterialCommunityIcons paddingStart = "10"
                name="pencil"
                size={24}
                color="#F4892C"
                onPress={() =>
                  this.props.navigation.push("PainMovement", {
                    updateParams: this.updateParams,
                  })
                }
              />
            )}
          </View>
          <Text style={styles.header}>Status</Text>
          <View style={styles.row}>
            <Text style={styles.value}>
              {console.log("SymptomSummary :: ResolvedDate" + this.state.resolvedDate )}
              {this.state.resolvedDate || this.state.resolvedDate === "0" ? "Ongoing" : "Resolved"}
            </Text>

          </View>
        </ScrollView>

        <View style={styles.buttonRow}>
          {(!this.props.route.params.notEditItem && !this.state.editMode)? <FAB style={styles.fab_left} icon="pencil" onPress={this.onEdit} color="#F4892C" /> : <View />}

          <FAB
            style={styles.fab_right}
            icon={this.state.editMode? "check" : "arrow-left"}
            onPress={this.onSubmit}
            color="#F4892C"
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingStart: "5%",
    backgroundColor: "#fff",
    alignItems: "flex-start",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 0,
    justifyContent: "center",
    paddingBottom : Platform.OS === "android" ? 10 : 0,
  },
  row: {
    flexDirection: "row",
  },
  message: {
    marginHorizontal: 20,
    textAlign: "center",
    fontSize: 25,
    marginBottom: 20,
  },
  buttonRow: {
    position: "absolute",
    right: scale(10),
    bottom: verticalScale(40),
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  mainHeader: {
    fontSize: 20,
    fontWeight: "bold",
  },
  orangeTitle: {
    color: "#F4892C",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "left",
    alignSelf: "stretch",
    marginBottom: 10,
  },
  orangeText: {
    color: "#F4892C",
    fontSize: 18,
    color: "#505050",
    fontWeight: "bold",
  },
  /* fab: {
    position: "absolute",
    margin: 20,
    padding: 10,
    backgroundColor: "#F4892C",
    right: 0,
    bottom: 0,
  }, */
  fab_right: {
    margin: moderateScale(10),
    backgroundColor: "white",
  },
  fab_left: {
    margin: moderateScale(10),
    backgroundColor: "white",
  },
  header: {
    fontSize: 18,
    marginTop: 10,
    color: "#00000099",
  },
  value: {
    fontSize: 18,
    color: "#505050",
    fontWeight: "bold",
  },
  bodyImage: {
    height: 277,
    resizeMode: 'contain',
    marginTop: "10%",
    marginBottom: "5%",
  }
});
const mapStateToProps = (state) => {
  const { userInfo } = state
  return { userInfo }
};

export default connect(mapStateToProps)(SymptomSummary);
