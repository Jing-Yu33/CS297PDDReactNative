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
  AsyncStorage,
} from "react-native";
import {
  Button,
  Card,
  Title,
  Searchbar,
  ActivityIndicator,
} from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
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

class CareGiver extends React.Component {
  state = {
    careGiverList: [],
    isLoading: true,
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

  onDelete = (id) => {
    this.setState({
      careGiverList: this.state.careGiverList.filter(
        (item) => item.email !== id
      ),
    });
  };

  onAdd = () => {
    this.props.navigation.push("Add Caregiver");
  };

  renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
            marginBottom: 5,
          }}
        >
          <Title style={styles.cardHeading}>{item.name}</Title>
          <Button
            style={styles.deleteBtn}
            color="#E0E0E0"
            mode="contained"
            onPress={() => this.onDelete(item.email)}
          >
            Delete
          </Button>
        </View>
        <Text>{item.relationship}</Text>
        <Text>{item.email}</Text>
      </Card.Content>
    </Card>
  );

  onScreenVisit = () => {
    this.setState({ isLoading: true, careGiverList: [] });
    this.loadCareGiverList();
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FetchUserData onUpdate={this.onScreenVisit} />
        <View style={styles.flatListView}>
          {this.state.isLoading ? (
            <ActivityIndicator />
          ) : (
            <FlatList
              data={this.state.careGiverList}
              renderItem={this.renderItem}
              keyExtractor={(item) => item.email.toString()}
              style={styles.flatList}
            />
          )}
        </View>
        <Button
          icon={() => <AntDesign name="plus" size={24} color="#F4892C" />}
          mode="contained"
          labelStyle={styles.addNewText}
          theme={theme}
          color="#fff"
          style={styles.addNewBtn}
          onPress={this.onAdd}
        >
          Add New Contact...
        </Button>
        <FAB
          style={styles.fab}
          icon="check"
          onPress={() => this.props.navigation.pop()}
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
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
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
    backgroundColor: "#F4892C",
    right: 0,
    bottom: 40,
  },
  deleteBtn: {
    marginLeft: "auto",
  },
  addNewText: {
    color: "#F4892C",
    fontSize: 17,
  },
  sharepdfText: {
    color: "#F4892C",
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
  },
});

const theme = {
  colors: {
    text: "#F4892C",
    primary: "#F4892C",
    underlineColor: "transparent",
    background: "#003489",
  },
};

export default CareGiver;
