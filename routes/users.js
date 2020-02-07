const express = require('express');
const router = express.Router();
const { User, validateUser } = require('../models/User');
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
    let { error } = validateUser(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ user: req.body.user });
    if(user) return res.status(400).send(`Ya existe un usuario con el username: ${req.body.user}`);

    let hash = await bcrypt.hash(req.body.password, 10);

    await User.create({
        user: req.body.user,
        password: hash
    });

    res.send('Usuario creado correctamente.');
});

router.get('/login', async (req, res) => {
    let { error } = validateUser(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ user: req.body.user });
    if(!user) return res.status(400).send('User no encontrado.');

    let result = await bcrypt.compare(req.body.password, user.password);
    if(!result) return res.status(400).send('Contraseña incorrecta.');

    let token = await user.generateToken();
    return res.send(token);
});

module.exports = router;
