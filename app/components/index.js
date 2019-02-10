import { hoursToTime } from '../helper/time';

TrelloPowerUp.initialize({
  'card-buttons': () => [{
    icon: './images/estimateTime.png',
    text: 'Estimate Time',
    callback: t => t.popup({
      title: 'Estimate Time',
      url: 'estimate.html',
    }),
  }],
  'card-badges': t => t.get('card', 'shared', 'estimateTime')
    .then(estimate => [{
      // TODO: Settings for working hours and days
      text: estimate ? `Estimate: ${hoursToTime(estimate, 5, 8)}` : 'No Estimate',
      color: 'light-gray',
    }]),
});
