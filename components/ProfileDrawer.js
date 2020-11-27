import React, { useEffect, useState } from "react";
import { View, StyleSheet, AsyncStorage, TouchableOpacity } from "react-native";
import {
  DrawerItem,
  DrawerContentScrollView,
  useIsDrawerOpen,
} from "@react-navigation/drawer";
import { useFocusEffect } from "@react-navigation/native";
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
  Divider,
} from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { scale, verticalScale, moderateScale } from "./Scale";
import Storage from "@aws-amplify/storage";
import { useSelector } from 'react-redux';
import { Auth } from "aws-amplify";

const _retrieveUser = async () => {
  const userObj = (await AsyncStorage.getItem("userObj")) || "none";
  return JSON.parse(userObj);
};

const _retrieveNumloggedSymptom = async () => {
  const loggedSympLastMonth =
    (await AsyncStorage.getItem("loggedSympLastMonth")) || 0;
  return loggedSympLastMonth;
};

const _retrieveNumIncompleteSymptoms = async () => {
  const numIncompleteSymptoms =
    (await AsyncStorage.getItem("NumIncompleteSymptoms")) || 0;
  return numIncompleteSymptoms;
};
const _retrieveNumReviewSymptoms = async () => {
  const numReviewSymptoms =
    (await AsyncStorage.getItem("NumReviewSymptoms")) || 0;
  return numReviewSymptoms;
};


/* const finishSymptoms = (navigation) => {
  navigation.navigate("IncompleteSymptoms");
}; */

export function ProfileDrawer(props) {
  const [userObj, setuserObj] = useState(0);
  const [loggedSympLastMonth, setloggedSympLastMonth] = useState(0);
  const [numIncompleteSymptoms, setNumIncompleteSymptoms] = useState(0);
  const [numReviewSymptoms, setNumReviewSymptoms] = useState(0);
  const [userId, setUserId] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(0);

  const updateSymptomNumbers = () => {
    _retrieveUser().then(setuserObj);
    _retrieveNumloggedSymptom().then(setloggedSympLastMonth);
    _retrieveNumIncompleteSymptoms().then(setNumIncompleteSymptoms);
    _retrieveNumReviewSymptoms().then(setNumReviewSymptoms);
  };

  useEffect(() => {
    updateSymptomNumbers();
  }, []);

  /* useEffect(() => {
    const unsubscribe = props.navigation.addListener("drawerOpen", (e) => {
      updateSymptomNumbers();
    });

    return unsubscribe;
  }, [props.navigation]); */

  /* useEffect(() => {
    if (isDrawerOpen) {
      // handle navigation is open
      updateSymptomNumbers();
    }
  }, [isDrawerOpen]);
 */

  const clearAppData = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      await AsyncStorage.multiRemove(keys);
    } catch (error) {
      console.error("Error clearing app data.");
    }
  };

  const signOut = async (props) => {
    try {
      await clearAppData();
      await Auth.signOut();
      props.updateAuth("auth");
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }
  const reviewSymptoms = () => {
    props.navigation.navigate("Home");
  };
  const imageUrl = useSelector(state => state.profileImageUrl);

  return (

    <DrawerContentScrollView {...props}>
      <View style={styles.drawerContent}>
        <View style={styles.userInfoSection}>
          <Avatar.Image
            source={(imageUrl && imageUrl !== 0) ? { uri: imageUrl } : require('../assets/default_profile.png')}
            size={50}
            style={{ backgroundColor: "rgba(0,0,0,0)" }}
            defaultSource={require('../assets/default_profile.png')}
          />
          <Title style={styles.title}>{userObj.username}</Title>
          <Caption style={styles.caption}>
            {loggedSympLastMonth} symptoms logged in this month
          </Caption>
          {/* <View style={styles.row}>
            <View style={styles.section}>
              <Paragraph style={[styles.paragraph, styles.caption]}>
                202
              </Paragraph>
              <Caption style={styles.caption}>Following</Caption>
            </View>
            <View style={styles.section}>
              <Paragraph style={[styles.paragraph, styles.caption]}>
                159
              </Paragraph>
              <Caption style={styles.caption}>Followers</Caption>
            </View>
          </View> */}
          <Divider style={styles.divider} />
          <Caption style={styles.caption}>To Do List</Caption>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("Incomplete symptoms")}
          >
            <View style={styles.greyCard}>
              <Text style={styles.boldText}>
                <Text style={styles.orangeText}>{useSelector(state => state.numIncompleteSymptoms)}</Text>{" "}
              incomplete symptoms in the past 24 hours.
            </Text>
              <Text style={styles.orangeText}>FINISH NOW</Text>
            </View>
          </TouchableOpacity>
          {(
            <TouchableOpacity onPress={reviewSymptoms}>
              <View style={styles.greyCard}>
                <Text style={styles.boldText}>
                  {console.log("ProfileDrawer " + useSelector(state => state.numReviewSymptoms))}
                  <Text style={styles.orangeText}>{useSelector(state => state.numReviewSymptoms)}</Text>{" "}
                symptoms reviews this week.
              </Text>

                <Text style={styles.orangeText}>REVIEW</Text>

              </View>
            </TouchableOpacity>
          )}
        </View>

        <Drawer.Section style={styles.drawerSection}>
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="account-outline"
                color={color}
                size={size}
              />
            )}
            label="Symptoms"
            onPress={() => {
              props.navigation.navigate("Home");
            }}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons name="tune" color={color} size={size} />
            )}
            label="Health Report"
            onPress={() => {
              props.navigation.navigate("ReportStack");
            }}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="bookmark-outline"
                color={color}
                size={size}
              />
            )}
            label="Profile Settings"
            onPress={() => {
              props.navigation.navigate("ProfileStack");
            }}
          />

          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="bookmark-outline"
                color={color}
                size={size}
              />
            )}
            label="Logout"
            onPress={() => {
              signOut(props);
            }}
          />
        </Drawer.Section>



        {/* <Drawer.Section title="Preferences">
          <TouchableRipple onPress={() => {}}>
            <View style={styles.preference}>
              <Text>Dark Theme</Text>
              <View pointerEvents="none">
                <Switch value={false} />
              </View>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={() => {}}>
            <View style={styles.preference}>
              <Text>RTL</Text>
              <View pointerEvents="none">
                <Switch value={false} />
              </View>
            </View>
          </TouchableRipple>
        </Drawer.Section> */}
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    marginTop: 20,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  divider: {
    marginVertical: 10,
  },
  orangeText: {
    fontSize: moderateScale(16),
    color: "#ffc909",
  },
  greyCard: {
    marginVertical: verticalScale(10),
    backgroundColor: "#F8F8F8",
    padding: moderateScale(10),
    marginRight: scale(15),
  },
});
