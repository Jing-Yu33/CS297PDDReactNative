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
  FlatList,
  Image,
  AsyncStorage,
} from "react-native";
import { FAB, Card, Title } from "react-native-paper";
import { Rating } from "../../components/Rating";
import { EvilIcons } from "@expo/vector-icons";
import { Auth } from "aws-amplify";
import { connect } from 'react-redux';
const { width, height } = Dimensions.get("window");

class Summary extends Component {
  state = {
    userObj: {},
    chiefSymptoms: {},
  };

  async componentDidMount() {
    const userObj = (await AsyncStorage.getItem("userObj")) || "none";
    this.setState({ userObj: JSON.parse(userObj) });
    console.log(userObj);

    let symptomList = this.props.route.params.symptomList;
    let selectedIds = this.props.route.params.selectedIds;
    let chiefList = symptomList.filter((g) =>
      selectedIds.includes(g.recordTime)
    );
    let otherSymptoms = symptomList.filter(
      (g) => !selectedIds.includes(g.recordTime)
    );
    this.setState({ chiefList: chiefList, otherSymptoms: otherSymptoms });
  }

  postData = async (postObj) => {
    const userId = (await AsyncStorage.getItem("userId")) || "none";

    const headers = {
      Authorization: userId,
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    try {
      let res = await fetch(
        "https://srobvq5uw2.execute-api.us-west-2.amazonaws.com/dev/users/reports",
        {
          method: "POST",
          headers,
          body: JSON.stringify(postObj),
        }
      );
      res = await res.json();
      console.log(res);
      this.props.navigation.popToTop();
    } catch (e) {
      console.error(e);
    }
  };

  formatDate = (date) => {
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

  formatDisplayDate = (input) => {
    let date =
      input.getFullYear() +
      "-" +
      (input.getMonth() + 1) +
      "-" +
      input.getDate();

    let time =
      input.getHours() + ":" + input.getMinutes() + ":" + input.getSeconds();

    let dateTime = date + " " + time;
    return dateTime;
  };

  constructandSendPostObject = () => {
    let {
      reportType,
      visitDate,
      additionalNotes,
      selectedIds,
      imageURLs,
      symptomRange,
      symptomList,
    } = this.props.route.params;

    let postObj = {
      appointmentType: "",
      appointmentDate: "",
      chiefcomplaintSymptoms: selectedIds,
      reportNotes: additionalNotes,
      reportAttachments: imageURLs,
      otherSymptoms: symptomList
        .filter((g) => !selectedIds.includes(g.recordTime))
        .map((g) => g.recordTime),
      symptomRange: symptomRange,
    };

    this.postData(postObj);
  };

  onSubmit = () => {
    this.constructPostObject();
  };

  updateProperty = (key, value) => {
    this.setState({ [key]: value });
  };

  formData = this.props.route.params;

  render() {
    const getHeader = () => {
      return (
        <View>
          <Text style={styles.orangeText}>Review</Text>
          <Text style={styles.mainHeader}> Health Report</Text>
          <Text style={styles.mainHeader}>
            {this.formatDisplayDate(new Date())}
          </Text>
          <Text style={styles.header}>Patient Information</Text>

          <Text style={styles.header}>Name</Text>
          <Text style={styles.value}>{userObj.username}</Text>
          <Text style={styles.header}>DOB</Text>
          <Text style={styles.value}>
            {new Date(userObj.dateOfBirth).toDateString()}
          </Text>
          <Text style={styles.header}>Gender</Text>
          <Text style={styles.value}>{userObj.gender}</Text>
          <Text style={styles.header}>Email</Text>
          <Text style={styles.value}>{userObj.email}</Text>

          <Text style={styles.header}>Chief Complaint</Text>
          </View>
      );
    };

    const getFooter = () => {
      return (
        <React.Fragment>
          <Text style={styles.header}>Other Symptoms</Text>
          <FlatList
            data={this.state.otherSymptoms}
            renderItem={renderOtherSymptomItem}
            style={styles.flatlist}
            keyExtractor={(item) => item.recordTime.toString()}
          />

          <Text style={styles.header}>Additional Notes</Text>
          <Text style={styles.value}>{this.formData.additionalNotes}</Text>
          <Text style={styles.header}>Attachments</Text>
          <FlatList
            style={styles.imageScrollView}
            horizontal={true}
            data={this.formData.photos}
            renderItem={renderImage}
          ></FlatList>
        </React.Fragment>
      );
    };

    const renderImage = ({ item }) => {
      return (
        <Image
          style={styles.image}
          source={{ uri: item.uri }}
          key={Math.random() * 100000}
        />
      );
    };

    const renderChiefItem = ({ item }) => (
      <Card style={styles.card} onPress={() => {
        this.props.navigation.push(
          "SymptomSummary", { item, notEditItem: true }
        );
      }}>
        <Card.Cover source={{ uri: 'https://myhealthtoday-body-parts.s3.us-west-2.amazonaws.com/public/' + this.props.userInfo.gender.toString().toLowerCase() + '_mob_' + item.symptomLocation.toString().toLowerCase() + '.png' }}
        />
        <Card.Content>
          <Title style={styles.cardHeading}>{item.symptomName}</Title>
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              marginBottom: 5,
            }}
          >
            <Text>{item.severity}</Text>
            <Rating
              style={{ marginLeft: 10 }}
              rating={item.severity}
            />
          </View>
          <Text>From {item.startDate}</Text>
        </Card.Content>
      </Card>
    );

    const onOtherSympPress = (item) => {
      this.props.navigation.push(
        "SymptomSummary", { item, notEditItem: true }
      );
    };

    const renderOtherSymptomItem = ({ item }) => (
      <Card
        style={styles.card}
        onPress={() => onOtherSympPress(item)}
      >
        <Card.Content>
          <Title style={styles.cardHeading}>{item.symptomName}</Title>
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              marginBottom: 5,
            }}
          >
            <Text>{item.severity}</Text>
            <Rating
              style={{ marginLeft: 10 }}
              rating={item.severity}
            />
          </View>

