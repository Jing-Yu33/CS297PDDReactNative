import React, { Component, Fragment } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Dimensions,
  StatusBar,
  AsyncStorage,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import NavigationArrows from "../../components/NavigationArrows";
import { scale, verticalScale, moderateScale } from "../../components/Scale";
import { Button, FAB } from "react-native-paper";
import { TextInput } from "react-native-paper";
import ImageMapper from "react-native-image-mapper";
import { Switch } from "react-native-paper";

const { width, height } = Dimensions.get("window");
const maleFront = require("../../assets/Male_Front.png");
const maleBack = require("../../assets/Male_Back.png");
const femaleFront = require("../../assets/Female_Front.png");
const femaleBack = require("../../assets/Female_Back.png");

const bodyWidth = moderateScale(243);
const bodyHeight = moderateScale(510);

const frontMapping = [
  {
    id: "1",
    name: "Head",
    shape: "circle",
    x1: bodyWidth * 0.427,
    y1: bodyHeight * 0.0001,
    radius: moderateScale(35),
    //prefill: "red",
    fill: "#F4891E",
  },
  {
    id: "2",
    name: "Face",
    shape: "circle",
    x1: bodyWidth * 0.415,
    y1: bodyHeight * 0.05,
    radius: moderateScale(40),
    //prefill: "red",
    fill: "#F4891E",
  },
  {
    id: "28",
    name: "Throat",
    shape: "circle",
    x1: bodyWidth * 0.415,
    y1: bodyHeight * 0.12,
    radius: moderateScale(40),
    //prefill: "red",
    fill: "#F4891E",
  },
  {
    id: "5",
    name: "Right Shoulder",
    shape: "circle",
    x1: bodyWidth * 0.215,
    y1: bodyHeight * 0.16,
    radius: moderateScale(40),
    //prefill: "red",
    fill: "#F4891E",
  },
  {
    id: "4",
    name: "Left Shoulder",
    shape: "circle",
    x1: bodyWidth * 0.615,
    y1: bodyHeight * 0.16,
    radius: moderateScale(40),
    //prefill: "red",
    fill: "#F4891E",
  },
  {
    id: "6",
    name: "Chest",
    shape: "circle",
    x1: bodyWidth * 0.38,
    y1: bodyHeight * 0.2,
    radius: moderateScale(60),
    //prefill: "red",
    fill: "#F4891E",
  },
  {
    id: "8",
    name: "Right Upper Arm",
    shape: "circle",
    x1: bodyWidth * 0.15,
    y1: bodyHeight * 0.26,
    radius: moderateScale(50),
    //prefill: "red",
    fill: "#F4891E",
  },
  {
    id: "12",
    name: "Right Lower arm",
    shape: "circle",
    x1: bodyWidth * 0.09,
    y1: bodyHeight * 0.37,
    radius: moderateScale(50),
    //prefill: "red",
    fill: "#F4891E",
  },
  {
    id: "14",
    name: "Right Palm",
    shape: "circle",
    x1: bodyWidth * 0.001,
    y1: bodyHeight * 0.48,
    radius: moderateScale(50),
    //prefill: "red",
    fill: "#F4891E",
  },
  {
    id: "7",
    name: "Left Upper Arm",
    shape: "circle",
    x1: bodyWidth * 0.65,
    y1: bodyHeight * 0.25,
    radius: moderateScale(50),
    //prefill: "red",
    fill: "#F4891E",
  },
  {
    id: "11",
    name: "Left Lower Arm",
    shape: "circle",
    x1: bodyWidth * 0.7,
    y1: bodyHeight * 0.36,
    radius: moderateScale(50),
    //prefill: "red",
    fill: "#F4891E",
  },
  {
    id: "13",
    name: "Left Palm",
    shape: "circle",
    x1: bodyWidth * 0.8,
    y1: bodyHeight * 0.48,
    radius: moderateScale(50),
    //prefill: "red",
    fill: "#F4891E",
  },
  {
    id: "15",
    name: "Stomach",
    shape: "circle",
    x1: bodyWidth * 0.375,
    y1: bodyHeight * 0.33,
    radius: moderateScale(65),
    //prefill: "red",
    fill: "#F4891E",
  },
  {
    id: "27",
    name: "Genital",
    shape: "circle",
    x1: bodyWidth * 0.42,
    y1: bodyHeight * 0.48,
    radius: moderateScale(45),
    //prefill: "red",
    fill: "#F4891E",
  },
  {
    id: "25",
    name: "Right Hip",
    shape: "circle",
    x1: bodyWidth * 0.25,
    y1: bodyHeight * 0.49,
    radius: moderateScale(40),
    //prefill: "red",
    fill: "#F4891E",
  },
  {
    id: "24",
    name: "Left Hip",
    shape: "circle",
    x1: bodyWidth * 0.61,
    y1: bodyHeight * 0.49,
    radius: moderateScale(40),
    //prefill: "red",
    fill: "#F4891E",
  },
  {
    id: "17",
    name: "Right Thigh",
    shape: "circle",
    x1: bodyWidth * 0.3,
    y1: bodyHeight * 0.58,
    radius: moderateScale(50),
    //prefill: "red",
    fill: "#F4891E",
  },
  {
    id: "16",
    name: "Left Thigh",
    shape: "circle",
    x1: bodyWidth * 0.5,
    y1: bodyHeight * 0.58,
    radius: moderateScale(50),
    //prefill: "red",
    fill: "#F4891E",
  },
  {
    id: "19",
    name: "Right Knee",
    shape: "circle",
    x1: bodyWidth * 0.34,
    y1: bodyHeight * 0.69,
    radius: moderateScale(40),
    //prefill: "red",
    fill: "#F4891E",
  },
  {
    id: "18",
    name: "Left Knee",
    shape: "circle",
    x1: bodyWidth * 0.5,
    y1: bodyHeight * 0.69,
    radius: moderateScale(40),
    //prefill: "red",
    fill: "#F4891E",
  },
  {
    id: "21",
    name: "Right Lower Leg",
    shape: "circle",
    x1: bodyWidth * 0.34,
    y1: bodyHeight * 0.8,
    radius: moderateScale(45),
    //prefill: "red",
    fill: "#F4891E",
  },
  {
    id: "20",
    name: "Left Lower Leg",
    shape: "circle",
    x1: bodyWidth * 0.5,
    y1: bodyHeight * 0.8,
    radius: moderateScale(45),
    //prefill: "red",
    fill: "#F4891E",
  },
  {
    id: "23",
    name: "Right Foot",
    shape: "circle",
    x1: bodyWidth * 0.34,
    y1: bodyHeight * 0.92,
    radius: moderateScale(42),
    //prefill: "red",
    fill: "#F4891E",
  },
  {
    id: "22",
    name: "Left Foot",
    shape: "circle",
    x1: bodyWidth * 0.49,
    y1: bodyHeight * 0.92,
    radius: moderateScale(42),
    //prefill: "red",
    fill: "#F4891E",
  },
];

