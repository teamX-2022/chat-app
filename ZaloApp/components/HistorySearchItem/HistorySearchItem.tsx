import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import styles from "./styles";

const HistorySearchItem = () => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/biahaze.jpg",
        }}
        style={styles.image}
      />
      <View>
        <Text style={styles.name}>Khanh Duy</Text>
      </View>
    </View>
  );
};

export default HistorySearchItem;
