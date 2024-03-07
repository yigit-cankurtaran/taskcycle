// if this for some reason has APKs that crash
// just import react from "react" here
import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainScreen from "./components/helpers/MainScreen";
import Footer from "./components/Footer";
import SettingsScreen from "./components/SettingsScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import TaskScreen from "./components/TaskScreen";
import TimerScreen from "./components/TimerScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <View style={styles.container}>
            <StatusBar style="auto" />
            <Stack.Navigator initialRouteName="TimerScreen">
              {/* <MainScreen /> */}
              <Stack.Screen name="TimerScreen" component={TimerScreen} />
              <Stack.Screen name="TaskScreen" component={TaskScreen} />
              <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
            </Stack.Navigator>
            <Footer
              screenNames={["TimerScreen", "TaskScreen", "SettingsScreen"]}
            />
          </View>
        </NavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
