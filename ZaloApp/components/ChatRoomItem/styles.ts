import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
  },
  image: {
    height: 55,
    width: 55,
    borderRadius: 30,
    marginRight: 10,
    // position: "absolute",
  },
  badgeContainer: {
    backgroundColor: "#db342e",
    width: 25,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: 300,

  },
  badgeText: {
    color: "white",
    fontSize: 10,
  },
  rightContainer: {
    flex: 1,
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontWeight: "bold",
    fontSize: 17,
    marginBottom: 2,
    maxWidth:270
  },
  text: {
    color: "grey",
    maxWidth:280
  },
  textBold: {
    fontWeight: "bold",
  }
});


export default styles;