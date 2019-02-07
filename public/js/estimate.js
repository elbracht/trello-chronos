const t = TrelloPowerUp.iframe();

window.estimate.addEventListener('submit', (event) => {
  event.preventDefault();
  return t.set('card', 'shared', 'estimateTime', window.estimateTime.value)
    .then(() => {
      t.closePopup();
    });
});

t.render(() => t.get('card', 'shared', 'estimateTime')
  .then((estimate) => {
    window.estimateTime.value = estimate;
  })
  .then(() => {
    t.sizeTo('#estimate').done();
  }));
