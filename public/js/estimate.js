const t = TrelloPowerUp.iframe();

function parseEstimate(estimateValues, workingHours, workingDays) {
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

window.estimate.addEventListener('submit', (event) => {
  event.preventDefault();

  const regex = /^(?:^|\s*)(\d+[w|W])?(?:^|\s*)(\d+[d|D])?(?:^|\s*)(\d+[h|H])?(?:^|\s*)$/;
  const estimateValues = window.estimateTime.value.match(regex);

  if (estimateValues == null) {
    window.estimateTime.classList.add('is-error');
    window.estimateTimeError.innerHTML = 'The input has the wrong format. Try something like \'3d 6h\'.';
    window.estimateTimeError.classList.add('is-error');
    return;
  }

  // TODO: Settings for parsing estimate time (true or false)
  // TODO: Settings for working hours and days
  const estimateTime = parseEstimate(estimateValues, 8, 5);

  return t.set('card', 'shared', 'estimateTime', estimateTime)
    .then(() => {
      t.closePopup();
    });
});

t.render(() => t.get('card', 'shared', 'estimateTime')
  .then((estimate) => {
    window.estimateTime.value = estimate || '';
  })
  .then(() => {
    t.sizeTo(168).done();
  }));
