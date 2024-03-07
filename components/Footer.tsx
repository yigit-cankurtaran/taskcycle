import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { ReactElement, JSXElementConstructor, ReactNode, Key } from "react";
// this will change into a screen switcher, timer-tasks-settings
// if i do implement a stats screen, it will be under settings

export default function Footer({ screenNames }: { screenNames: string[] }) {
  const navigation = useNavigation();
  return (
    <View style={styles.footer}>
      {screenNames.map((screenName: string) => (
        <TouchableOpacity
          key={screenName}
          onPress={() => navigation.navigate(screenName)}
          // this gives an error but it works, at least on the web
          // check again on mobile
        >
          <Text style={styles.footerText}>{screenName}</Text>
        </TouchableOpacity>
      ))}
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
