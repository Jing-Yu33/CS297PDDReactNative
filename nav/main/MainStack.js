import React from "react";

import Home from "./Home";

import { createStackNavigator } from "@react-navigation/stack";
import Header from "../../components/Header";
import QuitHeader from "../../components/QuitHeader";
import Intro from "../create_symptom/Intro";
import SelectSymptoms from "../create_symptom/SelectSymptoms";
import Timeline from "../create_symptom/Timeline";
import Resolved from "../create_symptom/Resolved";
import Location from "../create_symptom/Location";
import Frequency from "../create_symptom/Frequency";
import PainScale from "../create_symptom/PainScale";
import BotherScale from "../create_symptom/BotherScale";
import Description from "../create_symptom/Description";
import FeelBetter from "../create_symptom/FeelBetter";
import FeelWorse from "../create_symptom/FeelWorse";
import RelatedSymptoms from "../create_symptom/RelatedSymptoms";
import PainMovement from "../create_symptom/PainMovement";
import Summary from "../create_symptom/Summary";
import SelectSymptomsNew from "../create_symptom/SelectSymptomsNew";
import Review from "../create_symptom/Review";
import SymptomSummary from "./SymptomSummary";
import DescriptionText from "../create_symptom/DescriptionText";
import ResolvedDate from "../create_symptom/ResolvedDate";
import IncompleteSymptoms from "../Drawer_screens/IncompleteSymptoms";
import Signup from "../auth/SignUp";
// import Route2 from "./Route2";
import Auth from "../auth/Auth";
import Better from "../review_symptom/Better";
import ResolvedReview from "../review_symptom/ResolvedReview";

const Stack = createStackNavigator();

