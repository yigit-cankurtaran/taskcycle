import { Card, TextInput } from "react-native-paper";
import MyButton from "./helpers/MyButton";
import { useAtom } from "jotai";
import {
  longBreakTimeAtom,
  pomodoroCountAtom,
  shortBreakTimeAtom,
  workTimeAtom,
} from "./atoms";
import { theme } from "./helpers/theme";
import { View, StyleSheet } from "react-native";

const DEFAULT_WORK_TIME = 25;
const DEFAULT_SHORT_BREAK_TIME = 5;
const DEFAULT_LONG_BREAK_TIME = 15;
const DEFAULT_POMODORO_COUNT = 4;

export default function SettingsScreen() {
  const [workTime, setWorkTime] = useAtom(workTimeAtom);
  const [shortBreakTime, setShortBreakTime] = useAtom(shortBreakTimeAtom);
  const [longBreakTime, setLongBreakTime] = useAtom(longBreakTimeAtom);
  const [pomodoroCount, setPomodoroCount] = useAtom(pomodoroCountAtom);

  function createChangeHandler(setter: (value: number) => void) {
    return (text: string) => {
      const number = Number(text);
      if (!isNaN(number)) setter(number);
      // TODO: this is kind of problematic for the user, implement this in a better way
      // setter updates the atom, which updates the state, which updates the component
      // when the text input changes it calls this function, this changes the text to a number if it's a number
    };
  }

  function onSubmit() {
    console.log("values changed");
  }

  function defaultValues() {
    setWorkTime(DEFAULT_WORK_TIME);
    setShortBreakTime(DEFAULT_SHORT_BREAK_TIME);
    setLongBreakTime(DEFAULT_LONG_BREAK_TIME);
    setPomodoroCount(DEFAULT_POMODORO_COUNT);
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={styles.container}>
        <TextInput
          label="Work Time"
          value={String(workTime)}
          placeholder={String(workTime)}
          onChangeText={createChangeHandler(setWorkTime)}
          textAlign="center"
          activeOutlineColor={theme.colors.primary}
          mode="outlined"
          style={styles.input}
        />
        <TextInput
          label="Short Break Time"
          value={String(shortBreakTime)}
          placeholder={String(shortBreakTime)}
          onChangeText={createChangeHandler(setShortBreakTime)}
          textAlign="center"
          activeOutlineColor={theme.colors.primary}
          mode="outlined"
          style={styles.input}
        />
        <TextInput
          label="Long Break Time"
          value={String(longBreakTime)}
          placeholder={String(longBreakTime)}
          onChangeText={createChangeHandler(setLongBreakTime)}
          textAlign="center"
          activeOutlineColor={theme.colors.primary}
          mode="outlined"
          style={styles.input}
        />
        <TextInput
          label="Sessions Before Long Break"
          value={String(pomodoroCount)}
          placeholder={String(pomodoroCount)}
          onChangeText={createChangeHandler(setPomodoroCount)}
          activeOutlineColor={theme.colors.primary}
          mode="outlined"
          style={styles.input}
        />
        <MyButton onPress={onSubmit} style={styles.button}>
          Submit
        </MyButton>
        <MyButton onPress={defaultValues} style={styles.button}>
          Return to default
        </MyButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    margin: theme.spacing.md,
    width: "70%",
  },
  button: {
    margin: theme.spacing.sm,
    alignSelf: "center",
    width: "40%",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    padding: theme.spacing.md,
  },
});
