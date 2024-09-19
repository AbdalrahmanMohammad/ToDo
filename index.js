const express = require('express');
const bodyParser = require('body-parser');
const todoRoutes = require('./routes/todosRoutes');


// express app
const app = express();

// register ejs view engine
app.set('view engine', 'ejs');

// listen for requests
app.listen(3000);

// middlewares & staic files
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




// main route
app.get('/', (req, res) => {
    res.render('index', { title: "To-Do" });
});

// redirect /main to / route
app.get('main', (req, res) => {
    res.redirect('/');
});

app.use('/todos',todoRoutes);


// show 404 page for any other route
app.use((req, res) => {
    res.status(404).render('404', { title: "404" });
})