function MainStack(props) {
  return (
    <Stack.Navigator
      headerMode="screen"
      screenOptions={{
        header: ({ scene, previous, navigation }) => (
          <Header scene={scene} previous={previous} navigation={navigation} />
        ),
        cardStyle : {backgroundColor :"#fff"}
      }}
    >
      {/* <Stack.Screen name="Route2" options={{ headerShown: false }}>
        {(screenProps) => <Route2 {...screenProps} />}
      </Stack.Screen> */}

      <Stack.Screen name="Home">
        {(screenProps) => (
          <Home {...screenProps} updateAuth={props.updateAuth} />
        )}
      </Stack.Screen>

      <Stack.Screen name="SignUp">
        {(screenProps) => (
          <Signup
            {...screenProps}
            updateAuth={props.updateAuth}
            showSignUpFlow={true}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="Auth" options={{ headerShown: false }}>
        {(screenProps) => (
          <Auth
            {...screenProps}
            updateAuth={props.updateAuth}
            showSignUpFlow={true}
            formType="showSignUp"
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="Better" options={{ headerShown: false }}>
        {(screenProps) => <Better {...screenProps} />}
      </Stack.Screen>

      <Stack.Screen name="ResolvedReview" options={{ headerShown: false }}>
        {(screenProps) => <ResolvedReview {...screenProps} />}
      </Stack.Screen>

      <Stack.Screen
        name="Incomplete symptoms"
        options={{
          header: ({ scene, previous, navigation }) => (
            <Header scene={scene} navigation={navigation} />
          ),
        }}
      >
        {(screenProps) => <IncompleteSymptoms {...screenProps} />}
      </Stack.Screen>

      <Stack.Screen
        name="Intro"
        options={{
          header: ({ navigation }) => <QuitHeader navigation={navigation} />,
        }}
      >
        {(screenProps) => <Intro {...screenProps} />}
      </Stack.Screen>

      <Stack.Screen
        name="SelectSymptomsNew"
        options={{
          header: ({ navigation }) => <QuitHeader navigation={navigation} />,
        }}
      >
        {(screenProps) => <SelectSymptomsNew {...screenProps} />}
      </Stack.Screen>

      <Stack.Screen
        name="Timeline"
        options={{
          header: ({ navigation }) => <QuitHeader navigation={navigation} />,
        }}
      >
        {(screenProps) => <Timeline {...screenProps} />}
      </Stack.Screen>

      <Stack.Screen
        name="Resolved"
        options={{
          header: ({ navigation }) => (
            <QuitHeader
              navigation={navigation}
              quitSaveMode={true}
              params={
                props.route.state.routes[props.route.state.routes.length - 1]
                  .params
              }
            />
          ),
        }}
      >
        {(screenProps) => <Resolved {...screenProps} />}
      </Stack.Screen>
      <Stack.Screen
        name="Location"
        options={{
          header: ({ navigation }) => <QuitHeader navigation={navigation} />,
        }}
      >
        {(screenProps) => <Location {...screenProps} />}
      </Stack.Screen>
      <Stack.Screen
        name="Frequency"
        options={{
          header: ({ navigation }) => <QuitHeader navigation={navigation} />,
        }}
      >
        {(screenProps) => <Frequency {...screenProps} />}
      </Stack.Screen>
      <Stack.Screen
        name="PainScale"
        options={{
          header: ({ navigation }) => <QuitHeader navigation={navigation} />,
        }}
      >
        {(screenProps) => <PainScale {...screenProps} />}
      </Stack.Screen>
      <Stack.Screen
        name="BotherScale"
        options={{
          header: ({ navigation }) => (
            <QuitHeader
              navigation={navigation}
              quitSaveMode={true}
              params={
                props.route.state.routes[props.route.state.routes.length - 1]
                  .params
              }
            />
          ),
        }}
      >
        {(screenProps) => <BotherScale {...screenProps} />}
      </Stack.Screen>
      <Stack.Screen
        name="Description"
        options={{
          header: ({ navigation }) => <QuitHeader navigation={navigation} params={
            props.route.state.routes[props.route.state.routes.length - 1]
              .params
          }/>,
        }}
      >
        {(screenProps) => <Description {...screenProps} />}
      </Stack.Screen>
      <Stack.Screen
        name="FeelBetter"
        options={{
          header: ({ navigation }) => (
            <QuitHeader
              navigation={navigation}
              quitSaveMode={true}
              params={
                props.route.state.routes[props.route.state.routes.length - 1]
                  .params
              }
            />
          ),
        }}
      >
        {(screenProps) => <FeelBetter {...screenProps} />}
      </Stack.Screen>
      <Stack.Screen
        name="FeelWorse"
        options={{
          header: ({ navigation }) => (
            <QuitHeader
              navigation={navigation}
              quitSaveMode={true}
              params={
                props.route.state.routes[props.route.state.routes.length - 1]
                  .params
              }
            />
          ),
        }}
      >
        {(screenProps) => <FeelWorse {...screenProps} />}
      </Stack.Screen>
      <Stack.Screen
        name="RelatedSymptoms"
        options={{
          header: ({ navigation }) => (
            <QuitHeader
              navigation={navigation}
              quitSaveMode={true}
              params={
                props.route.state.routes[props.route.state.routes.length - 1]
                  .params
              }
            />
          ),
        }}
      >
        {(screenProps) => <RelatedSymptoms {...screenProps} />}
      </Stack.Screen>
      <Stack.Screen
        name="PainMovement"
        options={{
          header: ({ navigation }) => <QuitHeader navigation={navigation} />,
        }}
      >
        {(screenProps) => <PainMovement {...screenProps} />}
      </Stack.Screen>
      <Stack.Screen name="Summary" options={{ headerShown: false }}>
        {(screenProps) => <Summary {...screenProps} />}
      </Stack.Screen>
      <Stack.Screen
        name="Review"
        options={{
          header: ({ navigation }) => (
            <QuitHeader
              navigation={navigation}
              quitSaveMode={true}
              params={
                props.route.state.routes[props.route.state.routes.length - 1]
                  .params
              }
            />
          ),
        }}
      >
        {(screenProps) => <Review {...screenProps} />}
      </Stack.Screen>
      <Stack.Screen name="SymptomSummary" options={{ headerShown: false }}>
        {(screenProps) => <SymptomSummary {...screenProps} />}
      </Stack.Screen>
      <Stack.Screen
        name="DescriptionText"
        options={{
          header: ({ navigation }) => <QuitHeader navigation={navigation} />,
        }}
      >
        {(screenProps) => <DescriptionText {...screenProps} />}
      </Stack.Screen>

      <Stack.Screen
        name="ResolvedDate"
        ooptions={{
          header: ({ navigation }) => (
            <QuitHeader
              navigation={navigation}
              quitSaveMode={true}
              params={
                props.route.state.routes[props.route.state.routes.length - 1]
                  .params
              }
            />
          ),
        }}
      >
        {(screenProps) => <ResolvedDate {...screenProps} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
export default MainStack;
