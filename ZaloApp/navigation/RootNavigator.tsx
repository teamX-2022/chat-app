import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { Pressable, Text, View } from "react-native";

import TabNavigator from "./MainTabNavigator";
import SearchScreen from "../screens/SearchScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import { RootStackParamList, RootStackScreenProps } from "../types";
import AddFriendScreen from "../screens/AddFriendScreen";
import AddGroupScreen from "../screens/AddGroupScreen";
import ChatRoomScreen from "../screens/ChatRoomScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={TabNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ChatRoom"
        component={ChatRoomScreen}
        options={{
          headerShown: true,
          headerTitle: ChatRoomHeader,
          headerStyle: {
            backgroundColor: "#0091ff",
          },
          headerBackTitleVisible: false,
        }}
      />

      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
      <Stack.Group
        screenOptions={{
          presentation: "fullScreenModal",
        }}
      >
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={({ navigation }: RootStackScreenProps<"Search">) => ({
            headerShown: false,
            animation: "none",
          })}
        />
      </Stack.Group>

      <Stack.Group
        screenOptions={{
          presentation: "fullScreenModal",
        }}
      >
        <Stack.Screen
          name="AddGroupScreen"
          component={AddGroupScreen}
          options={({
            navigation,
          }: RootStackScreenProps<"AddGroupScreen">) => ({
            headerTitle: "Nhóm mới",
            headerStyle: {
              backgroundColor: "#EEEEEE",
            },
            headerLeft: () => (
              <Pressable onPress={() => navigation.goBack()}>
                <Text>Hủy</Text>
              </Pressable>
            ),
          })}
        />
      </Stack.Group>

      <Stack.Group
        screenOptions={{
          presentation: "card",
        }}
      >
        <Stack.Screen name="AddFriendScreen" component={AddFriendScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

const ChatRoomHeader = (props) => {
  return (
      <Text style={{}}>Duy</Text>;
  );
};
