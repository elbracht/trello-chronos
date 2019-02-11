import { hoursToTime } from '../helper/time';

function cardButtons() {
  const estimateButton = {
    text: 'Estimate Time',
    icon: './images/estimateTime.png',
    callback: t => t.popup({
      title: 'Estimate Time',
      url: 'estimate.html',
    }),
  };

  const logButton = {
    text: 'Log Time',
    icon: './images/logTime.png',
    callback: t => t.popup({
      title: 'Log Time',
      url: 'log.html',
    }),
  };

  return [estimateButton, logButton];
}

function getBadgeColor(estimateTime, logTime, limit1, limit2) {
  const percentageTime = (100 * logTime) / estimateTime;
  if (percentageTime <= limit1) return 'green';
  if (percentageTime > limit1 && percentageTime <= limit2) return 'yellow';
  if (percentageTime > limit2) return 'red';
  return '';
}

function cardBadges(t) {
  return t.getAll().then((data) => {
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
      badges.push({
        text: `Remaining: ${hoursToTime(estimateTime - logTime, 5, 8)}`,
        // TODO: Settings for sections (green < 50 < yellow < 80 < red)
        color: getBadgeColor(estimateTime, logTime, 50, 80),
      });
    }

    return badges;
  });
}

TrelloPowerUp.initialize({
  'card-buttons': () => cardButtons(),
  'card-badges': t => cardBadges(t),
});
