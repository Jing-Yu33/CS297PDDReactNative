import React from "react";
import { scale, verticalScale, moderateScale } from "../../components/Scale";
import {
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  Dimensions,
  StyleSheet,
  StatusBar,
  AsyncStorage,
  View,
  Text,
} from "react-native";
import { Card, Title } from "react-native-paper";
import { Rating } from "../../components/Rating";
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {setUserInfo, setIncompleteSymptoms} from '../../actions';
const { width, height } = Dimensions.get("window");

class IncompleteSymptoms extends React.Component {
  state = {
    isLoading: true,
    incompleteSymptomList: [],
  };

  async componentDidMount() {
    const userId = (await AsyncStorage.getItem("userId")) || "none";
    const headers = {
      Authorization: userId,
      "Content-Type": "application/json",
    };
    this.loadIncompleteSymptoms(headers);
  }

  async loadIncompleteSymptoms(headers) {
    let currentTime = new Date();
    let endTime = new Date();
    let startTime = new Date();
    endTime = currentTime.getTime();
    startTime = startTime.setDate(currentTime.getDate() - 1);
    return fetch(
      "https://srobvq5uw2.execute-api.us-west-2.amazonaws.com/dev/symptoms/notcompleted?startTime=" +
      startTime +
      "&endTime=" +
      endTime,
      { headers }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        //console.log("Incomplete symptomssssss");
        console.log(responseJson);
        this.setState({
          isLoading: false,
          incompleteSymptomList: responseJson.data.Items,
          numIncompleteSymptoms : JSON.stringify(responseJson.data.Count)
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const renderItem = ({ item }) => (
      <Card
        style={styles.card}
        onPress={() => {
          this.props.navigation.push("FeelBetter", {
            incompleteFlag: true,
            incompleteSymptomNumber: item.recordTime.split("#")[1],
            severity : item.severity,
            symptomName: item.symptomName,
            symptomLocation : item.symptomLocation,
            symptomLocationDescription : item.symptomLocationDescription,
            
            startDate: item.startDate,
            
            symptomConsistency : item.symptomConsistency,
            symptomDescription: item.symptomDescription.toString(),
            symptomMovement : item.symptomMovement,
            frequency: item.frequency,
          });
        }}
      >
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
    return (
      <SafeAreaView style={styles.container}>
        {this.state.isLoading ? (
          <ActivityIndicator />
        ) : (
            <FlatList
              data={this.state.incompleteSymptomList}
              renderItem={renderItem}
              keyExtractor={(item) => item.recordTime.toString()}
            />
          )}
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
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
  cardHeading: {
    fontSize: 20,
  },
});
const mapStateToProps = (state) => {
  const { userInfo, numIncompleteSymptoms } = state
  return { userInfo, numIncompleteSymptoms }
};
const mapDispatchToProps = dispatch => (
  bindActionCreators({
    setIncompleteSymptoms
  }, dispatch)
);
export default connect(mapStateToProps, mapDispatchToProps) (IncompleteSymptoms);
