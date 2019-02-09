TrelloPowerUp.initialize({
  'card-buttons': () => [{
    icon: 'https://cdn.glitch.com/1b42d7fe-bda8-4af8-a6c8-eff0cea9e08a%2Frocket-ship.png?1494946700421',
    text: 'Estimate Size',
    callback: t => t.popup({
      title: 'Estimate Size',
      url: 'estimate.html',
    }),
  }],
  'card-badges': t => t.get('card', 'shared', 'estimate')
    .then(estimate => [{
      icon: 'https://cdn.glitch.com/c69415fd-f70e-4e03-b43b-98b8960cd616%2Frocket-ship-grey.png?1496162964717',
      text: estimate,
    }, {
      icon: 'https://cdn.glitch.com/c69415fd-f70e-4e03-b43b-98b8960cd616%2Frocket-ship-grey.png?1496162964717',
      text: estimate,
    }]),
});
