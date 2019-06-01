const express = require('express');

const app = express();
const port = 5000;

app.use(express.static('static'));
app.listen(port, () => console.log(`app listenening on port ${port}`))