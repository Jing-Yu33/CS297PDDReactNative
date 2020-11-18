import * as React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Appbar, Avatar } from "react-native-paper";

const Header = ({ scene, previous, navigation }) => {
  const { options } = scene.descriptor;
  const title =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
        ? options.title
        : scene.route.name;
  const showPlusSign = title == "Home" ? true : false;

  return (
    <Appbar.Header style={styles.appbar}>
      {previous ? (
        <Appbar.BackAction
          onPress={navigation.pop}
        //color={theme.colors.primary}
        />
      ) : (
          <TouchableOpacity
            onPress={() => {
              navigation.openDrawer();
            }}>
            <Avatar.Icon
              size={50}
              icon="menu"
              backgroundColor = "#fff"
              color="#f4891e"
            />
          </TouchableOpacity>
        )}
      <Appbar.Content titleStyle={styles.appTitle} title={title==="Home"?"Symptom(s)" : title} />
      {showPlusSign && (
        <Appbar.Action
          icon="plus"
          style={{ marginLeft: "auto" , color : "#f4891e"}}
          color = "#f4891e"
          onPress={() => navigation.push("Intro")}
        />
      )}
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  appbar: {
    backgroundColor: "white",
  },
  appTitle: {
    color: "#F4892C",
  },
});

export default Header;
