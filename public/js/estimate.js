const t = TrelloPowerUp.iframe();

window.estimate.addEventListener('submit', (event) => {
  event.preventDefault();

  // Check input format
  const regex = /^(?:^|\s*)(\d+[w|W])?(?:^|\s*)(\d+[d|D])?(?:^|\s*)(\d+[h|H])?(?:^|\s*)$/;
  const estimateValues = window.estimateTime.value.match(regex);

  // Get error message for wrong input
  if (estimateValues == null) {
    t.alert({
      message: 'The estimated time could not be saved because the input was in an invalid format.',
      duration: 6,
      display: 'error',
    });
    return;
  }

  // Unify estimate time
  const estimateTime = estimateValues.slice(1).filter(Boolean).join(' ').toLowerCase();

  return t.set('card', 'shared', 'estimateTime', estimateTime)
    .then(() => {
      t.closePopup();
    });
});

t.render(() => t.get('card', 'shared', 'estimateTime')
  .then((estimate) => {
    window.estimateTime.value = estimate || '';
  })
  .then(() => {
    t.sizeTo('#estimate').done();
  }));
