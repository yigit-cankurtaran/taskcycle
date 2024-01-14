import { useState, useEffect } from "react";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import RenderTime from "./helpers/RenderTime";
import minutesToSeconds from "./helpers/minutesToSeconds";
import { View, Pressable, StyleSheet, Text } from "react-native";

// import beepSound from "./sounds/beep.mp3";
// import dingSound from "./sounds/ding.mp3";
// import useSound from "use-sound";
// gonna have to use expo-av for this

export default function TimerView({
  pomodoroDecrease,
}: {
  pomodoroDecrease: () => void;
}) {
  // test values change later
  const workMins = 0.4;
  const [workRunning, setWorkRunning] = useState(false);
  const [workSession, setWorkSession] = useState(0);
  const [shortRestSession, setShortRestSession] = useState(0);
  const [restRunning, setRestRunning] = useState(false);
  const restMins =
    shortRestSession > 0 && shortRestSession % 4 === 0 ? 0.3 : 0.2;
  const [workSessionCompleted, setWorkSessionCompleted] = useState(false);

  //   const [playBeep] = useSound(beepSound);
  //   const [playDing] = useSound(dingSound);
  // these are gonna use expo-av

  function startTimer() {
    if (workRunning || restRunning) return;
    setWorkRunning(true);
  }

  function stopTimer() {
    // might remove if i want it to be strict
    if (workRunning) setWorkRunning(false);
    if (restRunning) setRestRunning(false);
  }

  function handleWorkTimerComplete() {
    setWorkRunning(false);
    setRestRunning(true);
    pomodoroDecrease();
    setWorkSessionCompleted(true);
  }

  function handleRestTimerComplete() {
    setRestRunning(false);
    setWorkRunning(true);
  }

  useEffect(() => {
    if (workSessionCompleted) {
      setWorkSession((prevWorkSession) => prevWorkSession + 1);
      console.log("running is " + workRunning);
      console.log("rest running is " + restRunning);
      console.log("work session is " + workSession);
      setWorkSessionCompleted(false);
    } else if (restRunning && !workRunning) {
      setShortRestSession((prevRestSession) => prevRestSession + 1);
      console.log("running is " + workRunning);
      console.log("rest running is " + restRunning);
      console.log("short rest session is " + shortRestSession);
      console.log("finished work session is " + workSession);
    }
  }, [workSessionCompleted, restRunning]);

  return (
    <View style={styles.container}>
      {workRunning && (
        <CountdownCircleTimer
          isPlaying
          duration={minutesToSeconds(workMins)}
          colors={["#004777", "#005588", "#006699", "#0077AA", "#0088BB"]}
          colorsTime={[
            minutesToSeconds(workMins),
            minutesToSeconds(workMins) * (4 / 5),
            minutesToSeconds(workMins) * (3 / 5),
            minutesToSeconds(workMins) * (2 / 5),
            minutesToSeconds(workMins) / 5,
          ]}
          // weirdly pauses sometimes, look into it
          onComplete={handleWorkTimerComplete}
          size={240}
          strokeWidth={20}
        >
          {RenderTime}
        </CountdownCircleTimer>
      )}
      {restRunning && (
        <CountdownCircleTimer
          isPlaying
          duration={minutesToSeconds(restMins)}
          colors={["#F7B801", "#F8C613", "#F9D725", "#FADD37", "#FBE049"]}
          colorsTime={[
            minutesToSeconds(restMins),
            minutesToSeconds(restMins) * (4 / 5),
            minutesToSeconds(restMins) * (3 / 5),
            minutesToSeconds(restMins) * (2 / 5),
            minutesToSeconds(restMins) / 5,
          ]}
          onComplete={handleRestTimerComplete}
          size={240}
          strokeWidth={20}
        >
          {RenderTime}
        </CountdownCircleTimer>
      )}
      <Pressable
        onPress={workRunning || restRunning ? stopTimer : startTimer}
        style={styles.button}
      >
        <Text style={styles.buttonText}>
          {workRunning || restRunning ? "Stop" : "Start"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  listContainer: {
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    backgroundColor: "#0077AA",
    padding: 10,
    margin: 5,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});
