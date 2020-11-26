import * as React from "react";
import { StyleSheet, AsyncStorage } from "react-native";
import { Appbar, Avatar } from "react-native-paper";
import { scale, verticalScale, moderateScale } from "./Scale";

const Header = ({ navigation, quitSaveMode = false, params }) => {
  const onQuit = () => {
    navigation.popToTop();
  };

  console.log("Quit Header State: " + JSON.stringify(params));
  var isPressed = 0;
  const formatDate = (date) => {
    let formattedDate =
      (date.getMonth() > 8
        ? date.getMonth() + 1
        : "0" + (date.getMonth() + 1)) +
      "-" +
      (date.getDate() > 9 ? date.getDate() : "0" + date.getDate()) +
      "-" +
      date.getFullYear();
    return formattedDate;
  };

  const postData = async (postPreObj) => {
    const userId = (await AsyncStorage.getItem("userId")) || "none";

    const headers = {
      Authorization: userId,
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    try {
      let res = await fetch(
        "https://srobvq5uw2.execute-api.us-west-2.amazonaws.com/dev/symptom",
        {
          method: "POST",
          headers,
          body: JSON.stringify(postPreObj),
        }
      );
      res = await res.json();
      isPressed = 0;
    } catch (e) {
      console.error(e);
    }
  };

  const onQuitAndSave = () => {
    if (isPressed == 0) {
      let {
        symptomConsistency,
        symptomDescription,
        frequency,
        symptomLocationDescription,
        severity,
        symptomMovement,
        symptomName,
        startDate,
        symptomLocation,
      } = params;

      console.log(params);

      let postPreObj = {
        symptomName,
        startDate: formatDate(new Date(parseInt(startDate))),
        symptomLocation,
        symptomLocationDescription: symptomLocationDescription ? symptomLocationDescription : "N/A",
        symptomConsistency,
        severity: severity ? severity : 0,
        symptomDescription: symptomDescription.toString(),
        symptomMovement: symptomMovement,
        frequency,
        previousItemId: "0",
      };
      //console.log(postPreObj);
      isPressed = 1;
      navigation.popToTop();
      postData(postPreObj);
    }
  };

  if (quitSaveMode) {
    return (
      <Appbar.Header style={styles.appbar}>
        <Appbar.Content
          titleStyle={styles.appTitle}
          title="Save & Quit"
          onPress={() => onQuitAndSave()}
        />
      </Appbar.Header>
    );
  }

  return (
    <Appbar.Header style={styles.appbar}>
      <Appbar.Content
        titleStyle={styles.appTitle}
        title="Quit"
        onPress={() => onQuit()}
      />
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  appbar: {
    backgroundColor: "white",
    //alignItems: "flex-end",
    elevation: 0,
  },
  appTitle: {
    color: "#ffc909",
    fontSize: moderateScale(16),
    textAlign: "right",
    alignSelf: "stretch",
  },
});

export default Header;
