function formatTime(time: number) {
  //   format the time to be displayed
  // make sure time is an integer
  time = Math.ceil(time);
  //  get the minutes
  const minutes = Math.floor(time / 60);
  //   get the seconds
  const seconds = time % 60;
  // if seconds is less than 10, add a 0 in front of it
  if (seconds < 10) {
    return `${minutes}:0${seconds}`;
  }
  // if minutes is less than 10, add a 0 in front of it
  if (minutes < 10) {
    return `0${minutes}:${seconds}`;
  }
  //   return the time in the format of mm:ss
  return `${minutes}:${seconds}`;
}

export default formatTime;
