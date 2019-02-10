import { timeToHours } from '../helper/time';

const t = TrelloPowerUp.iframe();

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

t.render(() => t.sizeTo('#log'));
