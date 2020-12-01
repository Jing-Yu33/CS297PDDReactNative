import React, { Component } from "react";

import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    KeyboardAvoidingView,
    StatusBar,
    AsyncStorage
} from "react-native";
const { width, height } = Dimensions.get("window");
import CodePin from "react-native-pin-code";
import { scale, verticalScale, moderateScale } from "../../components/Scale";
import NavigationArrows from "../../components/NavigationArrows";

export default class AlexaPinConfirm extends Component {
    state = { alexaPin: "" }
    onChange = (code) => {
        this.setState({ alexaPin: code });
        return this.props.route.params.alexaPin === code;

    };
    updateUserPin = async () => {
        let { alexaPin } = this.state;

        if (this.props.route.params.alexaPin === this.state.alexaPin) {
            const postObj = {
                alexaPin
            };
            const userId = (await AsyncStorage.getItem('userId')) || 'none';
            try {
                //TODOs:
                let res = await fetch(
                    "https://srobvq5uw2.execute-api.us-west-2.amazonaws.com/dev/users",
                    {
                        method: "PUT",
                        headers: {
                            Authorization: userId,
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(postObj),
                    }
                );
                res = await res.json();
                console.log("AlexaPinConfirm :: " + res);

            } catch (e) {
                console.log(e);
            }

            this.props.navigation.popToTop();
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <KeyboardAvoidingView
                    behavior={Platform.OS == "ios" ? "padding" : ""}
                    keyboardVerticalOffset={-30}
                    style={styles.container}
                >
                    <CodePin
                        number={4} // You must pass number prop, it will be used to display 4 (here) inputs
                        checkPinCode={(code, callback) => callback(this.onChange(code))}
                        // Check manually code (ask server for instance)
                        // and call callback function with
                        //    true  (code pin is correct)
                        // or false (code pin is false)
                        success={() => console.log("hurray!")} // If user fill '2018', success is called
                        text="Re-enter your 4-digit PIN" // My title
                        error="PIN does not match" // If user fail (fill '2017' for instance)
                        autoFocusFirst={false} // disabling auto-focus
                        keyboardType="numeric"
                        containerStyle={{ marginTop: "6%" }}
                    />
                    <NavigationArrows lastStep="check" props={this.props} checkOnPress={this.updateUserPin} />
                </KeyboardAvoidingView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        width: width,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,

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
