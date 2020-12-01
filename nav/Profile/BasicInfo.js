import React, { Component } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Text,
  View,
  AsyncStorage,
} from "react-native";
import { List, Avatar, Divider, Caption, FAB } from "react-native-paper";
import { scale, moderateScale, verticalScale } from "../../components/Scale";
import { connect } from 'react-redux';

class BasicInfo extends Component {
  state = {
    UserInfo: {},
  };

  async componentDidMount() {
    const userObj = (await AsyncStorage.getItem("userObj")) || "none";
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
        <Caption style={styles.caption}>Tap to change avatar</Caption>
        <View style={styles.userinfo}>
          <Text style={styles.orangeText}>Name</Text>
          <Text style={styles.userText}>{this.state.UserInfo.username}</Text>
          <Text style={styles.orangeText}>Gender</Text>
          <Text style={styles.userText}>{this.state.UserInfo.gender}</Text>
          <Text style={styles.orangeText}>Date of Birth</Text>
          <Text style={styles.userText}>
            {new Date(this.state.UserInfo.dateOfBirth).toDateString()}
          </Text>
        </View>
        <FAB
          style={styles.fab}
          icon="arrow-left"
          onPress={() => {
            // TODO: Send API request to schedule
            this.props.navigation.pop();
          }}
          color = "#F4892C"
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
    padding: moderateScale(20),
  },
  caption: {
    marginBottom: verticalScale(30),
  },
  userinfo: {
    justifyContent: "flex-start",
    alignSelf: "stretch",
    alignItems: "flex-start",
  },
  orangeText: {
    color: "#F4892C",
    fontSize: 16,
    fontWeight: "bold",
  },
  userText: {
    fontSize: moderateScale(26),
    marginBottom: verticalScale(10),
  },
  fab: {
    position: "absolute",
    margin: 16,
    backgroundColor: "#FFF",
    right: 0,
    bottom: 40,
  },
});

const mapStateToProps = (state) => {
  const { profileImageUrl } = state
  return { profileImageUrl }
};

export default connect(mapStateToProps)(BasicInfo);