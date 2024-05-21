import { useState, useEffect } from "react";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import RenderTime from "./helpers/RenderTime";
import minutesToSeconds from "./helpers/minutesToSeconds";
import { View } from "react-native";
import { useAtom } from "jotai";
import MyButton from "./helpers/MyButton";
import {
  workTimeAtom,
  shortBreakTimeAtom,
  longBreakTimeAtom,
  pomodoroCountAtom,
} from "./atoms";
import { theme } from "./helpers/theme";
import { Audio } from "expo-av";
import Toast from "react-native-toast-message";
// this gets called every time a screen is switched
// might lead to performance issues

export default function Timer({
  pomodoroDecrease,
}: {
  pomodoroDecrease: () => void;
}) {
  const workMins = useAtom(workTimeAtom)[0];
  const pomodoroCount = useAtom(pomodoroCountAtom)[0];
  const [shortBreakTime] = useAtom(shortBreakTimeAtom);
  const [longBreakTime] = useAtom(longBreakTimeAtom);
  // we have to use indexes for some reason, will test
  const [workRunning, setWorkRunning] = useState(false);
  const [workSession, setWorkSession] = useState(0);
  const [shortRestSession, setShortRestSession] = useState(0);
  const [restRunning, setRestRunning] = useState(false);
  const restMins =
    workSession > 0 && workSession % pomodoroCount === 0
      ? longBreakTime
      : shortBreakTime;
  // there might be an issue with how this works, check later
  //  it might be starting out with the long break time, which is not what i want
  const [workSessionCompleted, setWorkSessionCompleted] = useState(false);
  const beepSound = require("./helpers/sounds/beep.mp3");
  const dingSound = require("./helpers/sounds/ding.mp3");
  const soundObject = new Audio.Sound();

  async function playBeep() {
    try {
      await soundObject.unloadAsync();
      await soundObject.loadAsync(beepSound);
      await soundObject.playAsync();
      console.log("beep");
    } catch (error) {
      console.error("Failed to play sound", error);
    }
  }

  async function playDing() {
    try {
      await soundObject.unloadAsync();
      await soundObject.loadAsync(dingSound);
      await soundObject.playAsync();
      console.log("ding");
    } catch (error) {
      console.error("Failed to play sound", error);
    }
  }

  async function startTimer() {
    if (workRunning || restRunning) return;
    setWorkRunning(true);
    playBeep();
  }

  async function stopTimer() {
    if (workRunning) setWorkRunning(false);
    if (restRunning) setRestRunning(false);
    // set all sessions to 0
    setWorkSession(0);
    setShortRestSession(0);
    playDing();
  }

  function handleWorkTimerComplete() {
    setWorkRunning(false);
    setRestRunning(true);
    pomodoroDecrease();
    setWorkSessionCompleted(true);
    playDing();
  }

  function handleRestTimerComplete() {
    setRestRunning(false);
    setWorkRunning(true);
    playBeep();
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
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: theme.spacing.md,
        width: "100%",
      }}
    >
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
          onComplete={handleWorkTimerComplete}
          size={240}
          strokeWidth={20}
          trailColor="#151932"
        >
          {RenderTime}
        </CountdownCircleTimer>
      )}
      {restRunning && (
        <CountdownCircleTimer
          isPlaying
          duration={minutesToSeconds(restMins)}
          colors={["#F7B801", "#F8C613", "#F9D725", "#FADD37", "#FBE049"]}
          // TODO: look at these colors
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
      <MyButton
        onPress={() => {
          if (workMins > 0 && shortBreakTime > 0 && longBreakTime > 0) {
            workRunning || restRunning ? stopTimer() : startTimer();
          } else {
            Toast.show({
              type: "error",
              text1: "Please set correct time settings",
              position: "bottom",
              autoHide: true,
              visibilityTime: 3000,
            });
          }
          // more of a bandaid than a fix
          // TODO: look into this later
        }}
        style={{
          marginTop: workRunning || restRunning ? theme.spacing.md : 0,
          alignSelf: "center",
          width: "40%",
        }}
      >
        {workRunning || restRunning ? "Stop" : "Start"}
      </MyButton>
    </View>
  );
}
