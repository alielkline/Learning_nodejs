const express = require('express');

const app = express();

// 2 middleware funnel

// app.use((req, res, next) => {
//     console.log('Hello From Middleware 1');
//     next();
// });

// app.use((req, res, next) => {
//     console.log('Hello From Middleware 2');
//     res.send("<p>Assignment Solved</p>");
// })

// routing
app.use('/users', (req, res, next) => {
    res.send('<h1>Hello from Users</h1>');
})

app.use('/', (req, res, next) => {
    res.send('<h1>Hello from Home Page</h1>');
})

app.listen(3000);