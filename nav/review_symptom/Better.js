import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Dimensions,
  AsyncStorage,
  Image
} from "react-native";
import NavigationArrows from "../../components/NavigationArrows";
import Slider from "@react-native-community/slider";
import { scale, verticalScale, moderateScale } from "../../components/Scale";

const { width } = Dimensions.get("window");

export default class Better extends Component {
  state = {
    rateSymptom: "",
    conditionType: "",
    symptomNumber: "",
    severity: "",
    oldSeverity: "",
    left: -3
  };
  onValueChange = (val) => {
    var left = ((val - 1) * ((width - 40) / 10)) - 3;
    this.setState({ severity: val, left })

  }
  componentDidMount() {
    const { conditionType, symptomNumber, severity } = this.props.route.params;
    console.log(this.props.route.params);
    this.setState({ conditionType, symptomNumber, oldSeverity: severity });
  }

  onEditComplete = async () => {
    this.props.navigation.navigate("Review", {"reviewProcess" : true, "severity" : this.state.rateSymptom, "symptomNumber" : this.state.symptomNumber });
    
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {this.state.conditionType === "better" ? (
          <Text style={styles.orangetext}>Getting Better?</Text>
        ) : (
            <Text style={styles.orangetext}>Getting Worse?</Text>
          )}
        <Text style={styles.message}>
          On a scale of 0 to 10, 1 being mild and 10 being the worst ever, how
          would you rate your symptom?
        </Text>
        <View style={{ left: this.state.left, top: "7%", alignContent: "flex-start", width: width - 40, marginStart: 10 }}>
          <Image style={{ width: 32, height: 62 }}
            source={require('../../assets/value_indicator.png')} />
          <Text style={{ position: 'absolute', width: 32, paddingTop: 2, textAlign: "center", fontSize: 20, color: '#ffffff' }}>{this.state.severity ? this.state.severity : 1}</Text>
        </View>
        <Slider
          style={{ width: width - 40, height: 80, marginLeft: 10, marginRight: 10, marginTop: 10, marginBottom: 0 }}
          minimumValue={1}
          maximumValue={10}
          minimumTrackTintColor="#F4892C"
          maximumTrackTintColor="#F4892C3C"
          step={1}
          thumbTintColor="#F4892C"
          onSlidingComplete={(val) => this.setState({ severity: val })}
          onValueChange={(val) => this.onValueChange(val)}
        />
        <Image style={{ marginStart: 10, width: width - 40, marginEnd: 10, height: 30, marginTop: "-5%" }} source={require('../../assets/rating_smiley.png')} resizeMode="stretch" />
        <Text style={styles.orangetextmiddle}>
          Your previous entry is {this.state.oldSeverity}
        </Text>
        <NavigationArrows
          props={this.props}
          
          checkOnPress={this.onEditComplete}
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
  slider: {
    width: width - scale(40),
    height: verticalScale(80),
    margin: moderateScale(10),
  },
  orangetext: {
    color: "#F4892C",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "left",
    alignSelf: "stretch",
    marginLeft: 20,
    marginBottom: 10,
  },
  orangetextmiddle: {
    color: "#F4892C",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    alignSelf: "stretch",
    marginBottom: verticalScale(10),
  },
});
