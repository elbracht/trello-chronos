import timeToHours from '../helper/time';

const t = TrelloPowerUp.iframe();

window.estimate.addEventListener('submit', (event) => {
  event.preventDefault();

  try {
    // TODO: Settings for parsing estimate time (true or false)
    // TODO: Settings for working hours and days
    const estimateHours = timeToHours(window.estimateTime.value, 8, 5);
    return t.set('card', 'shared', 'estimateTime', estimateHours)
      .then(() => {
        t.closePopup();
      });
  } catch (e) {
    window.estimateTime.classList.add('is-error');
    window.estimateTimeError.innerHTML = 'The input has the wrong format. Try something like \'3d 6h\'.';
    window.estimateTimeError.classList.add('is-error');
    return false;
  }
});

t.render(() => t.get('card', 'shared', 'estimateTime')
  .then((estimate) => {
    window.estimateTime.value = estimate || '';
  })
  .then(() => {
    t.sizeTo('#estimate');
  }));
