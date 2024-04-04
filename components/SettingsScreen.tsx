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
      // setter updates the atom, which updates the state, which updates the component
      // when the text input changes it calls this function, this changes the text to a number
    };
  }

  function onSubmit() {
    console.log("values changed");
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
        textAlign="center"
        defaultValue="25"
        activeUnderlineColor={theme.colors.border}
        // if change to outlined change this to OutlineColor
      />
      <TextInput
        label="Short Break Time"
        value={String(shortBreakTime)}
        placeholder={String(shortBreakTime)}
        onChangeText={createChangeHandler(setShortBreakTime)}
        textAlign="center"
        defaultValue="5"
        activeUnderlineColor={theme.colors.border}
      />
      <TextInput
        label="Long Break Time"
        value={String(longBreakTime)}
        placeholder={String(longBreakTime)}
        onChangeText={createChangeHandler(setLongBreakTime)}
        textAlign="center"
        defaultValue="15"
        activeUnderlineColor={theme.colors.border}
      />
      <TextInput
        label="Sessions Before Long Break"
        // this label gets wrapped, will look into it
        value={String(pomodoroCount)}
        placeholder={String(pomodoroCount)}
        onChangeText={createChangeHandler(setPomodoroCount)}
        defaultValue="4"
        activeUnderlineColor={theme.colors.border}
      />
      <Button onPress={onSubmit} mode="contained" style={{ width: 150 }}>
        Submit
      </Button>
    </Card>
  );
}
