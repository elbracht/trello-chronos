import { timeToHours } from '../helper/time';
import localization from '../localization/localization';

const t = TrelloPowerUp.iframe(localization());

window.log.addEventListener('submit', (event) => {
  event.preventDefault();

  try {
    // TODO: Settings for working hours and days
    const logHours = timeToHours(window.logTime.value, 5, 8);

    return t.get('card', 'shared', 'logTime', 0)
      .then(logTime => t.set('card', 'shared', 'logTime', logTime + logHours))
      .then(() => t.closePopup());
  } catch (err) {
    window.logTime.classList.add('is-error');
    window.logTimeError.classList.add('is-error');
    window.logTimeError.innerHTML = err.message;
    return false;
  }
});

t.render(() => {
  const form = document.getElementById('log');
  t.localizeNode(form);

  const label = document.getElementById('logTime');
  label.placeholder = t.localizeKey('log-label-placeholder');

  t.sizeTo('#log');
});
