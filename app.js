const express = require('express');
// Cria servidor
const app = express();
const exphbs = require('express-handlebars');
const path = require('path');
const db = require('./db/connection');
const bodyParcer = require('body-parser');

const PORT = 3000;

app.listen(PORT);

app.use(bodyParcer.urlencoded({extended: false}));

// Handle bars
// Diretorio das views, onde ficara os tamplates
app.set('views', path.join(__dirname, 'views'));
// Aquivo principal de layout
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
// View engine, framework/biblioteca que sera utilizada para renderizar as views
app.set('view engine', 'handlebars');

// Data base connection
db.authenticate()

// Routes
app.get('/', (req, res) => {
    res.send('Tela Principal');
});

// Jobs Routes 
app.use('/jobs', require('./routes/jobs'));