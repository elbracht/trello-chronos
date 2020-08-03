import localization from '../localization/localization';

const t = TrelloPowerUp.iframe(localization());

window.log.addEventListener('submit', (event) => {
  event.preventDefault();
});

t.render(() => {
  t.sizeTo('#settings');
});
