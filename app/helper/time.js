function parseTime(time) {
  const regex = /^(?:^|\s*)(\d+[w|W])?(?:^|\s*)(\d+[d|D])?(?:^|\s*)(\d+[h|H])?(?:^|\s*)$/;
  const timeValues = time.match(regex);

  if (timeValues == null) throw new Error('The input has the wrong format. Try something like \'3d 6h\'.');

  return {
    week: timeValues[1] ? parseInt(timeValues[1].slice(0, -1), 10) : 0,
    day: timeValues[2] ? parseInt(timeValues[2].slice(0, -1), 10) : 0,
    hour: timeValues[3] ? parseInt(timeValues[3].slice(0, -1), 10) : 0,
  };
}

export default function timeToHours(time, workingDays, workingHours) {
  const timeValues = parseTime(time);
  const weekHours = timeValues.week * workingDays * workingHours;
  const dayHours = timeValues.day * workingHours;
  const hours = timeValues.hour;
  return weekHours + dayHours + hours;
}
