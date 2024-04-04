// here i want to create a settings screen for setting time for the pomodoro
// i later want to separate the timer and the tasks into two different screens
// timer will only display the current task and the time left

import { Button, Card, Text, TextInput } from "react-native-paper";
import { useAtom } from "jotai";
import {
  longBreakTimeAtom,
  pomodoroCountAtom,
  shortBreakTimeAtom,
  workTimeAtom,
} from "./atoms";
import { theme } from "./helpers/theme";

export default function SettingsScreen() {
  const [workTime, setWorkTime] = useAtom(workTimeAtom);
  const [shortBreakTime, setShortBreakTime] = useAtom(shortBreakTimeAtom);
  const [longBreakTime, setLongBreakTime] = useAtom(longBreakTimeAtom);
  const [pomodoroCount, setPomodoroCount] = useAtom(pomodoroCountAtom);

  function createChangeHandler(setter: (value: number) => void) {
    return (text: string) => {
      setter(Number(text));
    };
  }

  function onSubmit() {
    console.log("submit");
  }

  return (
    <Card
      style={{ alignItems: "center", justifyContent: "center" }}
      mode="contained"
    >
      <TextInput
        label="Work Time"
        value={String(workTime)}
        placeholder={String(workTime)}
        onChangeText={createChangeHandler(setWorkTime)}
      />
      <TextInput
        label="Short Break Time"
        value={String(shortBreakTime)}
        placeholder={String(shortBreakTime)}
        onChangeText={createChangeHandler(setShortBreakTime)}
      />
      <TextInput
        label="Long Break Time"
        value={String(longBreakTime)}
        placeholder={String(longBreakTime)}
        onChangeText={createChangeHandler(setLongBreakTime)}
      />
      <TextInput
        label="Sessions Before Long Break"
        // this gets wrapped, will look into it
        value={String(pomodoroCount)}
        placeholder={String(pomodoroCount)}
        onChangeText={createChangeHandler(setPomodoroCount)}
      />
      <Button onPress={onSubmit} mode="contained" style={{ width: 150 }}>
        Submit
      </Button>
    </Card>
  );
}
