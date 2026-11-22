const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const { engine: hbsEngine } = require('express-handlebars');

const app = express();

app.engine('hbs',
    hbsEngine({ 
        extname: 'hbs',
        defaultLayout: 'main-layout', 
        layoutsDir: 'views/layouts/', 
        extname: 'hbs'
    }));
app.set('view engine', 'hbs');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).render('404', {docTitle: "404 Page"});
});

app.listen(3000);
