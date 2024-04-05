// if this for some reason has APKs that crash
// just import react from "react" here
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Footer from "./components/Footer";
import SettingsScreen from "./components/SettingsScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import TaskScreen from "./components/TaskScreen";
import TimerScreen from "./components/TimerScreen";
import { PaperProvider } from "react-native-paper";

const Stack = createStackNavigator();

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("Timer");
  return (
    <PaperProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        {/* we have to use flex:1 here otherwise it's broken */}
        <SafeAreaProvider>
          <NavigationContainer
            onStateChange={(state) => {
              if (!state) return;
              const routeName = state.routes[state.index].name;
              setCurrentScreen(routeName);
            }}
          >
            <StatusBar style="auto" />
            <SafeAreaView style={{ flex: 1 }}>
              {/* fixes camera overlap */}
              <Stack.Navigator
                initialRouteName="TimerScreen"
                screenOptions={{ headerShown: false }}
              >
                <Stack.Screen name="Timer" component={TimerScreen} />
                <Stack.Screen name="Tasks" component={TaskScreen} />
                <Stack.Screen name="Settings" component={SettingsScreen} />
              </Stack.Navigator>
              <Footer
                screenNames={["Timer", "Tasks", "Settings"]}
                currentScreen={currentScreen}
              />
            </SafeAreaView>
          </NavigationContainer>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </PaperProvider>
  );
}
