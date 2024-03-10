// if this for some reason has APKs that crash
// just import react from "react" here
import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Footer from "./components/Footer";
import SettingsScreen from "./components/SettingsScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import TaskScreen from "./components/TaskScreen";
import TimerScreen from "./components/TimerScreen";
import { PaperProvider } from "react-native-paper";
import { theme } from "./components/helpers/theme";

const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          {/* we have to use flex:1 here otherwise it's broken */}
          <NavigationContainer>
            <StatusBar style="auto" />
            <Stack.Navigator initialRouteName="TimerScreen">
              <Stack.Screen name="Timer" component={TimerScreen} />
              <Stack.Screen name="Tasks" component={TaskScreen} />
              <Stack.Screen name="Settings" component={SettingsScreen} />
            </Stack.Navigator>
            <Footer screenNames={["Timer", "Tasks", "Settings"]} />
          </NavigationContainer>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </PaperProvider>
  );
}
