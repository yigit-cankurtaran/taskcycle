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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    textAlign: "center",
    color: "#fff",
  },
  link: {
    color: "lightblue",
  },
});
