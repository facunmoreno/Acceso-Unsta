const express = require('express');
const router = express.Router();
const { VehicleAccess, validateAccess } = require('../models/VehicleAccess');
const { Patente } = require('../models/Patente');

router.post('/validate', async (req, res) => {
    let { error } = validateAccess(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let patente = await Patente.findOne({ registro: req.body.registro }).select('-__v');
    if(!patente) {
        let access = new VehicleAccess({
            registro: req.body.registro,
            movement: req.body.movement,
            status: 'DENEGADO'
        });

        await access.save();
        return res.send('Acceso denegado.');
    }

    let access = new VehicleAccess({
        patente: patente,
        movement: req.body.movement,
        status: 'ACEPTADO'
    })

    await access.save();
    res.send('Acceso concedido.');
});

module.exports = router;