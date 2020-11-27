import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Image,
  FlatList,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import NavigationArrows from "../../components/NavigationArrows";
import { TextInput, Button } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { ImageBrowser } from "expo-multiple-media-imagepicker";
import * as Permissions from "expo-permissions";
import Storage from "@aws-amplify/storage";
import { verticalScale } from '../../components/Scale'

const { width, height } = Dimensions.get("window");

export default class AdditionalNotes extends Component {
  state = {
    additionalNotes: "",
    photos: [],
    imageBrowserOpen: false,
    imageURLs: [],
  };

  updateProperty = (key, value) => {
    this.setState({ [key]: value });
  };

  uploadToStorage = async (image) => {
    try {
      const pathToImageFile = image.uri;
      let { imageURLs } = this.state;
      const imageName = image.filename.replace(/^.*[\\\/]/, "");
      const creationTime = image.creationTime;
      const response = await fetch(pathToImageFile);

      const blob = await response.blob();

      Storage.put(imageName + "#" + creationTime + ".jpeg", blob, {
        contentType: "image/jpeg",
      })
        .then((succ) => {
          imageURLs.push(succ.key);
          console.log(imageURLs);
          this.setState({ imageURLs: imageURLs });
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };

  imageBrowserCallback = (callback) => {
    callback
      .then((photos) => {
        console.log(photos);
        this.setState({
          imageBrowserOpen: false,
          photos: [...this.state.photos, ...photos],
        });
        photos.forEach((image) => this.uploadToStorage(image));
      })
      .catch((e) => console.log(e));
  };

  renderImage({ item }) {
    return (
      <Image
        style={styles.image}
        source={{ uri: item.uri }}
        key={Math.random() * 100000}
      />
    );
  }

  onAddImagePress = async function getCameraAsync() {
    // permissions returns only for location permissions on iOS and under certain conditions, see Permissions.LOCATION
    const { status, permissions } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );
    if (status === "granted") {
      this.setState({ imageBrowserOpen: true });
      return;
    } else {
      alert("Sorry, we need camera roll permissions to make this work!");
    }
  };

  render() {
    return (
      // <KeyboardAvoidingView
      //   behavior={Platform.OS == "ios" ? "height" : ""}
      //   keyboardVerticalOffset={verticalScale(80)}
      //   //contentContainerStyle={styles.avoidingView}
      //   style={styles.container}
      // >
      <SafeAreaView style={styles.container}>

        {!this.state.imageBrowserOpen && (
          <View style={styles.container}>
            <KeyboardAvoidingView
              behavior={Platform.OS == "ios" ? "padding" : ""}
              keyboardVerticalOffset={70}
              contentContainerStyle={styles.avoidingView}
              style={styles.container}>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                  <Text style={styles.message}>Add additional notes (optional)</Text>
                  <TextInput
                    style={styles.textInput}
                    mode="outlined"
                    placeholder="Type here"
                    multiline={false}
                    onChangeText={(text) => this.setState({ additionalNotes: text })}

                  />
                  <View style={styles.imageContainer}>
                    <FlatList
                      style={styles.imageScrollView}
                      horizontal={true}
                      data={this.state.photos}
                      renderItem={this.renderImage}
                    ></FlatList>
                    <Button
                      icon={() => <AntDesign name="plus" size={24} color="#ffc909" />}
                      mode="contained"
                      labelStyle={{ color: "#ffc909", fontSize: 17, padding: 10 }}
                      theme={theme}
                      color="#fff"
                      style={styles.addImageBtn}
                      onPress={() => this.onAddImagePress()}
                    >
                      Add Image
              </Button>
                    <Text style={styles.exampleText}>
                      Example: You can upload an image of a skin rash
              </Text>
                  </View>
                  <NavigationArrows
                    nextScreen="Summary"
                    props={this.props}
                    propsToPass={{
                      additionalNotes: this.state.additionalNotes,
                      imageURLs: this.state.imageURLs,
                      photos: this.state.photos,
                    }}
                    style={styles.fab}
                  />
                </View>
              </TouchableWithoutFeedback>
            </KeyboardAvoidingView>

          </View>
        )}
        {this.state.imageBrowserOpen && (
          <ImageBrowser
            max={101} // Maximum number of pickable image. default is None
            headerCloseText={"Close"} // Close button text on header. default is 'Close'.
            headerDoneText={"Done"} // Done button text on header. default is 'Done'.
            headerButtonColor={"#E31676"} // Button color on header.
            headerSelectText={"Selected"} // Word when picking.  default is 'n selected'.
            //mediaSubtype={"screenshot"} // Only iOS, Filter by MediaSubtype. default is display all.
            badgeColor={"#E31676"} // Badge color when picking.
            emptyText={"Nothing to select"} // Empty Text
            callback={this.imageBrowserCallback} // Callback functinon on press Done or Cancel Button. Argument is Asset Infomartion of the picked images wrapping by the Promise.
          />
        )}

      </SafeAreaView>
      // </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    justifyContent: "center",
    height: height
  },
  message: {
    marginHorizontal: 20,
    textAlign: "center",
    fontSize: 25,
    marginBottom: 20,
  },
  textInput: {
    //height: height * 0.2,
    backgroundColor: "white",
    width: width - 40,
    height: height * 0.2,
  },
  orangetext: {
    color: "#ffc909",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "left",
    alignSelf: "stretch",
    marginLeft: 20,
    marginBottom: 10,
  },
  addImageBtn: {
    //alignSelf: "flex-start",
    //marginHorizontal: 20,
  },
  exampleText: {
    fontSize: 12,
    color: "#E2E2E2",
    textAlign: "left",
    alignSelf: "stretch",
  },
  imageContainer: {
    marginHorizontal: 20,
    alignItems: "flex-start",
    alignSelf: "stretch",
    justifyContent: "flex-start",
  },
  imageScrollView: {
    marginVertical: 10,
  },
  image: {
    marginHorizontal: 5,
    height: 100,
    width: 100,
    borderRadius: 10,
  },
  fab: {
    margin: 16,
    backgroundColor: "#ffc909",
    right: 0,
    bottom: 0,
  },
  avoidingView: {
    borderRadius: 10,
    height: verticalScale(10),
    marginTop: verticalScale(50),
    width: width - 30,
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
