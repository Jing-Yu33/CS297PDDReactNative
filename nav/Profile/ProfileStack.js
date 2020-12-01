import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import Header from "../../components/Header";
import QuitHeader from "../../components/QuitHeader";
import ProfileHome from "./ProfileHome";
import BasicInfo from "./BasicInfo";
import CareGiver from "./CareGiver";
import AddCaregiver from "./AddCaregiver";
import ChronicDisease from "./ChronicDisease";
import AccountSettings from "./AccountSettings";
import EmailPassword from "./EmailPassword";
import EmailChange from "./EmailChange";
import PasswordChange from "./PasswordChange";
import UserNameChange from "./UserNameChange";
// import AlexaSetupPin from "./AlexaPin";
// import AlexaPinConfirm from './AlexaPinConfirm'

const Stack = createStackNavigator();

function ReportStack(props) {
  return (
    <Stack.Navigator headerMode="screen">
      <Stack.Screen
        name="Profile Settings"
        options={{
          header: ({ scene, previous, navigation }) => (
            <Header scene={scene} previous={previous} navigation={navigation} />
          ),
        }}
      >
        {(screenProps) => (
          <ProfileHome {...screenProps} updateAuth={props.updateAuth} />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="Basic Info"
        options={{
          header: ({ scene, previous, navigation }) => (
            <Header scene={scene} navigation={navigation} />
          ),
        }}
      >
        {(screenProps) => <BasicInfo {...screenProps} />}
      </Stack.Screen>
      <Stack.Screen
        name="CareGiver Contacts"
        options={{
          header: ({ scene, previous, navigation }) => (
            <Header scene={scene} navigation={navigation} />
          ),
        }}
      >
        {(screenProps) => <CareGiver {...screenProps} />}
      </Stack.Screen>
      <Stack.Screen
        name="Add Caregiver"
        options={{
          headerShown: false,
        }}
      >
        {(screenProps) => <AddCaregiver {...screenProps} />}
      </Stack.Screen>

      <Stack.Screen
        name="Chronic diseases"
        options={{
          header: ({ scene, previous, navigation }) => (
            <Header scene={scene} navigation={navigation} />
          ),
        }}
      >
        {(screenProps) => <ChronicDisease {...screenProps} />}
      </Stack.Screen>

      <Stack.Screen
        name="Account Settings"
        options={{
          header: ({ scene, previous, navigation }) => (
            <Header scene={scene} navigation={navigation} />
          ),
        }}
      >
        {(screenProps) => (
          <AccountSettings {...screenProps} updateAuth={props.updateAuth} />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="Email Password"
        options={{
          header: ({ scene, previous, navigation }) => (
            <Header scene={scene} navigation={navigation} />
          ),
        }}
      >
        {(screenProps) => <EmailPassword {...screenProps} />}
      </Stack.Screen>
      <Stack.Screen name="EmailChange" options={{ headerShown: false }}>
        {(screenProps) => <EmailChange {...screenProps} />}
      </Stack.Screen>
      <Stack.Screen name="UserNameChange" options={{ headerShown: false }}>
        {(screenProps) => <UserNameChange {...screenProps} />}
      </Stack.Screen>
      <Stack.Screen name="PasswordChange" options={{ headerShown: false }}>
        {(screenProps) => <PasswordChange {...screenProps} />}
      </Stack.Screen>
      {/* <Stack.Screen name="AlexaPinSetup" options={{ headerShown: false }}>
        {(screenProps) => <AlexaSetupPin {...screenProps} />}
      </Stack.Screen>
      <Stack.Screen name="AlexaPinConfirm" options={{ headerShown: false }}>
        {(screenProps) => <AlexaPinConfirm {...screenProps} />}
      </Stack.Screen> */}
    </Stack.Navigator>
  );
}
export default ReportStack;
