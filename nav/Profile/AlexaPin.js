import React, { Component } from "react";

import {
    StyleSheet,
    Text,
    View,
    Image,
    StatusBar,
    Dimensions,
    KeyboardAvoidingView,
} from "react-native";
const { width, height } = Dimensions.get("window");
import CodePin from "react-native-pin-code";
import NavigationArrows from "../../components/NavigationArrows";
import { scale, verticalScale, moderateScale } from "../../components/Scale";

export default class AlexaSetupPin extends Component {
    state = { alexaPin: "", errorString: "" }
    errorString;
    pincodeValue;
    onChange = (code) => {
        // params = this.props.route.params;
        // this.params.updateParams("alexaPin", code);
        this.setState({ "alexaPin": code })
        this.props.navigation.navigate("AlexaPinConfirm", { "alexaPin": code });
        return true;
    };
    checkForwardPress = () => {

        this.pincodeValue.state.edit === 4 ? this.props.navigation.navigate("AlexaPinConfirm", { "alexaPin": code }) : this.setState({ errorString: "Please enter your 4 digit PIN code" });
    }
    render() {
        return (
            <View style={styles.container}>

                <KeyboardAvoidingView
                    behavior={Platform.OS == "ios" ? "padding" : ""}
                    keyboardVerticalOffset={-30}
                    style={styles.container}>
                    <CodePin
                        number={4} // You must pass number prop, it will be used to display 4 (here) inputs
                        checkPinCode={(code, callback) => callback(this.onChange(code))}
                        // Check manually code (ask server for instance)
                        // and call callback function with
                        //    true  (code pin is correct)
                        // or false (code pin is false)
                        success={() => console.log("hurray!")} // If user fill '2018', success is called
                        text="Set your 4-digit PIN for Alexa" // My title
                        error="Re-Enter PIN" // If user fail (fill '2017' for instance)
                        autoFocusFirst={true} // disabling auto-focus
                        keyboardType="numeric"
                        pinStyle={{ height: 70, }}
                        textStyle={{ textContentType: "password" }}
                        containerStyle={{ marginTop: "6%" }}
                        ref={ref => this.pincodeValue = ref}
                    />
                    <Text>{this.state.errorString}</Text>
                    <NavigationArrows nextScreen="AlexaPinConfirm" checkOnPress={this.checkForwardPress} props={this.props} propsToPass={{ "alexaPin": this.state.alexaPin }} />
                </KeyboardAvoidingView>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        // alignItems: "center",
        // justifyContent: "center",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        width: width,
    },
    logo: {
        margin: width * 0.2,
    },
    btnText: {
        color: "#FFFFFF",
    },
    message: {
        color: "#505050",
        textAlign: "left",
        fontSize: 20,
    },
    avoidingView: {
        borderRadius: 10,
        height: verticalScale(150),
        marginTop: verticalScale(50),
        width: width - 30,
    },
});