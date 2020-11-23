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
import { Button, Card, Title, ActivityIndicator } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { Rating } from "../../components/Rating";
import NavigationArrows from "../../components/NavigationArrows";
import { Auth } from "aws-amplify";

const { width, height } = Dimensions.get("window");

class SymptomList extends React.Component {
  state = {
    symptomList: [],
    selectedIds: [],
    isLoading: true,
  };

  async componentDidMount() {
    const userId = (await AsyncStorage.getItem("userId")) || "none";
    const headers = {
      Authorization: userId,
      "Content-Type": "application/json",
    };

    const duration = this.props.route.params.symptomRangeNumeric;
    console.log(duration);

    const lastDaysStr =
      duration == 0
        ? "?resolvedState=false"
        : "?lastDays=" + duration + "&resolvedState=false";

    console.log(lastDaysStr);
    return fetch(
      "https://srobvq5uw2.execute-api.us-west-2.amazonaws.com/dev/symptoms" +
        lastDaysStr,
      { headers }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        
        for (var item of responseJson.data.Items){
          let temp = item.recordTime.toString().split('#')[1];
          if(temp)
            item.recordTime = temp
        }
        
        this.setState({
          isLoading: false,
          symptomList: responseJson.data.Items,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  handleSelectionMultiple = (id) => {
    let selectedIds = [...this.state.selectedIds]; // clone state

    if (selectedIds.includes(id))
      selectedIds = selectedIds.filter((_id) => _id !== id);
    else if (selectedIds.length < 3) {
      selectedIds.push(id);
    }
    this.setState({ selectedIds });
  };

  renderItem = ({ item }) => (
    <Card
      style={
        this.state.selectedIds.includes(item.recordTime)
          ? styles.selected
          : styles.card
      }
      onPress={() => this.handleSelectionMultiple(item.recordTime)}
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
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
            marginBottom: 5,
          }}
        >
          <Text>{item.startDate}</Text>
          <TouchableOpacity
            style={styles.checkIcon}
            onPress={() => this.handleSelectionMultiple(item.recordTime)}
          >
            <AntDesign
              name={
                this.state.selectedIds.includes(item.recordTime)
                  ? "checkcircle"
                  : "checkcircleo"
              }
              size={20}
              color="#ff6347"
            />
          </TouchableOpacity>
        </View>
      </Card.Content>
    </Card>
  );

  render() {
    //console.log("props: ", this.props);

    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.message}>
          <Text style={styles.boldText}>{this.state.symptomList.length} </Text>
          symptoms will be added to your symptom report. Please click to
          highlight up to 3 key symptoms.
        </Text>
        <Text style={styles.orangeText}>
          {this.state.selectedIds.length}/3 Selected
        </Text>
        {this.state.isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={this.state.symptomList}
            extraData={
              this.state.selectedIds // for multiple items
            }
            renderItem={this.renderItem}
            keyExtractor={(item) => item.recordTime.toString()}
            style={styles.flatList}
          />
        )}
        <NavigationArrows
          nextScreen="AdditionalNotes"
          props={this.props}
          propsToPass={{
            selectedIds: this.state.selectedIds,
            symptomList: this.state.symptomList,
          }}
        />
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
  conditionButton: {
    marginLeft: 10,
    paddingHorizontal: 10,
  },
  flatList: {},
  searchText: {
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
    backgroundColor: "#F4892C",
    borderRadius: 5,
  },
  selected: {
    backgroundColor: "#F4892C3C",
    width: width - 20,
    padding: 15,
    margin: 10,
  },
  boldText: {
    fontWeight: "bold",
  },
  message: {
    marginHorizontal: 20,
    textAlign: "left",
    fontSize: 20,
    marginBottom: 20,
  },
  checkIcon: {
    marginLeft: "auto",
  },
  orangeText: {
    color: "#F4892C",
    textAlign: "left",
    alignSelf: "stretch",
    marginHorizontal: 20,
  },
});

export default SymptomList;
