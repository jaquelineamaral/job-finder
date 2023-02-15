const express = require('express');
const app = express();
const db = require('./db/connection');
const bodyParcer = require('body-parser');

const PORT = 3000;

app.use(bodyParcer.urlencoded({extended: false}));

// Data base connection
db.authenticate()


// Routes
app.get('/', (req, res) => {
    res.send('Tela Principal');
});


// Jobs Routes 
app.use('/jobs', require('./routes/jobs'));