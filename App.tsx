// if this for some reason has APKs that crash
// just import react from "react" here
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// might switch this to expo router
import Footer from "./components/Footer";
import SettingsScreen from "./components/SettingsScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import TaskScreen from "./components/TaskScreen";
import TimerScreen from "./components/TimerScreen";
import { PaperProvider } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { theme } from "./components/helpers/theme";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";

const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: theme.colors.primary,
        backgroundColor: theme.colors.background,
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{ fontSize: 15, color: "white" }}
      text2Style={{ fontSize: 12 }}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: theme.colors.error,
        backgroundColor: theme.colors.background,
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{ fontSize: 15, color: "white" }}
      text2Style={{ fontSize: 12 }}
    />
  ),
};

const Stack = createStackNavigator();

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("Timer");
  return (
    <PaperProvider theme={theme}>
      <GestureHandlerRootView
        style={{ flex: 1, backgroundColor: theme.colors.background }}
      >
        {/* we have to use flex:1 here otherwise it's broken */}
        <SafeAreaProvider>
          <View style={styles.container}>
            <NavigationContainer
              onStateChange={(state) => {
                if (!state) return;
                const routeName = state.routes[state.index].name;
                setCurrentScreen(routeName);
              }}
            >
              <StatusBar style="light" />
              <SafeAreaView
                style={{ flex: 1, backgroundColor: theme.colors.background }}
              >
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
                <Toast config={toastConfig} />
              </SafeAreaView>
            </NavigationContainer>
          </View>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});

// change app icon and splash screen
