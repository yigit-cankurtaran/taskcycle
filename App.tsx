// if this for some reason has APKs that crash
// just import react from "react" here
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, SafeAreaView } from "react-native";
import TimerView from "./components/TimerView";
import Footer from "./components/Footer";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <TimerView pomodoroDecrease={() => {}} />
      <Text>probably will be moving the other app here</Text>
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
