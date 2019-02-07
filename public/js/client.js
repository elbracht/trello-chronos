TrelloPowerUp.initialize({
  'card-buttons': () => [{
    icon: './images/estimateTime.png',
    text: 'Estimate Time',
    callback: t => t.popup({
      title: 'Estimate',
      url: 'estimate.html',
    }),
  }],
  'card-badges': t => t.get('card', 'shared', 'estimateTime')
    .then(estimate => [{
      text: estimate ? `Estimate: ${estimate}` : 'No Estimate',
      color: 'light-gray',
    }]),
});
