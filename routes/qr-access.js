const express = require('express');
const { validatePerson } = require('../models/Person');
const { QrAccess, validateQR } = require('../models/QrAccess');
const mongoose = require('mongoose');
const router = express.Router();

router.post('/alumnos', async (req, res) => {
    let { error } = validatePerson(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let qr_access = new QrAccess({
        person: {
            name: req.body.name,
            code: req.body.code,
            type: 'Alumno'
        }
    });

    await qr_access.save();
    qr_access.setExpirationTime();
    let qr = await qr_access.generateQR();

    res.send(qr);    
});

router.post('/profesores', async (req, res) => {
    let { error } = validatePerson(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let qr_access = new QrAccess({
        person: {
            name: req.body.name,
            code: req.body.code,
            type: 'Profesor'
        }
    });

    await qr_access.save();
    qr_access.setExpirationTime();
    let qr = await qr_access.generateQR();

    res.send(qr); 
});

router.post('/validate', async (req, res) => {
    let { error } = validateQR(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    if(! await QrAccess.validateQR(req)) return res.status(400).send('Acceso denegado: QR no valido.');

    res.send('Acceso concedido.');
});

router

module.exports = router;
