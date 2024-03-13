import { useState, useEffect } from "react";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import RenderTime from "./helpers/RenderTime";
import minutesToSeconds from "./helpers/minutesToSeconds";
import { Button, Card } from "react-native-paper";
import { theme } from "./helpers/theme";
import { useAtom } from "jotai";
import {
  workTimeAtom,
  shortBreakTimeAtom,
  longBreakTimeAtom,
  pomodoroCountAtom,
} from "./atoms";

// import beepSound from "./sounds/beep.mp3";
// import dingSound from "./sounds/ding.mp3";
// import useSound from "use-sound";
// gonna have to use expo-av for this

export default function Timer({
  pomodoroDecrease,
}: {
  pomodoroDecrease: () => void;
}) {
  // test values
  // TODO:  implement changing these on SettingsScreen
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
    shortRestSession > 0 && shortRestSession % pomodoroCount === 0
      ? shortBreakTime
      : longBreakTime;
  // there might be an issue with how this works, check later
  //  it might be starting out with the long break time, which is not what i want
  // if shortRestSession is greater than 0 and the remainder of shortRestSession divided by pomodoroCount is 0
  // then restMins is shortBreakTimeAtom, else it's longBreakTimeAtom
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
    // set all sessions to 0
    setWorkSession(0);
    setShortRestSession(0);
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
    <Card
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        margin: 20,
        // the past 2 might be removed, check later
      }}
      mode="contained"
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
      <Button
        mode="contained"
        onPress={workRunning || restRunning ? stopTimer : startTimer}
        style={{
          width: 100,
          alignSelf: "center",
          marginTop: workRunning || restRunning ? 10 : 0,
        }}
        labelStyle={{ color: theme.colors.text }}
        buttonColor={theme.colors.buttonColor}
      >
        {workRunning || restRunning ? "Stop" : "Start"}
      </Button>
    </Card>
  );
}
