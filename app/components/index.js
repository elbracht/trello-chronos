import { hoursToTime } from '../helper/time';

function cardButtons(t) {
  const estimateButton = {
    text: t.localizeKey('estimte-time'),
    icon: './images/estimateTime.png',
    callback: () => t.popup({
      title: t.localizeKey('estimte-time'),
      url: 'estimate.html',
    }),
  };

  const logButton = {
    text: t.localizeKey('log-time'),
    icon: './images/logTime.png',
    callback: () => t.popup({
      title: t.localizeKey('log-time'),
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
      text: estimateTime ? `${t.localizeKey('estimate')}: ${hoursToTime(estimateTime, 5, 8)}` : t.localizeKey('no-estimte'),
    });

    const { logTime } = data.card.shared;
    badges.push({
      text: logTime ? `${t.localizeKey('log')}: ${hoursToTime(logTime, 5, 8)}` : t.localizeKey('no-log'),
    });

    if (estimateTime && logTime) {
      badges.push({
        text: `${t.localizeKey('remaining')}: ${hoursToTime(estimateTime - logTime, 5, 8)}`,
        // TODO: Settings for sections (green < 50 < yellow < 80 < red)
        color: getBadgeColor(estimateTime, logTime, 50, 80),
      });
    }

    return badges;
  });
}

TrelloPowerUp.initialize({
  'card-buttons': t => cardButtons(t),
  'card-badges': t => cardBadges(t),
}, {
  localization: {
    defaultLocale: 'en',
    supportedLocales: ['en', 'de'],
    resourceUrl: './strings/{locale}.json',
  },
});
