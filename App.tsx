// if this for some reason has APKs that crash
// just import react from "react" here
import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView } from "react-native";
import MainScreen from "./components/MainScreen";
import Footer from "./components/Footer";
// TODO: it's absolutely messed up after converting to APK, look into it

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <MainScreen />
      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
