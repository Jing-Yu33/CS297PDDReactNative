import React from "react";

import MainStack from "./MainStack";
import ReportStack from "../Drawer_screens/ReportStack";
import ProfileStack from "../Profile/ProfileStack";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { ProfileDrawer } from "../../components/ProfileDrawer";

const Drawer = createDrawerNavigator();

function MainNav(props) {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        headerMode="screen"
        //removed props in () => below
        drawerContent={(props) => <ProfileDrawer {...props} />}
      >
        {console.log(props)}
        <Drawer.Screen name="MainStack">
          {(screenProps) => (
            <MainStack {...screenProps} updateAuth={props.updateAuth} />
          )}
        </Drawer.Screen>
        <Drawer.Screen name="ReportStack">
          {(screenProps) => <ReportStack {...screenProps} />}
        </Drawer.Screen>
        <Drawer.Screen name="ProfileStack">
          {(screenProps) => (
            <ProfileStack {...screenProps} updateAuth={props.updateAuth} />
          )}
        </Drawer.Screen>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default MainNav;
