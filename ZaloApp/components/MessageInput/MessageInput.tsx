import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import {
  AntDesign,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";

const MessageInput = () => {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    console.warn("send: ", message);
    setMessage("");
  };

  const onPress = () => {
    if (message) {
      sendMessage();
    } else {
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={70}
    >
      <View style={styles.inputContainer}>
        <SimpleLineIcons
          name="emotsmile"
          size={24}
          color="#595959"
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={(newMessage) => setMessage(newMessage)}
          placeholderTextColor="#BBBBBB"
          placeholder="Tin nhắn"
        />
        <Feather name="camera" size={24} color="#595959" style={styles.icon} />
        <MaterialCommunityIcons
          name="microphone-outline"
          size={24}
          color="#595959"
          style={styles.icon}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Text style={styles.buttonText}>
          {message ? (
            <Pressable onPress={() => sendMessage()}>
              <Ionicons name="send" size={24} color="black" />
            </Pressable>
          ) : (
            <AntDesign name="plus" size={24} color="white" />
          )}
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    padding: 10,
  },
  inputContainer: {
    backgroundColor: "#f2f2f2",
    flex: 1,
    marginRight: 10,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#dedede",
    alignItems: "center",
    flexDirection: "row",
    padding: 5,
  },
  input: {
    flex: 1,
    marginHorizontal: 5,
  },
  icon: {
    marginHorizontal: 5,
  },
  buttonContainer: {
    width: 40,
    height: 40,
    backgroundColor: "#3777f0",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 30,
  },
});

export default MessageInput;
