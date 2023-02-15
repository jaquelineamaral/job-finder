const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

router.get('/test', (req, res) => {
    res.send('Teste................');
});

// Add Job via POST
router.post('/add', (req, res) => {

    let {title, description, salary, company, email, new_job} = req.body;
    
    // Insert new job
    Job.create({
        title,
        description,
        salary,
        company,
        email,
        new_job
    })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err));
});

module.exports = router;