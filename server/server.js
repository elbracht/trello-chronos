const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.static('public'));

app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname, '../public', 'index.html'));
});

app.get('/estimate', (request, response) => {
  response.sendFile(path.join(__dirname, '../public', 'estimate.html'));
});

const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Your server is listening on http://localhost:${port}/`);
});

module.exports = server;
