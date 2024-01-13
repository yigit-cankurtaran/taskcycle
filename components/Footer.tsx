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
    width: "100%",
    // percentage value, might lead to a crash, will test later
    position: "absolute",
    bottom: 0,
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
