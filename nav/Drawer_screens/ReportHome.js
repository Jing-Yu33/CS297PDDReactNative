import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  FlatList,
  StatusBar,
  TouchableOpacity,
  Platform,
  Image,
  RefreshControl,
  ActivityIndicator,
  AsyncStorage,
} from "react-native";
import {
  Button,
  Card,
  Title,
  Searchbar,
  Provider,
  Portal,
  Modal,
} from "react-native-paper";
import { scale, verticalScale, moderateScale } from "../../components/Scale";
import { AntDesign } from "@expo/vector-icons";
const { width, height } = Dimensions.get("window");
import { useFocusEffect } from "@react-navigation/native";

function FetchUserData({ onUpdate }) {
  useFocusEffect(
    React.useCallback(() => {
      onUpdate();
    }, [onUpdate])
  );
  return null;
}

class ReportHome extends React.Component {
  state = {
    reportList: [],
    refreshing: true,
    showDeleteModal: false,
    itemToDelete: "",
  };

  loadReportList(headers) {
    //console.log(headers);
    return fetch(
      "https://srobvq5uw2.execute-api.us-west-2.amazonaws.com/dev/users/reports",
      { headers }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({
          refreshing: false,
          reportList: responseJson.data,
          //filteredList: responseJson.data.Items,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async componentDidMount() {
    // GET request using fetch with async/await
    const userId = (await AsyncStorage.getItem("userId")) || "none";

    const headers = {
      Authorization: userId,
      "Content-Type": "application/json",
    };

    this.loadReportList(headers);
  }

  async onRefresh() {
    //Clear old data of the list
    this.setState({ reportList: [], refreshing: true });
    const userId = (await AsyncStorage.getItem("userId")) || "none";
    //Call the Service to get the latest data
    const headers = {
      Authorization: userId,
      "Content-Type": "application/json",
    };
    this.loadReportList(headers);
  }

  async onDelete(id) {
    const userId = (await AsyncStorage.getItem("userId")) || "none";
    return fetch(
      "https://srobvq5uw2.execute-api.us-west-2.amazonaws.com/dev/users/reports/" +
        id,
      {
        headers: {
          Authorization: userId,
        },
        method: "DELETE",
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({ showDeleteModal: false, itemToDelete: "" });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  displayDeleteModal = (id) => {
    this.setState({ showDeleteModal: true, itemToDelete: id });
    console.log(id);
  };

  onCardPress = (reportNumber) => {
    console.log("ReportHome onCardPress "+ reportNumber);  
    this.props.navigation.push ("ReportView", {
      reportNumber
    })
  };

  formatDate = (recordTime) => {
    const createdDate = new Date(parseInt(recordTime.split("#")[1]));
    const formattedDate = createdDate.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    return formattedDate;
  };

  getDuration = (symptomRange, recordTime) => {
    if (symptomRange.toLowerCase() !== "all symptoms") {
      const parsedMonth = parseInt(symptomRange.split(" ")[1]);
      const createdDate = new Date(parseInt(recordTime.split("#")[1]));
      let symptomRangeStart = createdDate;
      symptomRangeStart.setMonth(symptomRangeStart.getMonth() - 3);
      const symptomStartStr = symptomRangeStart.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
      });
      const symptomEndStr = createdDate.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
      });
      return "Symptoms from" + symptomStartStr + " to " + symptomEndStr;
    }
  };

  onScreenVisit = () => {
    this.onRefresh();
  };

  render() {
    
    const renderItem = ({ item }) => (
      <Card style={styles.card} onPress={() => this.onCardPress(item.recordTime.split("#")[1])}>
        {console.log("ReportHome: ", JSON.stringify(item))}
        <Card.Content>
          <Title style={styles.cardHeading}>
            {this.formatDate(item.recordTime)}
          </Title>
          <Text>{item.appointmentType}</Text>
          <Text>{this.getDuration(item.symptomRange, item.recordTime)}</Text>
        </Card.Content>
        <Card.Actions>
          <Button
            style={styles.conditionButton}
            color="#E0E0E0"
            mode="contained"
            onPress={() => {
              this.props.navigation.push("ShareHome", {
                appointmentDate: item.appointmentDate,
                reportNumber: item.recordTime.split("#")[1],
              });
            }}
          >
            SHARE
          </Button>
          <Button
            style={styles.conditionButton}
            color="#E0E0E0"
            mode="contained"
            onPress={() =>
              this.displayDeleteModal(item.recordTime.split("#")[1])
            }
          >
            DELETE
          </Button>
        </Card.Actions>
      </Card>
    );

    if (
      !this.state.reportList ||
      (this.state.reportList.length === 0 && !this.state.refreshing)
    ) {
      return (
        <SafeAreaView style={styles.container}>
          {/* {console.log(
            "!this.state.reportList: " +
              !this.state.reportList +
              "this.state.reportList.length: " +
              this.state.reportList.length +
              "!this.state.refreshing: " +
              !this.state.refreshing
          )} */}
          <Image
            style={styles.logo}
            source={require("../../assets/logo2.png")}
          />
          <Text style={styles.emptyListText}>NO REPORT CREATED YET</Text>
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => this.props.navigation.push("ReportType")}
          >
            <AntDesign name="plus" size={20} color="white" />
            <Text style={styles.createText}>CREATE</Text>
          </TouchableOpacity>
        </SafeAreaView>
      );
    }

    return (
      <SafeAreaView style={styles.container}>
        <FetchUserData onUpdate={this.onScreenVisit} />
        {this.state.refreshing ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={this.state.reportList}
            renderItem={renderItem}
            keyExtractor={(item) => item.recordTime.toString()}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh.bind(this)}
              />
            }
            style={styles.flatList}
          />
        )}

