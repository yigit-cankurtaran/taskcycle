import formatTime from "./formatTime";
import { View, Text } from "react-native";
import { colors } from "../StylingStuff";

export default function RenderTime({
  remainingTime,
}: {
  remainingTime: number;
}) {
  if (remainingTime === 0) {
    return <Text style={{ color: colors.text }}>You're done!</Text>;
  }
  return (
    <View>
      <Text style={{ color: colors.text }}>Remaining</Text>
      <Text style={{ color: colors.text }}>{formatTime(remainingTime)}</Text>
      <Text style={{ color: colors.text }}>seconds</Text>
    </View>
  );
}
// rendertime is a render prop
// it takes the remainingTime as a prop
// it's built into the react-countdown-circle-timer component
// the component keeps track of the countdown state and passes it to the render prop every time it renders
