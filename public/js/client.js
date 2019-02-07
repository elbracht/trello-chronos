TrelloPowerUp.initialize({
  'card-buttons': () => [{
    icon: './images/estimateTime.png',
    text: 'Estimate Time',
    callback: t => t.popup({
      title: 'Estimation',
      url: 'estimate.html',
    }),
  }],
  'card-badges': t => t.get('card', 'shared', 'estimate')
    .then(estimate => [{
      text: `Estimated: ${estimate}`,
      color: 'light-gray',
    }]),
});
