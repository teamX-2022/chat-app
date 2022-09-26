import { StyleSheet, Text, View, TextInput } from "react-native";
import styles from "./styles";
export default function SearchInput() {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholderTextColor="#717070"
        placeholder="Tìm kiếm"
        autoFocus={true}
        clearButtonMode="always"
      />
    </View>
  );
}
