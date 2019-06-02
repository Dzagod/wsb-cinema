const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.static('static'));
app.use(bodyParser.json());
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
            const { email, password } = req.body;
            
            db.collection('user').findOne({ email }, function(err, user) {
                if (user) {
                    if (user.password === password) {
                        res.status(200).json({ message: 'Zalogowano.' });
                    } else {
                        res.status(400).json({ message: 'Błędne hasło.' });
                    }
                } else {
                    db.collection('user').insert({ email, password}, function(err, result) {
                        console.log(`stworzono uzytkownika ${email} ${result}`);

                        res.status(201).json({ message: 'Stworzono uzytkownika.' })
                    })


                }
            });
        })

    } else {
        console.err('cannot establish connection to dbs');
    }
});