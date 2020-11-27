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
  KeyboardAvoidingView,
} from "react-native";
import {
  Button,
  Card,
  Title,
  Searchbar,
  Portal,
  Provider,
} from "react-native-paper";
import { Rating } from "../../components/Rating";
import { LinearGradient } from "expo-linear-gradient";
import { EvilIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import Initializing from "../Initializing";
import { scale, verticalScale, moderateScale } from "../../components/Scale";
import { AntDesign } from "@expo/vector-icons";
import Storage from "@aws-amplify/storage";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setProfileImageUrl} from '../../actions';
import {setUserInfo, setIncompleteSymptoms, setReviewSymptoms} from '../../actions';

//import {ThemeConsumer} from "../../contexts/ThemeContext"

import { Auth } from "aws-amplify";
import { Assets } from "@react-navigation/stack";
const { width, height } = Dimensions.get("window");

function FetchUserData({ onUpdate }) {
  useFocusEffect(
    React.useCallback(() => {
      onUpdate();
    }, [])
  );
  return null;
}

class Home extends React.Component {
  static navigationOptions = {
    title: "Home",
  };
  state = {
    isLoading: true,
    refreshing: false,
    userObj: [],
    symptomList: [],
    filteredList: [],
    symptomReviewList: [],
    searchText: "",
    showSearchBar: false,
    numReviewSymptom: 0,
    url: "",
    profileImageUrl: ""
  };

  filterSearch(text) {
    const newData = this.state.symptomList.filter(function (item) {
      const itemSymptom = item.symptomName.toUpperCase();
      const textData = text.toUpperCase();
      return itemSymptom.indexOf(textData) > -1;
    });
    this.setState({
      filteredList: newData,
      searchText: text,
    });
  }

  onSearchClick(prevState) {
    let { showSearchBar } = prevState;
    this.setState({
      showSearchBar: !showSearchBar,
    });
  }

  findLastElementWithNoReviewTime = (symptomList) => {
    const temp = symptomList.filter((x) => x.reviewTime > "0");
    let returnIdx = 0;
    if (temp.length !== 0) {
      returnIdx = temp.length;
    }
    return returnIdx;
  };

