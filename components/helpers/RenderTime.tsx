import formatTime from "./formatTime";

export default function RenderTime({
  remainingTime,
}: {
  remainingTime: number;
}) {
  if (remainingTime === 0) {
    return <div className="message">You're done!</div>;
  }
  return (
    <div className="timer">
      <div className="text">Remaining</div>
      <div className="value">{formatTime(remainingTime)}</div>
      <div className="text">seconds</div>
    </div>
  );
}
// rendertime is a render prop
// it takes the remainingTime as a prop
// it's built into the react-countdown-circle-timer component
// the component keeps track of the countdown state and passes it to the render prop every time it renders
