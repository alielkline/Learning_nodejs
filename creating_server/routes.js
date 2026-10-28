const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write('<h1>Hello From Home Page</h1>');
        res.write(
            '<body><form action="/create_user" method="POST"> <input type="text" name="user"><button type="submit">Submit</button></body>'
        );
        res.write('</html>');
        return res.end();
    }else if (url === '/create_user' && method === 'POST') {
        const body = [];
        req.on('data', chunk => {
            console.log(chunk);
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
            const user = parsedBody.split('=')[1];
            fs.appendFile('users.txt', user + '\n', err => {
                if (err) {
                    console.log(err);
                    res.statusCode = 500;
                    return res.end('Error saving user');
                }

                res.statusCode = 302;
                res.setHeader('Location', '/users');
                return res.end();
            });
        });
    } 
    else if (url === '/users' && method === 'GET') {
        fs.readFile('users.txt', 'utf8', (err, data) => {
            if (err) {
                console.log(err);
                return res.end('No users found');
            }

            const users = data.split('\n').filter(user => user.trim() !== '');
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write('<html>');
            res.write('<head><title>Users</title></head>');
            res.write('<h1>Hello From Users Page</h1>');
            res.write('<ul>');
            users.forEach(user => {
                res.write(`<li>${user}</li>`);
            });
            res.write('</ul>');
            res.write('</html>');
            return res.end();
        });
        
    }
};


module.exports = requestHandler;