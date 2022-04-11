const express = require('express');
const router = express.Router();
const usuarioServices = require('../services/usuarioService');
require("dotenv-safe").config();
const jwt = require('jsonwebtoken');
const authRouter = require('./authRouter');
const auth = require('../middlewares/middleware')

router.post('/', async function (req, res, next) {
    try {
        res.json(await usuarioServices.create(req.body));
    } catch (error) {
        console.log(error);
        next(error);
    }
});

router.get('/', auth, async function (req, res, next) {
    try {
        res.json(await usuarioServices.getUsuario(req.query.page));
    } catch (error) {
        console.log(error);
        next(error);
    }
});

router.delete('/:id', async function (req, res, next) {
    try {
        res.json(await usuarioServices.remove(req.params.id));
    } catch (error) {
        console.log('deu erro no DELETE' + error);
        next(error);
    }
})

router.put('/:id', async function (req, res, next) {
    try {
        res.json(await usuarioServices.update(req.params.id, req.body));
    } catch (error) {
        console.log('deu erro no UPDATE' + error);
        next(error);
    }
})


module.exports = router;