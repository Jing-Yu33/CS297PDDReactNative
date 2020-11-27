import React, { Component } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Text,
  FlatList,
  TouchableHighlight,
  View,
  AsyncStorage,
} from "react-native";
import { List, Avatar, Divider } from "react-native-paper";
import { scale, moderateScale, verticalScale } from "../../components/Scale";
import { connect } from 'react-redux';

class ProfileHome extends Component {
  state = {
    UserInfo: {},
  };

  async componentDidMount() {
    const userObj = (await AsyncStorage.getItem("userObj")) || "none";
    console.log(userObj);
    this.setState({ UserInfo: JSON.parse(userObj) });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Avatar.Image
          size={scale(80)}
          source={{ uri: this.props.profileImageUrl }}
          style={{ backgroundColor: "rgba(0,0,0,0)" }}
          defaultSource={require('../../assets/default_profile.png')}
        />

        <Text style={styles.name}>{this.state.UserInfo.username}</Text>
        <View style={styles.settingsList}>
          <List.Section>
            <List.Item
              title="Basic Info"
              onPress={() => {
                this.props.navigation.push("Basic Info");
              }}
            />
            <Divider />
            <List.Item
              title="Care Team Contacts"
              onPress={() => {
                this.props.navigation.push("CareGiver Contacts");
              }}
            />
            <Divider />
            <List.Item
              title="Chronic Conditions"
              onPress={() => {
                this.props.navigation.push("Chronic diseases");
              }}
            />
            <Divider />
            <List.Item
              title="Account Settings"
              onPress={() => {
                this.props.navigation.push("Account Settings");
              }}
            />
          </List.Section>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: moderateScale(20),
  },
  greeting: {
    fontSize: moderateScale(26),
  },
  name: {
    fontSize: moderateScale(26),
    fontWeight: "bold",
  },
});

const mapStateToProps = (state) => {
  const { profileImageUrl } = state
  return { profileImageUrl }
};

export default connect(mapStateToProps)(ProfileHome);