          <Text>{item.startDate}</Text>
        </Card.Content>
      </Card>
    );

    const { userObj } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={this.state.chiefList}
          renderItem={renderChiefItem}
          style={styles.flatlist}
          keyExtractor={(item) => item.recordTime.toString()}
          ListHeaderComponent={getHeader}
          ListFooterComponent={getFooter}
        />
        <FAB
          style={styles.fab}
          small
          icon="check"
          onPress={this.constructandSendPostObject}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    
    marginStart: "5%",
    width: "100%"
  },
  message: {
    marginHorizontal: 20,
    textAlign: "center",
    fontSize: 25,
    marginBottom: 20,
  },
  imageScrollView: {
    marginVertical: 10,
  },
  card: {
    width: width - 20,
    //padding: 15,
    //margin: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  mainHeader: {
    fontSize: 20,
    fontWeight: "bold",
  },
  orangeText: {
    color: "#ffc909",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "left",
    alignSelf: "stretch",
    marginBottom: 10,
  },
  flatlist: {
    //alignSelf: "stretch",
    marginTop : "-5%"
  },
  fab: {
    position: "absolute",
    margin: 20,
    padding: 10,
    backgroundColor: "#ffc909",
    right: 0,
    bottom: 40,
  },
  header: {
    fontSize: 18,
    
    color: "#00000099",
  },
  value: {
    fontSize: 18,
    color: "#505050",
    fontWeight: "bold",
  },
  image: {
    marginHorizontal: 5,
    height: 100,
    width: 100,
    borderRadius: 10,
  },
});
const mapStateToProps = (state) => {
  const { userInfo } = state
  return { userInfo }
};

export default connect(mapStateToProps)(Summary)