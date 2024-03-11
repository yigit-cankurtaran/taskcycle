function formatTime(time: number) {
  time = Math.ceil(time);
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  if (seconds < 10) {
    return `${minutes}:0${seconds}`;
  }
  if (minutes < 10) {
    return `0${minutes}:${seconds}`;
  }
  return `${minutes}:${seconds}`;
}

export default formatTime;
