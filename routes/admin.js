const express = require('express');
const router = express.Router();
const { QrAccess } = require('../models/QrAccess');

router.get('/qr-accesses', async (req, res) => {
    let accesses = await QrAccess.find({ status: 'ACEPTADO' }).sort({ accessDate: -1 }).select({
        person: 1,
        movement: 1,
        status: 1
    });
    res.send(accesses);
});

router.get('/qr-accesses/entrada', async (req, res) => {
    let accesses = await QrAccess.find({ status: 'ACEPTADO', movement: 'Entrada' }).sort({ accessDate: -1 }).select({
        person: 1,
        movement: 1,
        status: 1
    });
    res.send(accesses);
});

router.get('/qr-accesses/salida', async (req, res) => {
    let accesses = await QrAccess.find({ status: 'ACEPTADO', movement: 'Salida' }).sort({ accessDate: -1 }).select({
        person: 1,
        movement: 1,
        status: 1
    });
    res.send(accesses);
});


module.exports = router;