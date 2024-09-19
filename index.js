const express = require('express');

// express app
const app = express();

// register ejs view engine
app.set('view engine', 'ejs');

// listen for requests
app.listen(3000);

// static middleware
app.use(express.static('public'));

// main route
app.get('/', (req, res) => {
    res.render('index',{title:"To-Do"});
});

// redirect /todo, /main to / route
app.get(['/todo', '/main'], (req, res) => {
    res.redirect('/');
});

// show 404 page for any other route
app.use((req, res) => {
    res.status(404).render('404',{title:"404"});
})