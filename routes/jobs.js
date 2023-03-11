const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

// Detalhe da vaga
router.get('/view/:id', (req, res) => 
    
    Job.findOne({ where: {id: req.params.id} })
    .then(job => {
        res.render('layouts/view', {job});
    })
    .catch(err => console.log(err))
);

// Form da rota de envio
router.get('/add', (req, res) => {
    res.render('layouts/add');
});

// Add Job via POST
router.post('/add', (req, res) => {

    let {title, description, salary, company, email, new_job} = req.body;
    
    // Insere novo job
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