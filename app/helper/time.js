export default function parseEstimate(estimateValues, workingHours, workingDays) {
  let hour = estimateValues[3] ? parseInt(estimateValues[3].slice(0, -1), 10) : 0;
  let day = estimateValues[2] ? parseInt(estimateValues[2].slice(0, -1), 10) : 0;
  let week = estimateValues[1] ? parseInt(estimateValues[1].slice(0, -1), 10) : 0;

  if (hour >= workingHours) {
    day += Math.floor(hour / workingHours);
    hour %= workingHours;
  }

  if (day >= workingDays) {
    week += Math.floor(day / workingDays);
    day %= workingDays;
  }

  hour = hour > 0 ? `${hour}h` : 0;
  day = day > 0 ? `${day}d` : 0;
  week = week > 0 ? `${week}w` : 0;

  return [week, day, hour].filter(Boolean).join(' ');
}
