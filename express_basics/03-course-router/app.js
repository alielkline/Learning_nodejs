const express = require('express');
const path = require('path');

const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');


const app = express();

app.use(bodyParser.urlencoded());

app.use('/admin', adminRoutes);

app.use(shopRoutes);

// an error page for unhandled requests
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', 'error.html'));
});

app.listen(3000);