const backMapping = [
  {
    id: "3",
    name: "Neck",
    shape: "circle",
    x1: bodyWidth * 0.415,
    y1: bodyHeight * 0.1,
    radius: moderateScale(40),
    //prefill: "red",
    fill: "#F4891E",
  },
  {
    id: "9",
    name: "Left Elbow",
    shape: "circle",
    x1: bodyWidth * 0.12,
    y1: bodyHeight * 0.32,
    radius: moderateScale(48),
    //prefill: "red",
    fill: "#F4891E",
  },
  {
    id: "26",
    name: "Back",
    shape: "circle",
    x1: bodyWidth * 0.35,
    y1: bodyHeight * 0.3,
    radius: moderateScale(70),
    //prefill: "red",
    fill: "#F4891E",
  },
  {
    id: "10",
    name: "Right Elbow",
    shape: "circle",
    x1: bodyWidth * 0.69,
    y1: bodyHeight * 0.32,
    radius: moderateScale(48),
    //prefill: "red",
    fill: "#F4891E",
  },
];

export default class Location extends Component {
  state = {
    symptomLocation: "",
    symptomNames: [],
    userObj: {
      gender: "Male",
    },
    stage: 1,
    locationText: "",
    textBtnLbl: "Text",
    isFront: true,
  };

  async componentDidMount() {

    if (this.params && frontMapping && this.params.symptomLocation) {
      let item = frontMapping.find(el => el.name === this.params.symptomLocation);
      if (!item) {
        item = backMapping.find(el => el.name === this.params.symptomLocation);
      }
      if (item) {
        this.setState({
          symptomLocation: item.name,
          symptomId: item.id,
          locationText: item.name,
        });
      }
    }
  }

  mapperAreaClickHandler = async (item, idx, event) => {
    this.setState({
      symptomLocation: item.name,
      symptomId: item.id,
      locationText: item.name,
    });
  };

  updateProperty = (key, value) => {
    this.setState({ [key]: value });
  };

  params = this.props.route.params;

