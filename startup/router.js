const express = require('express');
const cors = require('cors');

const irregular_verbs = require('../routes/irregularVerbs');

module.exports = function(app){
    //middlewares
    app.use(express.urlencoded({extended: true}));
    app.use(express.json());
    app.use(cors())
    app.use(express.static('public'));

    //routes
    // app.use('/', home);
    app.use('/api/irregular_verbs', irregular_verbs);
}