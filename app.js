const express = require('express');
const app = express();
const db = require('./db/connection');

const PORT = 3000;

// Data base connection
db.authenticate()


