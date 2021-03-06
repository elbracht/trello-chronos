import InputFormatError from './error';

function parseTime(time) {
  const regex = /^(?:^|\s*)(-)?(?:^|\s*)(?:(\d+(?:[.|,]5)?)[w|W])?(?:^|\s*)(?:(\d+(?:[.|,]5)?)[d|D])?(?:^|\s*)(?:(\d+(?:[.|,]5)?)[h|H])?(?:^|\s*)$/;
  const timeValues = time.match(regex);

  if (timeValues == null) throw new InputFormatError();

  return {
    isNegative: timeValues[1] === '-',
    week: timeValues[2] ? parseFloat(timeValues[2]) : 0,
    day: timeValues[3] ? parseFloat(timeValues[3]) : 0,
    hour: timeValues[4] ? parseFloat(timeValues[4].replace(',', '.')) : 0,
  };
}

export function timeToHours(time, workingDays = 5, workingHours = 8) {
  if (time == null) return null;

  const {
    isNegative, week, day, hour,
  } = parseTime(time);

  let hours = 0;
  hours += week * workingDays * workingHours;
  hours += day * workingHours;
  hours += hour;

  return isNegative ? -Math.abs(hours) : Math.abs(hours);
}

export function hoursToTime(hours, workingDays = 5, workingHours = 8) {
  if (hours == null) return null;

  const isNegative = hours < 0;
  let hour = Math.abs(hours);
  let day = 0;
  let week = 0;

  if (hour >= workingHours) {
    day += Math.floor(hour / workingHours);
    hour %= workingHours;
  }

  if (day >= workingDays) {
    week += Math.floor(day / workingDays);
    day %= workingDays;
  }

  const timeValues = [];
  if (week > 0) timeValues.push(`${week}w`);
  if (day > 0) timeValues.push(`${day}d`);
  if (hour > 0) timeValues.push(`${hour}h`);

  const timeValue = isNegative ? `-${timeValues.join(' ')}` : timeValues.join(' ');

  return timeValue || '0h';
}
