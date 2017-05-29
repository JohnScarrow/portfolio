'use strict';

const pg = require('pg');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const app = express();
// const conString = 'postgres://USERNAME:PASSWORD@HOST:PORT';
const conString = 'postgres://postgres:1234@localhost:5432/portfolio'; // TODO: Don't forget to set your own conString
const client = new pg.Client(conString);
client.connect();
client.on('error', err => console.error(err));

//app.use(compression());
app.use(bodyParser.text({type: '*/*'}));
app.use(express.static('./public'));

function proxyGithub(request, response) {
  console.log(`Routing GitHub request for ${request.params[0]}`);
  (requestProxy({
    url: `https://api.github.com/${request.params[0]}`,
    headers: { Authorization: `token ${process.env.GITHUB_TOKEN}` }
  }))(request, response);
}

app.post('/email', function(req, res) {
  console.log(req.body);
  res.send('');
});

app.get('/github/*', proxyGithub);

app.get('*', (request, response) => response.sendFile('index.html', {root: './public'}));

app.use((req, res) => res.status(404).send('404 ERROR'));

app.listen(PORT, () => console.log('Server live on localhost:' + PORT));