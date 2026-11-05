const express = require('express');

const path = require('path');
const bodyParser = require('body-parser');
const homeRoutes = require('./routes/home');
const userRoutes = require('./routes/users');

const app = express();

app.use(bodyParser.urlencoded());

app.use(express.static(path.join(__dirname, 'public')));

app.use(homeRoutes);
app.use(userRoutes);

app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
})

app.listen(3000);