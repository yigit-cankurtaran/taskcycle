import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
// this will change into a screen switcher, timer-tasks-settings
// if i do implement a stats screen, it will be under settings

interface FooterProps {
  screenNames: string[];
  currentScreen: string;
}

export default function Footer({ screenNames, currentScreen }: FooterProps) {
  const navigation = useNavigation();
  return (
    <View style={styles.footer}>
      {screenNames.map((screenName: string) => (
        <TouchableOpacity
          key={screenName}
          onPress={() => navigation.navigate(screenName)}
          // shows an error but it works
        >
          <Text
            style={[
              styles.footerText,
              screenName === currentScreen && styles.boldText,
            ]}
          >
            {screenName}
          </Text>
        </TouchableOpacity>
        // TODO: add a divider between the text
        // TODO: add icons to the text
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
  boldText: {
    fontWeight: "bold",
  },
});
