const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3000;

app.get('/api', (req, res) => {

    console.log('hello');
    res.json({ message: 'Hello Sir , How are you ...?' });
});

app.post('/api/posts', verifyToken, (req, res) => {
    // Verify token
    jwt.verify(req.token, 'secretKey', (err, authData) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        } else {
            // Token is valid, process the request
            res.json({
                message: 'Post data received',
                authData: authData
            });
        }
    });
});

app.post('/api/login', (req, res) => {
    const user =
    {
        id: 1,
        username: 'kushal',
        email: 'kp88053@gmail.com'
    };

    jwt.sign({ user: user }, 'secretKey', (err, token) => {
        res.json({ token, });
    });

});

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(' ')[1];
        req.token = bearerToken;
        next();
    } else {
        return res.status(403).json({ message: 'Invalid or token not found' });
    }
}


app.listen(port, () => {
    console.log(`server start on ${port}`);
});
