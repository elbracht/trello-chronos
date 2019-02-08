const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// your manifest must have appropriate CORS headers, you could also use '*'
app.use(cors({ origin: '*' }));

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('app'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('*', (request, response) => {
  response.sendFile(path.join(__dirname, '../app', 'index.html'));
});

// listen for requests
const port = process.env.PORT || 4000;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Your server is listening on http://localhost:${port}/`);
});
