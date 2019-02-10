import { hoursToTime } from '../helper/time';

TrelloPowerUp.initialize({
  'card-buttons': () => [{
    icon: './images/estimateTime.png',
    text: 'Estimate Time',
    callback: t => t.popup({
      title: 'Estimate Time',
      url: 'estimate.html',
    }),
  }, {
    icon: './images/logTime.png',
    text: 'Log Time',
    callback: t => t.popup({
      title: 'Log Time',
      url: 'log.html',
    }),
  }],
  'card-badges': t => t.getAll()
    .then((data) => {
      const { estimateTime } = data.card.shared;
      const estimateBadge = {
        text: estimateTime ? `Estimate: ${hoursToTime(estimateTime, 5, 8)}` : 'No Estimate',
        color: 'light-gray',
      };
      return [estimateBadge];
    }),
});
