import React, { Component } from "react";

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("window");

export default class AlexaSetup extends Component {

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{marginBottom: width * 0.05}}>
          <Text style={styles.message}>
            Please review our privacy policy
          </Text>
        </View>
        <View style={{flex: 5, alignItems: "center", justifyContent: "center"}}>
          <ScrollView >
            <Text style={styles.policy}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              vitae tortor vel ex venenatis fermentum. Vivamus at finibus mauris,
              et tristique diam. Fusce bibendum, elit eget tempor vulputate,
              mauris augue vehicula diam, at euismod odio purus nec tellus. Etiam
              auctor elit dui, et posuere odio ornare sit amet. Nulla facilisi.
              Nulla semper quis lacus id posuere. Nulla facilisi. Fusce et neque
              tincidunt nisl tincidunt tincidunt. Interdum et malesuada fames ac
              ante ipsum primis in faucibus. Nunc interdum ante eu semper
              lobortis. Duis semper, purus eget mollis dapibus, mauris est rutrum
              ante, auctor imperdiet sem diam sit amet tellus. Cras eget gravida
              dui. Etiam nec massa urna. Duis eget lorem nec massa blandit
              sagittis at quis magna. Quisque ut nibh vulputate, viverra eros et,
              fermentum nisi. Maecenas nec libero nec augue placerat accumsan.
              Pellentesque egestas dui eget ex facilisis, at laoreet diam
              accumsan. Pellentesque nec tellus arcu. Pellentesque a nulla
              ultrices, facilisis urna id, venenatis dui. Cras tempus magna id
              eros ultrices, sed laoreet urna luctus. Donec facilisis, sapien nec
              vehicula sollicitudin, erat mauris pretium nibh, tempor imperdiet
              libero ante non elit. Ut lorem erat, finibus non magna sed,
              ullamcorper placerat risus. Mauris non leo ac orci sodales molestie
              a vitae turpis. Quisque lacinia magna egestas tortor tempor, vel
              viverra arcu aliquet. In consectetur eu risus eget hendrerit. Sed ut
              augue vitae tellus tristique aliquet. Donec egestas cursus urna, et
              tincidunt massa viverra nec. Vivamus rutrum, nisl nec accumsan
              interdum, ex sem semper nibh, id varius mauris purus sit amet dui.
              Etiam ut aliquam velit. Ut placerat dolor sed gravida convallis.
              Nullam egestas, libero eu posuere luctus, velit tortor placerat
              nunc, nec convallis sapien orci quis nunc. Suspendisse ut molestie
              ante.
            </Text>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: 'column',
    // alignItems: "center",
    justifyContent: "center",
    width: width * 0.9
  },
  message: {
    color: "#505050",
    fontSize: 25,
    textAlign: "left"
  },
  policy: {
    fontSize: 20,
    color: "#707070",
  },
});
