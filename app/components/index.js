import { hoursToTime } from '../helper/time';

TrelloPowerUp.initialize({
  'card-buttons': t => [{
    text: t.localizeKey('estimte-time'),
    icon: './images/estimateTime.png',
    callback: () => t.popup({
      title: t.localizeKey('estimte-time'),
      url: 'estimate.html',
    }),
  }, {
    text: t.localizeKey('log-time'),
    icon: './images/logTime.png',
    callback: () => t.popup({
      title: t.localizeKey('log-time'),
      url: 'log.html',
    }),
  }],
  'card-badges': t => t.getAll()
    .then((data) => {
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
        let remainingTimeColor;
        const percentageTime = (100 * logTime) / estimateTime;
        // TODO: Settings for sections (green < 50 < yellow < 80 < red)
        if (percentageTime <= 50) remainingTimeColor = 'green';
        else if (percentageTime > 50 && percentageTime <= 80) remainingTimeColor = 'yellow';
        else if (percentageTime > 80) remainingTimeColor = 'red';

        badges.push({
          text: `${t.localizeKey('remaining')}: ${hoursToTime(estimateTime - logTime, 5, 8)}`,
          color: remainingTimeColor,
        });
      }

      return badges;
    }),
}, {
  localization: {
    defaultLocale: 'en',
    supportedLocales: ['en', 'de'],
    resourceUrl: './strings/{locale}.json',
  },
});
