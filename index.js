const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.static('static'));
app.listen(port, () => console.log(`app listenening on port ${port}`));

MongoClient.connect('mongodb://jagoda:test123@ds263876.mlab.com:63876/heroku_244jlx1p', function(err, client) {
    const db = client.db('heroku_244jlx1p');
    if (!err) {
        app.get('/user', function(req, res) {
            db.collection('user').find().toArray(function(err, users) {
                res.json(users);
            })
        })

        app.post('/login', function(req, res) {
            res.statusCode(200).send();
        })

    } else {
        console.err('cannot establish connection to dbs');
    }
});