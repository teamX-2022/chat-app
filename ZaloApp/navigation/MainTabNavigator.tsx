import { Text, View } from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";
import { Pressable, TouchableOpacity } from "react-native";
import { useState } from "react";
import useColorScheme from "../hooks/useColorScheme";
import TabChatScreen from "../screens/ChatScreen";
import TabContactScreen from "../screens/ContactScreen";
import TabUserScreen from "../screens/UserScreen";
import { RootTabParamList, RootTabScreenProps } from "../types";
import Tooltip from "react-native-walkthrough-tooltip";
import MenuPopup from "../components/MenuPopup/MenuPopup";

const BottomTab = createBottomTabNavigator<RootTabParamList>();

export default function TabNavigator() {
  const colorScheme = useColorScheme();
  const [showTip, setTip] = useState(false);

  function headerSearch(navigation: any) {
    return (
      <Pressable
        onPress={() => {
          navigation.navigate("Search");
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <AntDesign
            name="search1"
            size={23}
            color="white"
            style={{ marginLeft: 15 }}
          />
          <Text
            style={{
              color: "white",
              paddingLeft: 22,
              fontSize: 16,
              opacity: 0.6,
            }}
          >
            Tìm kiếm
          </Text>
        </View>
      </Pressable>
    );
  }

  function headerMenuPopup(navigation: any) {
    return (
      <View style={{ flexDirection: "row" }}>
        <Pressable>
          <MaterialIcons
            name="qr-code-scanner"
            size={24}
            color="white"
            style={{ marginRight: 20 }}
          />
        </Pressable>
        <View>
          <Tooltip
            isVisible={showTip}
            content={<MenuPopup navigation={navigation} setTip={setTip} />}
            onClose={() => setTip(false)}
            placement="bottom"
            displayInsets={{ top: 24, bottom: 24, left: 24, right: 12 }}
          >
            <TouchableOpacity onPress={() => setTip(true)}>
              <AntDesign
                name="plus"
                size={25}
                color="white"
                style={{ marginRight: 15 }}
              />
            </TouchableOpacity>
          </Tooltip>
        </View>
      </View>
    );
  }

  return (
    <BottomTab.Navigator
      initialRouteName="TabChat"
      screenOptions={{
        tabBarActiveTintColor: "#0091ff",
        tabBarStyle: {
          backgroundColor: "white",
        },
      }}
    >
      <BottomTab.Screen
        name="TabChat"
        component={TabChatScreen}
        options={({ navigation }: RootTabScreenProps<"TabChat">) => ({
          title: "Tin nhắn",
          tabBarIcon: ({ color }) => (
            <AntDesign name="message1" size={24} color={color} />
          ),
          headerStyle: {
            backgroundColor: "#0091ff",
          },
          headerTitle: "",
          headerLeft: () => headerSearch(navigation),
          headerRight: () => headerMenuPopup(navigation),
        })}
      />
      <BottomTab.Screen
        name="TabContact"
        component={TabContactScreen}
        options={({ navigation }: RootTabScreenProps<"TabContact">) => ({
          title: "Danh bạ",
          tabBarIcon: ({ color }) => (
            <AntDesign name="contacts" size={26} color={color} />
          ),
          headerStyle: {
            backgroundColor: "#0091ff",
          },
          headerTitle: "",
          headerLeft: () => headerSearch(navigation),
          headerRight: () => (
            <Pressable onPress={() => navigation.navigate("AddFriendScreen")}>
              <AntDesign
                name="adduser"
                size={24}
                color="white"
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="TabUser"
        component={TabUserScreen}
        options={({ navigation }: RootTabScreenProps<"TabUser">) => ({
          title: "Cá nhân",
          tabBarIcon: ({ color }) => (
            <AntDesign name="user" size={26} color={color} />
          ),
          headerStyle: {
            backgroundColor: "#0091ff",
          },
          headerTitle: "",
          headerLeft: () => headerSearch(navigation),
          headerRight: () => (
            <Pressable>
              <AntDesign
                name="setting"
                size={24}
                color="white"
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
    </BottomTab.Navigator>
  );
}
