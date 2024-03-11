import formatTime from "./formatTime";
import { View } from "react-native";
import { Text } from "react-native-paper";

export default function RenderTime({
  remainingTime,
}: {
  remainingTime: number;
}) {
  if (remainingTime === 0) {
    return <Text>You're done!</Text>;
  }
  return (
    <View>
      <Text>Remaining</Text>
      <Text>{formatTime(remainingTime)}</Text>
      <Text>seconds</Text>
    </View>
  );
}
// rendertime is a render prop
// it takes the remainingTime as a prop
// it's built into the react-countdown-circle-timer component
// the component keeps track of the countdown state and passes it to the render prop every time it renders
