import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  FlatList,
} from "react-native";

import ChatRoomItem from "../components/ChatRoomItem";

import ChatRoomData from "../assets/dummy-data/ChatRooms";

const chatRoom1 = ChatRoomData[0];
const chatRoom2 = ChatRoomData[1];

export default function TabTwoScreen() {
  return (
    <View style={styles.page}>
      <FlatList
        data={ChatRoomData}
        renderItem={({ item }) => <ChatRoomItem chatRoom={item} />}
        showsVerticalScrollIndicator={false}
        // ListHeaderComponent={() => (
        //   <FlatList
        //     data={ChatRoomData}
        //     renderItem={({ item }) => <ChatRoomItem chatRoom={item} />}
        //     showsVerticalScrollIndicator={false}
        //     horizontal
        //   />
        // )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    flex: 1,
  },
});