  render() {
    const onEditComplete = () => {
      this.params.updateParams("symptomLocation", this.state.symptomLocation);
      this.params.updateParams("symptomLocationDescription", this.state.symptomLocationDescription);
      // this.params.updateParams("locationText", this.state.locationText);
      this.props.navigation.pop();
    };


    return (
      <SafeAreaView style={styles.container}>

        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : ""}
          keyboardVerticalOffset={30}
          contentContainerStyle={styles.avoidingView}
          style={styles.container}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={[styles.container]}>
              <Text style={styles.message}>
                Describe the location of your symptom? (optional)
              </Text>
              {this.state.stage === Number(1) && (
                <View style = {{width: width, flex : 1, alignContent:"center", justifyContent:"center", alignItems:"center"}}>
                  <View style={styles.switchRow}>
                    <Button onPress = {() => this.setState({ isFront: false })} mode= "outlined" color="#000" style={[styles.frontBackButton, {borderColor : this.state.isFront? "#E2E2E2" : "#ffc909"}]}>BACK</Button>
                    
                    <Button onPress = {() => {this.setState({ isFront: true })}} mode= "outlined" color="#000" style={[styles.frontBackButton, {borderColor : this.state.isFront? "#ffc909" : "#E2E2E2"}]} >FRONT</Button>
                  </View>
                  <ScrollView style = {{width: "100%",  }}>
                    {this.state.isFront ? (
                      <ImageMapper
                        imgHeight={bodyHeight}
                        imgWidth={bodyWidth}
                        imgSource={
                          this.state.userObj.gender.toString().toLowerCase() === "male" ? maleFront : femaleFront
                        }
                        imgMap={frontMapping}
                        onPress={(item, idx, event) =>
                          this.mapperAreaClickHandler(item, idx, event)
                        }
                        containerStyle={styles.leftBody}
                        selectedAreaId={this.state.symptomId}
                      />
                    ) : (
                        <ImageMapper
                          imgHeight={bodyHeight}
                          imgWidth={bodyWidth}
                          imgSource={
                            this.state.userObj.gender == "Male" ? maleBack : femaleBack
                          }
                          imgMap={backMapping}
                          onPress={(item, idx, event) =>
                            this.mapperAreaClickHandler(item, idx, event)
                          }
                          containerStyle={styles.rightBody}
                          selectedAreaId={this.state.symptomId}
                        />
                      )
                    }
                    <View style={{height: 100}}/>
                  </ScrollView>
                </View>
              )}
              {this.state.stage === Number(2) && (

                <TextInput
                  style={styles.textInput}
                  mode="outlined"
                  placeholder="Enter location of symptom"
                  multiline={true}
                  onChangeText={(text) => this.setState({ symptomLocationDescription: text })}
                />  
              )}
              <FAB
                style={styles.fab_text}
                //icon="plus"
                color="#ffc909"
                label={this.state.textBtnLbl}
                onPress={() => {
                  if (this.state.textBtnLbl == "Text") {
                    this.setState({ textBtnLbl: "Graph", stage: 2 });
                  } else {
                    this.setState({ textBtnLbl: "Text", stage: 1 });
                  }
                }}
              />
              {this.params.updateParams ? (
                <FAB style={styles.fab} icon="check" onPress={onEditComplete} />
              ) : (
                  <NavigationArrows
                    nextScreen="PainMovement"
                    props={this.props}
                    propsToPass={{
                      symptomLocation: this.state.symptomLocation,
                    }}
                  />
                )}
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
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
    //paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  message: {
    marginHorizontal: 20,
    textAlign: "center",
    fontSize: 25,
    marginBottom: 20,
  },
  boldText: {
    fontWeight: "bold",
  },
  buttonLabel: {
    color: "#505050",
    fontSize: 18,
  },
  button: {
    margin: 10,
    width: width - 40,
    borderColor: "#E2E2E2",
    borderWidth: 1,
    borderRadius: 25,
  },
  frontBackButton : {
    marginStart: "6%",
    marginEnd : "6%",
    color : "#000",
    borderWidth : 2,
    borderRadius : 10
  },
  fab_text: {
    position: "absolute",
    backgroundColor: "white",
    textTransform: "lowercase",
    left: 0,
    bottom: 40,
    marginStart: "5%"
    //color: "#ffc909",
  },
  textInput: {
    //height: height * 0.2,
    backgroundColor: "white",
    width: width - 40,
    marginBottom: "20%"
  },
  leftBody: {
    padding: moderateScale(20),
    alignSelf: "center"
  },
  rightBody: {
    padding: moderateScale(20),
    alignSelf: "center"
  },
  switchRow: {
    flexDirection: "row",
    alignSelf: "center"
  },
  fab: {
    position: "absolute",
    margin: 20,
    backgroundColor: "#ffc909",
    right: 0,
    bottom: 40,
  },
  avoidingView: {
    borderRadius: 10,

  },
});