  async loadSymptomList(headers) {
    return fetch(
      "https://srobvq5uw2.execute-api.us-west-2.amazonaws.com/dev/symptoms",
      { headers }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("All symptoms");
        // console.log(responseJson);
        if (responseJson.data.Items) {
          let symptomList = responseJson.data.Items;
          for ( var item of symptomList) {
            console.log("Item " + item.symptomName + " ReviewTime " + item.reviewTime)
          }
          symptomList.sort(function (a, b) {
            return b.reviewTime - a.reviewTime;
          });

          const firstNonReviewIdx = this.findLastElementWithNoReviewTime(
            symptomList
          );

          this.setState({ numReviewSymptom: firstNonReviewIdx });
          this.setState({numReviewSymptoms : firstNonReviewIdx});
          this.props.setReviewSymptoms(firstNonReviewIdx);
          this.setState({
            isLoading: false,
            refreshing: false,
            symptomList: symptomList,
            filteredList: symptomList,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async loadIncompleteSymptoms(headers) {
    let currentTime = new Date();
    let endTime = new Date();
    let startTime = new Date();
    endTime = currentTime.getTime();
    startTime = startTime.setDate(currentTime.getDate() - 1);
    return fetch(
      "https://srobvq5uw2.execute-api.us-west-2.amazonaws.com/dev/symptoms/notcompleted?startTime=" +
        "&startTime=" +
        startTime +
        "&endTime=" +
        endTime,
      { headers }
    )
      .then((response) => response.json())
      .then(async (responseJson) => {
        //console.log("Incomplete symptomssssss");
        //console.log(responseJson);
        if (responseJson.data) {
          await AsyncStorage.setItem(
            "NumIncompleteSymptoms",
            JSON.stringify(responseJson.data.Count)
          );
          
          this.setState({numIncompleteSymptoms : JSON.stringify(responseJson.data.Count)});
          this.props.setIncompleteSymptoms(JSON.stringify(responseJson.data.Count));
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async loadNumSymptomLastMonth(headers) {
    const lastDays = 30;
    return fetch(
      "https://srobvq5uw2.execute-api.us-west-2.amazonaws.com/dev/symptoms?number=true" +
        "&lastDays=" +
        lastDays,
      { headers }
    )
      .then((response) => response.json())
      .then(async (responseJson) => {
        ////console.log("NUMBER OF LAST MONTH SYMPTOMS");
        ////console.log(responseJson);
        await AsyncStorage.setItem(
          "loggedSympLastMonth",
          JSON.stringify(responseJson.data)
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async loadNumReviewSymptoms(headers) {
    let currentTime = new Date();
    let endTime = new Date();
    let startTime = new Date();
    endTime = startTime.setDate(currentTime.getDate() + 7);
    startTime = currentTime.getTime();
    return fetch(
      "https://srobvq5uw2.execute-api.us-west-2.amazonaws.com/dev/symptoms/review?startTime=" +
        startTime +
        "&endTime=" +
        endTime,
      { headers }
    )
      .then((response) => response.json())
      .then(async (responseJson) => {
        //console.log("Review symptoms");
        //console.log(responseJson);
        if (responseJson.data) {
          await AsyncStorage.setItem(
            "NumReviewSymptoms",
            JSON.stringify(responseJson.data.Count)
          );

        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  async getProfileImageUrl() {
    
    var url = await Storage.get(this.state.userObj.image, {
      bucket: "myhealthtoday-user-images221818-dev",
      region: "us-west-2"
    })
    this.setState({profileImageUrl : url})
    
    // const dispatch = useDispatch();
    this.props.setProfileImageUrl(url);
  }

  async componentDidMount() {
    // GET request using fetch with async/await
    const userObj = await Auth.currentAuthenticatedUser().catch((err) =>
      console.log(err)
    );
    //console.log(userObj);
    await AsyncStorage.setItem(
      "userId",
      userObj.signInUserSession.idToken.jwtToken
    );
    console.log(userObj.signInUserSession.idToken.jwtToken);

    const headers = {
      Authorization: userObj.signInUserSession.idToken.jwtToken,
      "Content-Type": "application/json",
    };

    //Fetch user object
    const response = await fetch(
      "https://srobvq5uw2.execute-api.us-west-2.amazonaws.com/dev/users",
      { headers }
    );
    try {
      const registeredUserObj = await response.json();
      //console.log(registeredUserObj.data);
      if (registeredUserObj.data) {
        await AsyncStorage.setItem(
          "userObj",
          JSON.stringify(registeredUserObj.data)
        );
        this.setState({userObj: registeredUserObj.data});
        this.props.setUserInfo(registeredUserObj.data);
        this.getProfileImageUrl();
      }
    } catch (err) {
      console.log(err);
    }

    this.loadSymptomList(headers);
    this.loadIncompleteSymptoms(headers);
    this.loadNumSymptomLastMonth(headers);
    this.loadNumReviewSymptoms(headers);

    // await Storage.get("Male_Mob_Chest.png", {
    //   bucket: "myhealthtoday-body-parts",
    //   region: "us-west-2",
    // })
    //   .then((result) => {
    //     this.setState({ url: result });
    //     console.log(
    //       "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
    //     );
    //     console.log(result);
    //   })
    //   .catch((err) => console.log(err));
  }

  async onRefresh() {
    //Clear old data of the list
    this.setState({ filteredList: [], symptomList: [], refreshing: true });
    //Call the Service to get the latest data
    const userId = (await AsyncStorage.getItem("userId")) || "none";
    const headers = {
      Authorization: userId,
      "Content-Type": "application/json",
    };
    this.loadSymptomList(headers);
    this.loadIncompleteSymptoms(headers);
    this.loadNumSymptomLastMonth(headers);
    this.loadNumReviewSymptoms(headers);
  }

  onScreenVisit = () => {
    this.onRefresh();
  };

  onBetterPress = (item) => {
    this.props.navigation.push("Better", {
      symptomNumber: item.recordTime.split("#")[1],
      conditionType: "better",
      severity: item.severity,
    });
  };

  onWorsePress = (item) => {
    this.props.navigation.push("Better", {
      symptomNumber: item.recordTime.split("#")[1],
      conditionType: "worse",
      severity: item.severity,
    });
  };

  noChangeInReview = async (symptomNumber) => {
    const userId = (await AsyncStorage.getItem("userId")) || "0";

    const headers = {
      Authorization: userId,
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    const postObj = {
      reviewTime: "0",
    };

    try {
      let res = await fetch(
        "https://srobvq5uw2.execute-api.us-west-2.amazonaws.com/dev/symptom/" +
          symptomNumber,
        {
          method: "PATCH",
          headers,
          body: JSON.stringify(postObj),
        }
      );
      res = await res.json();
      console.log(res);
      this.onRefresh();
    } catch (e) {
      console.error(e);
    }
  };

  onResolvedPress = (item) => {
    this.props.navigation.push("ResolvedReview", {
      symptomNumber: item.recordTime.split("#")[1],
    });
  };

  render() {
    const renderItem = ({ item }) => (
      <Card
        style={styles.card}
        onPress={() => {
          this.props.navigation.push(
            "SymptomSummary",
            this.state.symptomList.find(
              (element) => element.recordTime === item.recordTime
            )
          );
        }}
      >
        <Card.Cover
          source={{uri: 'https://myhealthtoday-body-parts.s3.us-west-2.amazonaws.com/public/' + this.state.userObj.gender.toString().toLowerCase() + '_mob_'+item.symptomLocation.toString().toLowerCase()+'.png'} }
        />
        <Card.Content>
          <Title style={styles.cardHeading}>{item.symptomName}</Title>
          <View
            //onLayout={(event) => this.findDimesions(event.nativeEvent.layout)}
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
        {item.reviewTime > "0" ? (
          <React.Fragment>
            <Text style={styles.cardActionHeader}>How do you feel now?</Text>
            <Card.Actions style={styles.row}>
              {/* <Button
            style={styles.reviewButton}
            color="white"
            labelStyle={{ color: "#ffc909" }}
            mode="text"
          >
            Better
          </Button> */}
              <Button
                style={styles.conditionButton}
                color="#505050"
                mode="outlined"
                labelStyle={styles.conditionlabel}
                onPress={() => this.onBetterPress(item)}
              >
                Better
              </Button>
              <Button
                style={styles.conditionButton}
                color="#505050"
                mode="outlined"
                labelStyle={styles.conditionlabel}
                onPress={() => this.onWorsePress(item)}
              >
                Worse
              </Button>
            </Card.Actions>
            <Card.Actions style={styles.row}>
              <Button
                style={styles.conditionButton}
                color="#505050"
                mode="outlined"
                labelStyle={styles.conditionlabel}
                onPress={() =>
                  this.noChangeInReview(item.recordTime.split("#")[1])
                }
              >
                Same
              </Button>
              <Button
                style={styles.conditionButton}
                color="#505050"
                mode="outlined"
                labelStyle={styles.conditionlabel}
                onPress={() => this.onResolvedPress(item)}
              >
                Resolved
              </Button>
            </Card.Actions>
          </React.Fragment>
        ) : null}
      </Card>
    );

    if (this.state.isLoading) {
      return <Initializing />;
    }

    if (this.state.symptomList.length === 0 && !this.state.refreshing) {
      return (
        <SafeAreaView style={styles.container}>
          <Image
            style={styles.logo}
            source={require("../../assets/Orange_Logo.png")}
          />
          <Text style={styles.emptyListText}>NO SYMPTOM CREATED YET</Text>
          <Button
            icon={() => <AntDesign name="plus" size={24} color="#ffc909" />}
            mode="contained"
            labelStyle={styles.addNewText}
            theme={theme}
            color="#fff"
            style={styles.addNewBtn}
            onPress={() => this.props.navigation.push("Intro")}
          >
            Create New
          </Button>
        </SafeAreaView>
      );
    }

    return (
      <SafeAreaView style={styles.container}>
        <FetchUserData onUpdate={this.onScreenVisit} />
        
        {this.state.numReviewSymptom !== 0 && (
          <Text style={styles.needReviewTxt}>
            {this.state.numReviewSymptom} {this.state.numReviewSymptom>1? "SYMPTOMS NEED":'SYMPTOM NEEDS' } REVIEW
          </Text>
        )}
        {this.state.refreshing ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={this.state.filteredList}
            renderItem={renderItem}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh.bind(this)}
              />
            }
            keyExtractor={(item) => item.recordTime.toString()}
          />
        )}
        {!this.state.showSearchBar ? (
          <TouchableOpacity
            style={styles.searchButton}
            onPress={(prevState) => this.onSearchClick(prevState)}
          >
            <EvilIcons name="search" size={28} color="white" />
            <Text style={styles.searchText}>SEARCH</Text>
          </TouchableOpacity>
        ) : (
          <Provider>
            <Portal>
              <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "position" : ""}
                keyboardVerticalOffset={verticalScale(80)}
                //contentContainerStyle={styles.avoidingView}
                style={styles.keyboardAvoidingView}
              >
                <Searchbar
                  placeholder="SEARCH FOR SYMPTOMS"
                  style={styles.searchbar}
                  onChangeText={(text) => this.filterSearch(text)}
                  value={this.state.searchText}
                  autoFocus={true}
                  onBlur={() => {
                    this.setState({
                      showSearchBar: !this.state.showSearchBar,
                    });
                  }}
                />
              </KeyboardAvoidingView>
            </Portal>
          </Provider>
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
  link: {
    color: "blue",
    marginVertical: 5,
  },
  conditionButton: {
    marginHorizontal: scale(10),
    borderRadius: 20,
    width: 151,
  },
  reviewButton: {
    //marginLeft: 10,
    paddingHorizontal: 10,
  },
  searchText: {
    color: "white",
    fontSize: 20,
    //fontFamily: "sans-serif",
    paddingHorizontal: 10,
  },
  searchButton: {
    borderWidth: 1,
    flexDirection: "row",
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 40,
    right: 10,
    //height: 70,
    padding: 10,
    backgroundColor: "#ffc909",
    borderRadius: 5,
  },
  searchbar: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    bottom: 10,
    //right: 10,
    //height: 70,
    margin: 10,
    padding: 10,
  },
  logo: {
    width: width * 0.6,
    height: verticalScale(50),
  },
  emptyListText: {
    marginVertical: verticalScale(10),
    color: "#E2E2E2",
  },
  addNewText: {
    color: "#ffc909",
    fontSize: 17,
  },
  addNewBtn: {
    width: width - 20,
    padding: 10,
    marginVertical: 10,
    alignItems: "flex-start",
  },
  needReviewTxt: {
    color: "#ffc909",
    fontSize: 18,
    paddingTop: "3%",
    alignSelf: "flex-start",
    paddingStart : 15
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: verticalScale(5),
  },
  conditionlabel: {
    fontSize: 18,
  },
  cardActionHeader: {
    fontSize: 16,
    color: "#505050",
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: verticalScale(10),
  },
  keyboardAvoidingView: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
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

const mapStateToProps = (state) => {
  const { profileImageUrl, userInfo, numIncompleteSymptoms, numReviewSymptoms } = state
  
  return { profileImageUrl, userInfo, numIncompleteSymptoms, numReviewSymptoms }
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    setProfileImageUrl,
    setUserInfo,
    setIncompleteSymptoms,
    setReviewSymptoms,
  }, dispatch)
);
export default connect(mapStateToProps, mapDispatchToProps)(Home);
// export default Home;
