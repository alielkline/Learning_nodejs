const path = require('path');

const express = require('express')
const bodyParser = require('body-parser');

const homeRoutes = require('./routes/home');
const userRoutes = require('./routes/users');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(homeRoutes.routes);
app.use(userRoutes.routes); 

app.use((req, res, next) => {
    res.status(404).render('404', {pageTitle: "404 Page", path: '/404'});
}); 

app.listen(3000);

