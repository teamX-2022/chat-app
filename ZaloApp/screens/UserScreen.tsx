import { View, Text, StyleSheet } from "react-native";

export default function () {
  return (
    <View style={styles.container}>
      <Text>Duy</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
