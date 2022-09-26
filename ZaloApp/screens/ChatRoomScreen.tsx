import { StyleSheet, Text, View, FlatList, SafeAreaView } from "react-native";
import { useRoute } from "@react-navigation/native";
import Message from "../components/Message";
import chatRoomData from "../assets/dummy-data/Chats";
import MessageInput from "../components/MessageInput";

export default function ChatRoomScreen() {
  const route = useRoute();
  console.warn("aaaa", route.params?.id);
  return (
    <SafeAreaView style={styles.page}>
      <FlatList
        data={chatRoomData.messages}
        renderItem={({ item }) => <Message message={item} />}
      />
      <MessageInput />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "white",
  },
});
