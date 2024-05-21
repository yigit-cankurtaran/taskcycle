import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "./helpers/theme";
// if we used a bottom navigation bar this would be p much obsolete
// check it out later

interface FooterProps {
  screenNames: string[];
  currentScreen: string;
}

export default function Footer({ screenNames, currentScreen }: FooterProps) {
  const navigation = useNavigation();
  const icons = ["timer", "list", "settings"];
  return (
    <View>
      {/* <Text style={{ color: "white" }}>Swipe to delete tasks</Text>
      <Text>Long press to edit tasks</Text> */}
      {/* implement these if the screen is Tasks */}
      <View style={styles.footer}>
        {screenNames.map((screenName: string, index: number) => (
          <View style={styles.footerItem} key={screenName}>
            <View style={styles.itemContainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate(screenName)}
                // shows an error but it works
                style={styles.iconContainer}
              >
                <Ionicons name={icons[index] as any} size={24} color="black" />
                {/* string here gives an error */}
                <Text
                  style={[
                    styles.footerText,
                    screenName === currentScreen && styles.boldText,
                  ]}
                >
                  {screenName}
                </Text>
              </TouchableOpacity>
            </View>
            {index < screenNames.length - 1 && <View style={styles.divider} />}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: theme.colors.primary,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
  },
  footerItem: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  itemContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    fontSize: 16,
    color: theme.colors.surface,
  },
  boldText: {
    fontWeight: "bold",
  },
  divider: {
    height: "100%",
    borderLeftWidth: 1,
    borderLeftColor: "black",
  },
  iconContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});
