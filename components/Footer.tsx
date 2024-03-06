import { View, Text, Linking, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
// this will change into a screen switcher, timer-tasks-settings
// if i do implement a stats screen, it will be under settings

export default function Footer() {
  return (
    <View style={styles.footer}>
      <TouchableOpacity onPress={() => Linking.openURL("timer")}>
        {/* the linking part may be wrong, change this later */}
        <Text style={styles.footerText}>Timer</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => Linking.openURL("tasks")}>
        <Text style={styles.footerText}>Tasks</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => Linking.openURL("settings")}>
        <Text style={styles.footerText}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "#F3F3F3",
  },
  footerText: {
    fontSize: 20,
  },
});
