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

export default class BotherScale extends Component {
  state = {
    impactToLife: "",
    left: -3
  };

  updateProperty = (key, value) => {
    this.setState({ [key]: value });
  };

  params = this.props.route.params;
  onValueChange = (val) => {
    var left = ((val - 1) * ((width - 40) / 10)) - 3;
    this.setState({ impactToLife: val, left })

  }
  render() {
    const onEditComplete = () => {
      this.params.updateParams("impactToLife", this.state.impactToLife);
      this.props.navigation.pop();
    };

    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.message}>
          On a scale of 0 to 10, how much has this symptom impacted your daily
          life?
        </Text>
        <View style={{ left: this.state.left, top: "8%", alignContent: "flex-start", width: width - 40, marginStart: 10 }}>
          <Image style={{ width: 32, height: 62 }}
            source={require('../../assets/value_indicator.png')} />
          <Text style={{ position: 'absolute', width: 32, paddingTop: 2, textAlign: "center", fontSize: 20, color: '#ffffff' }}>{this.state.impactToLife ? this.state.impactToLife : 1}</Text>
        </View>
        <Slider
          style={{ width: width - 40, height: 80, marginLeft: 10, marginRight: 10, marginTop:10, marginBottom:0 }}
          minimumValue={1}
          maximumValue={10}
          minimumTrackTintColor="#F4892C"
          maximumTrackTintColor="#F4892C3C"
          step={1}
          thumbTintColor="#F4892C"
          onSlidingComplete={(val) => this.setState({ impactToLife: val })}
          onValueChange={(val) => this.onValueChange(val)}
        />
        <Image style={{marginStart:10, marginEnd:10, height:25, marginTop:"-5%", resizeMode:"stretch"}} source={require('../../assets/rating_smiley.png')}/> 
        {this.params.updateParams ? (
          <FAB style={styles.fab} icon="check" onPress={onEditComplete} />
        ) : (
          <NavigationArrows
            nextScreen="Resolved"
            props={this.props}
            propsToPass={{ impactToLife: this.state.impactToLife }}
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
    backgroundColor: "#F4892C",
    right: 0,
    bottom: 40,
  },
});
