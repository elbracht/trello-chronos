import { hoursToTime } from '../helper/time';
import localization from '../localization/localization';

function cardButtons(t) {
  const estimateButton = {
    text: t.localizeKey('estimate-title'),
    icon: './images/estimateTime.png',
    callback: t => t.popup({
      title: t.localizeKey('estimate-title'),
      url: 'estimate.html',
    }),
  };

  const logButton = {
    text: t.localizeKey('log-title'),
    icon: './images/logTime.png',
    callback: t => t.popup({
      title: t.localizeKey('log-title'),
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

    badges.push({
      text: data && data.card && data.card.shared && data.card.shared.estimateTime
        ? t.localizeKey('estimate-with-time', { time: hoursToTime(data.card.shared.estimateTime, 5, 8) })
        : t.localizeKey('estimate-not-available'),
    });

    badges.push({
      text: data && data.card && data.card.shared && data.card.shared.logTime
        ? t.localizeKey('log-with-time', { time: hoursToTime(data.card.shared.logTime, 5, 8) })
        : t.localizeKey('log-not-available'),
    });

    if (data
      && data.card
      && data.card.shared
      && data.card.shared.estimateTime
      && data.card.shared.logTime) {
      badges.push({
        text: t.localizeKey('remaining-with-time', { time: hoursToTime(data.card.shared.estimateTime - data.card.shared.logTime, 5, 8) }),
        // TODO: Settings for sections (green < 50 < yellow < 80 < red)
        color: getBadgeColor(data.card.shared.estimateTime, data.card.shared.logTime, 50, 80),
      });
    }

    return badges;
  });
}

function showSettings(t) {
  return t.popup({
    title: t.localizeKey('settings-title'),
    url: 'settings.html',
  });
}

TrelloPowerUp.initialize({
  'card-buttons': t => cardButtons(t),
  'card-badges': t => cardBadges(t),
  'show-settings': t => showSettings(t),
}, localization());
