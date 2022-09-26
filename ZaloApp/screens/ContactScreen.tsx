import { StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { RootTabScreenProps } from "../types";
import FriendScreen from "./FriendScreen";
import GroupScreen from "./GroupScreen";
import OAScreen from "./OAScreen";

const Tab = createMaterialTopTabNavigator();

export default function TabOneScreen() {
  return (
    <Tab.Navigator
      initialRouteName="TabChat"
      screenOptions={{
        tabBarActiveTintColor: "black",
        tabBarStyle: {
          backgroundColor: "white",
        },
      }}
    >
      <Tab.Screen name="Friend" component={FriendScreen} />
      <Tab.Screen name="Group" component={GroupScreen} />
      <Tab.Screen name="OA" component={OAScreen} />
    </Tab.Navigator>
  );
}
