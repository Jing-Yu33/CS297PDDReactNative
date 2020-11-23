import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import Header from "../../components/Header";
import QuitHeader from "../../components/QuitHeader";
import ReportHome from "./ReportHome";
import ReportType from "../create_report/ReportType";
import VisitDate from "../create_report/VisitDate";
import SymptomRange from "../create_report/SymptomRange";
import SymptomList from "../create_report/SymptomList";
import AdditionalNotes from "../create_report/AdditionalNotes";
// import ShareHome from "../share_report/ShareHome";
import SendTime from "../share_report/SendTime";
import DatePicker from "../share_report/DatePicker";
import Summary from "../create_report/Summary";
// import AddCaregiver from "../share_report/AddCareGIver";
import ReportPreview from "./ReportPreview";
import SymptomSummary from "../main/SymptomSummary";

const Stack = createStackNavigator();

function ReportStack(props) {
  return (
    <Stack.Navigator headerMode="screen"  screenOptions = {{cardStyle : {backgroundColor :"#fff"}}}>
      <Stack.Screen
        name="ReportHome"
        options={{
          header: ({ scene, previous, navigation }) => (
            <Header scene={scene} previous={previous} navigation={navigation} />
          ),
        }}
      >
        {(screenProps) => (
          <ReportHome {...screenProps} updateAuth={props.updateAuth} />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="ReportView"
        options={{
          header: ({ navigation }) => <QuitHeader navigation={navigation} />,
        }}
      >
        {(screenProps) => <ReportPreview {...screenProps} />}
      </Stack.Screen>
      <Stack.Screen name="SymptomSummary" options={{ headerShown: false }}>
        {(screenProps) => <SymptomSummary {...screenProps} />}
      </Stack.Screen>
      <Stack.Screen name="ReportType">
        {(screenProps) => <ReportType {...screenProps} />}
      </Stack.Screen> 
      <Stack.Screen
        name="VisitDate"
        options={{
          header: ({ navigation }) => <QuitHeader navigation={navigation} />,
        }}
      >
        {(screenProps) => <VisitDate {...screenProps} />}
      </Stack.Screen>
      <Stack.Screen
        name="SymptomRange"
        options={{
          header: ({ navigation }) => <QuitHeader navigation={navigation} />,
        }}
      >
        {(screenProps) => <SymptomRange {...screenProps} />}
      </Stack.Screen>
      <Stack.Screen
        name="SymptomList"
        options={{
          header: ({ navigation }) => <QuitHeader navigation={navigation} />,
        }}
      >
        {(screenProps) => <SymptomList {...screenProps} />}
      </Stack.Screen>
      <Stack.Screen
        name="AdditionalNotes"
        options={{
          header: ({ navigation }) => <QuitHeader navigation={navigation} />,
        }}
      >
        {(screenProps) => <AdditionalNotes {...screenProps} />}
      </Stack.Screen>
      {/* <Stack.Screen
        name="ShareHome"
        options={{
          header: ({ navigation }) => <QuitHeader navigation={navigation} />,
        }}
      >
        {(screenProps) => <ShareHome {...screenProps} />}
      </Stack.Screen> */}
      <Stack.Screen
        name="SendTime"
        options={{
          header: ({ navigation }) => <QuitHeader navigation={navigation} />,
        }}
      >
        {(screenProps) => <SendTime {...screenProps} />}
      </Stack.Screen>
      {/* <Stack.Screen
        name="DatePicker"
        options={{
          header: ({ navigation }) => <QuitHeader navigation={navigation} />,
        }}
      >
        {(screenProps) => <DatePicker {...screenProps} />}
      </Stack.Screen> */}
      <Stack.Screen
        name="Summary"
        options={{
          header: ({ navigation }) => <QuitHeader navigation={navigation} />,
        }}
      >
        {(screenProps) => <Summary {...screenProps} />}
      </Stack.Screen>
      <Stack.Screen
        name="AddCareGiver"
        options={{
          header: ({ navigation }) => <QuitHeader navigation={navigation} />,
        }}
      >
        {(screenProps) => <AddCaregiver {...screenProps} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
export default ReportStack;
