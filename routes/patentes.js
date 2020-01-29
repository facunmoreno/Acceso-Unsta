const express = require('express');
const router = express.Router();
const { Patente, validatePatente } = require('../models/Patente');


router.post('/', async (req, res) => {
    let { error } = validatePatente(req.body);
    if(error) return res.status(400).send(error.details[0].message);


    let person = {
        name: req.body.name,
        code: req.body.code,
        type: req.body.type
    };
    if(! await Patente.validarCantidad(person)) return res.status(400).send('El usuario no puede ingresar mas patentes.');

    if(!Patente.validarFormato(req.body.registro)) return res.status(400).send('Formato de patente inválido');

    let patente = await Patente.findOne({ registro: req.body.registro });
    if(patente) return res.status(400).send('Ya existe una patente cargada con el registro: ' + req.body.registro);

    patente = new Patente({
        registro: req.body.registro,
        person: person
    });
    await patente.save();
    
    res.send(patente);
});

module.exports = router;