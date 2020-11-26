import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Image
} from "react-native";
import { FAB } from "react-native-paper";
import NavigationArrows from "../../components/NavigationArrows";
import Slider from "@react-native-community/slider";

const { width } = Dimensions.get("window");

export default class PainScale extends Component {
  state = {
    severity: "",
    left: -3
  };

  updateProperty = (key, value) => {
    this.setState({ [key]: value });
  };
  params = this.props.route.params;

  onValueChange = (val) => {
    var left = ((val - 1) * ((width - 40) / 10)) - 3;
    this.setState({ severity: val, left })

  }
  render() {
    const onEditComplete = () => {
      this.params.updateParams("severity", this.state.severity);
      this.props.navigation.pop();
    };

    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.message}>
          On a scale of 1 to 10, 1 being mild and 10 being the worst ever, how would you rate the symptom?
        </Text>
        <View style={{ left: this.state.left, top: "8%", alignContent: "flex-start", width: width - 40, marginStart: 10 }}>
          <Image style={{ width: 32, height: 62 }}
            source={require('../../assets/value_indicator.png')} />
          <Text style={{ position: 'absolute', width: 32, paddingTop: 2, textAlign: "center", fontSize: 20, color: '#ffffff' }}>{this.state.severity ? this.state.severity : 1}</Text>
        </View>
        <Slider
          style={{ width: width - 40, height: 80, marginLeft: 10, marginRight: 10, marginTop:10, marginBottom:0 }}
          minimumValue={1}
          maximumValue={10}
          minimumTrackTintColor="#ffc909"
          maximumTrackTintColor="#ffc9093C"
          step={1}
          thumbTintColor="#ffc909"
          onSlidingComplete={(val) => this.setState({ severity: val })}
          onValueChange={(val) => this.onValueChange(val)}
        />
        <Image style={{marginStart:10, width:width-40, marginEnd:10, height:30, marginTop:"-5%"}} source={require('../../assets/rating_smiley.png')} resizeMode="stretch"/> 
        {this.params.updateParams ? (
          <FAB style={styles.fab} icon="check" onPress={onEditComplete} />
        ) : (
            <NavigationArrows
              nextScreen="DescriptionText"
              props={this.props}
              propsToPass={{ severity: this.state.severity }}
            />
          )}
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
  boldText: {
    fontWeight: "bold",
  },
  fab: {
    position: "absolute",
    margin: 20,
    backgroundColor: "#ffc909",
    right: 0,
    bottom: 40,
  },
});
