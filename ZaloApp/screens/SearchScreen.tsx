import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, View, Text, Pressable, Platform } from "react-native";

import HistorySearchItem from "../components/HistorySearchItem/HistorySearchItem";
import SearchInput from "../components/SearchInput";
import { RootStackScreenProps } from "../types";
import { getDefaultHeaderHeight } from "@react-navigation/elements";
import {
  useSafeAreaFrame,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function ModalScreen({
  navigation,
}: RootStackScreenProps<"Search">) {
  const frame = useSafeAreaFrame();
  const insets = useSafeAreaInsets();

  const headerHeight = getDefaultHeaderHeight(frame, false, insets.top);
  return (
    <View style={styles.container}>
      <View style={[styles.header, { height: headerHeight }]}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={26} color="white" />
        </Pressable>
        <SearchInput />
        <Pressable>
          <MaterialIcons name="qr-code-scanner" size={24} color="white" />
        </Pressable>
      </View>
      <Text style={{ padding: 12 }}>Liên hệ đã tìm</Text>
      <HistorySearchItem />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    backgroundColor: "#0091ff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: Platform.OS === "ios" ? 20 : 39.4,
    elevation: 4,
    paddingStart: 10,
    paddingEnd: 15,
  },
});
