import { hoursToTime } from '../helper/time';

TrelloPowerUp.initialize({
  'card-buttons': () => [{
    text: 'Estimate Time',
    icon: './images/estimateTime.png',
    callback: t => t.popup({
      title: 'Estimate Time',
      url: 'estimate.html',
    }),
  }, {
    text: 'Log Time',
    icon: './images/logTime.png',
    callback: t => t.popup({
      title: 'Log Time',
      url: 'log.html',
    }),
  }],
  'card-badges': t => t.getAll()
    .then((data) => {
      const badges = [];

      const { estimateTime } = data.card.shared;
      badges.push({
        text: estimateTime ? `Estimate: ${hoursToTime(estimateTime, 5, 8)}` : 'No Estimate',
      });

      const { logTime } = data.card.shared;
      badges.push({
        text: logTime ? `Log: ${hoursToTime(logTime, 5, 8)}` : 'No Log',
      });

      if (estimateTime && logTime) {
        let remainingTimeColor;
        const percentageTime = (100 * logTime) / estimateTime;
        // TODO: Settings for sections (green < 50 < yellow < 80 < red)
        if (percentageTime <= 50) remainingTimeColor = 'green';
        else if (percentageTime > 50 && percentageTime <= 80) remainingTimeColor = 'yellow';
        else if (percentageTime > 80) remainingTimeColor = 'red';

        badges.push({
          text: `Remaining: ${hoursToTime(estimateTime - logTime, 5, 8)}`,
          color: remainingTimeColor,
        });
      }

      return badges;
    }),
});