        {this.state.showDeleteModal && (
          <Provider>
            <Portal>
              <Modal
                visible={this.state.showDeleteModal}
                dismissable={false}
                contentContainerStyle={styles.deleteModal}
              >
                <Text>Are you sure to delete?</Text>
                <Text>
                  You will not be able to retrieve the report data after delete.
                  You may still have access to the report that you have saved to
                  local or sent to caregivers.
                </Text>
                <Button
                  //style={styles.conditionButton}
                  onPress={() => {
                    this.setState({ showDeleteModal: false, itemToDelete: "" });
                  }}
                >
                  Cancel
                </Button>
                <Button
                  style={styles.deleteModalBtn}
                  onPress={() => {
                    this.onDelete(this.state.itemToDelete);
                  }}
                >
                  Delete
                </Button>
              </Modal>
            </Portal>
          </Provider>
        )}

        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => this.props.navigation.push("SymptomRange")}
        >
          <AntDesign name="plus" size={20} color="#E0E0E0" />
          <Text style={styles.createText}>CREATE</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  card: {
    width: width - scale(20),
    padding: moderateScale(10),
    margin: moderateScale(10),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardHeading: {
    fontSize: moderateScale(20),
  },
  deleteModalBtn: {
    color: "#ffc909",
  },
  conditionButton: {
    marginLeft: 10,
    paddingHorizontal: 10,
  },
  flatList: {},
  createText: {
    color: "white",
    fontSize: 18,
    //fontFamily: "sans-serif",
    paddingLeft: 10,
  },
  searchButton: {
    borderWidth: 1,
    flexDirection: "row",
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 10,
    right: 10,
    //height: 70,
    padding: 20,
    backgroundColor: "#ffc909",
    borderRadius: 5,
  },
  logo: {
    // width: width * 0.6,
    height: verticalScale(50),
  },
  deleteModal: {
    backgroundColor: "white",
  },
  emptyListText: {
    marginVertical: verticalScale(10),
    color: "#E2E2E2",
  },
});

export default ReportHome;
