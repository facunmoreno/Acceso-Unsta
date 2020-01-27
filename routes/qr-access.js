const express = require('express');
const router = express.Router();

router.get('/qr/alumnos', async (req, res) => {
    res.send('alumnos');
});

router.get('/qr/profesores', async (req, res) => {
    res.send('profesores');
});

module.exports = router;
