const express = require('express');

// express app
const app = express();

// listen for requests
app.listen(3000);

// main route
app.get('/', (req, res) => {
    res.sendFile('./views/index.html', { root: __dirname });
});

// redirect /todo, /main to / route
app.get(['/todo', '/main'], (req, res) => {
    res.redirect('/');
});

// show 404 page for any other route
app.use((req, res) => {
    res.status(404).sendFile('./views/404.html', { root: __dirname });
})