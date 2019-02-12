import { timeToHours, hoursToTime } from '../helper/time';
import localization from '../localization/localization';

const t = TrelloPowerUp.iframe(localization());

window.estimate.addEventListener('submit', (event) => {
  event.preventDefault();

  try {
    // TODO: Settings for working hours and days
    const estimateHours = timeToHours(window.estimateTime.value, 5, 8);
    return t.set('card', 'shared', 'estimateTime', estimateHours)
      .then(() => {
        t.closePopup();
      });
  } catch (err) {
    window.estimateTime.classList.add('is-error');
    window.estimateTimeError.classList.add('is-error');
    window.estimateTimeError.innerHTML = t.localizeKey('error-input-format');
    return false;
  }
});

t.render(() => t.get('card', 'shared', 'estimateTime')
  .then((estimate) => {
    // TODO: Settings for working hours and days
    const estimateTime = hoursToTime(estimate, 5, 8) || '';
    window.estimateTime.value = estimateTime;
  })
  .then(() => {
    const form = document.getElementById('estimate');
    t.localizeNode(form);

    const label = document.getElementById('estimateTime');
    label.placeholder = t.localizeKey('estimate-label-placeholder');

    t.sizeTo('#estimate');
  }));
