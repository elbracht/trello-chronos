import parseEstimate from '../helper/time';

const t = TrelloPowerUp.iframe();

window.estimate.addEventListener('submit', (event) => {
  event.preventDefault();

  const regex = /^(?:^|\s*)(\d+[w|W])?(?:^|\s*)(\d+[d|D])?(?:^|\s*)(\d+[h|H])?(?:^|\s*)$/;
  const estimateValues = window.estimateTime.value.match(regex);

  if (estimateValues == null) {
    window.estimateTime.classList.add('is-error');
    window.estimateTimeError.innerHTML = 'The input has the wrong format. Try something like \'3d 6h\'.';
    window.estimateTimeError.classList.add('is-error');
    return false;
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
    t.sizeTo('#estimate');
  }));
