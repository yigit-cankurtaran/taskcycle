import { View, Text, Linking, StyleSheet } from "react-native";

export default function Footer() {
  return (
    <View style={styles.footer}>
      <Text style={styles.text}>
        Created by{" "}
        <Text
          style={styles.link}
          onPress={() =>
            Linking.openURL("https://github.com/yigit-cankurtaran")
          }
        >
          Yiğit Cankurtaran
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#333",
    padding: 10,
    zIndex: 1000,
    // makes it so the footer is always on top
    // doesnt fix the bug with the tasks moving down
  },
  text: {
    textAlign: "center",
    color: "#fff",
  },
  link: {
    color: "lightblue",
  },
});
