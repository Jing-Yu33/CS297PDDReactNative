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
  ActivityIndicator,
  AsyncStorage,
} from "react-native";
import { Button, Card, Title, Searchbar } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { scale, moderateScale, verticalScale } from "../../components/Scale";
import { FAB } from "react-native-paper";

const { width, height } = Dimensions.get("window");

function FetchUserData({ onUpdate }) {
  useFocusEffect(
    React.useCallback(() => {
      onUpdate();
    }, [onUpdate])
  );
  return null;
}

class ShareHome extends React.Component {
  state = {
    careGiverList: [],
    isLoading: true,
    selectedCareGivers: [],
  };

  async loadCareGiverList() {
    const userId = (await AsyncStorage.getItem("userId")) || "none";
    const headers = {
      Authorization: userId,
      "Content-Type": "application/json",
    };

    //Fetching caregiver list
    return fetch(
      "https://srobvq5uw2.execute-api.us-west-2.amazonaws.com/dev/users",
      { headers }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({
          isLoading: false,
          careGiverList: responseJson.data.emergencyContact,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async componentDidMount() {
    this.loadCareGiverList();
  }

  handleSelectionMultiple = (id) => {
    //this.setState({ selectedCareGivers: id });
    let selectedCareGivers = [...this.state.selectedCareGivers]; // clone state

    if (selectedCareGivers.includes(id))
      selectedCareGivers = selectedCareGivers.filter((_id) => _id !== id);
    else if (selectedCareGivers.length < 3) {
      selectedCareGivers.push(id);
    }

    this.setState({ selectedCareGivers });
  };

  renderItem = ({ item }) => (
    <Card
      style={
        this.state.selectedCareGivers.includes(item.email)
          ? styles.selected
          : styles.card
      }
      onPress={() => this.handleSelectionMultiple(item.email)}
    >
      <Card.Content>
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
            marginBottom: 5,
          }}
        >
          <Title style={styles.cardHeading}>{item.name}</Title>
          <TouchableOpacity
            style={styles.checkIcon}
            onPress={() => this.handleSelectionMultiple(item.email)}
          >
            <AntDesign
              name={
                this.state.selectedCareGivers.includes(item.email)
                  ? "checkcircle"
                  : "checkcircleo"
              }
              size={20}
              color="#ff6347"
            />
          </TouchableOpacity>
        </View>
        <Text>{item.relationship}</Text>

        <Text>{item.email}</Text>
        <TouchableOpacity
          style={styles.checkIcon}
          onPress={() => this.handleSelectionMultiple(item.email)}
        ></TouchableOpacity>
      </Card.Content>
    </Card>
  );

  onAdd = () => {
    this.props.navigation.push("AddCareGiver");
  };

  onScreenVisit = () => {
    this.setState({ isLoading: true, careGiverList: [] });
    this.loadCareGiverList();
  };

  onShare = () => {};

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FetchUserData onUpdate={this.onScreenVisit} />
        <Text style={styles.orangeText}>Share</Text>
        <Text style={styles.message}>
          With whom do you want to share your report?
        </Text>
        <View style={styles.flatListView}>
          {this.state.isLoading ? (
            <ActivityIndicator />
          ) : (
            <FlatList
              data={this.state.careGiverList}
              extraData={
                this.state.selectedCareGivers // for multiple items
              }
              renderItem={this.renderItem}
              keyExtractor={(item) => item.email.toString()}
              style={styles.flatList}
            />
          )}
        </View>
        <Button
          icon={() => <AntDesign name="plus" size={24} color="#ffc909" />}
          mode="contained"
          labelStyle={styles.addNewText}
          theme={theme}
          color="#fff"
          style={styles.addNewBtn}
          onPress={this.onAdd}
        >
          Add New Contact...
        </Button>
        {/* <Button
          mode="contained"
          labelStyle={styles.sharepdfText}
          theme={theme}
          color="#fff"
          style={styles.sharepdf}
          onPress={this.onShare}
        >
          Share PDF...
        </Button> */}
        <FAB
          style={styles.fab}
          icon="arrow-right"
          onPress={() =>
            this.props.navigation.push("SendTime", {
              selectedContacts: this.state.careGiverList.filter((item) =>
                this.state.selectedCareGivers.includes(item.email)
              ),
              ...this.props.route.params,
            })
          }
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    //paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  card: {
    width: width - 20,
    padding: 15,
    margin: 10,
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
    fontSize: 20,
  },
  fab: {
    position: "absolute",
    margin: 16,
    backgroundColor: "#ffc909",
    right: 0,
    bottom: 40,
  },
  orangeText: {
    color: "#ffc909",
    fontSize: 20,
    textAlign: "left",
    alignSelf: "stretch",
    fontWeight: "bold",
    paddingHorizontal: 10,
  },
  selected: {
    backgroundColor: "#ffc9093C",
    width: width - 20,
    padding: 15,
    margin: 10,
  },
  boldText: {
    fontWeight: "bold",
  },
  message: {
    paddingHorizontal: 10,
    textAlign: "left",
    alignSelf: "stretch",
    fontSize: 22,
    marginBottom: 20,
  },
  checkIcon: {
    marginLeft: "auto",
  },
  addNewText: {
    color: "#ffc909",
    fontSize: 17,
  },
  sharepdfText: {
    color: "#ffc909",
    fontSize: 17,
  },
  flatListView: {
    height: height * 0.5,
  },
  addNewBtn: {
    width: width - 20,
    padding: 10,
    marginVertical: 10,
    alignItems: "flex-start",
  },
  sharepdf: {
    //width: width - 20,
    alignSelf: "flex-start",
    marginHorizontal: 10,
    padding: 10,
    marginVertical: 10,
    alignItems: "flex-start",
    position: "absolute",
    left: scale(10),
    bottom: verticalScale(10),
  },
});

const theme = {
  colors: {
    text: "#ffc909",
    primary: "#ffc909",
    underlineColor: "transparent",
    background: "#003489",
  },
};

export default ShareHome;
