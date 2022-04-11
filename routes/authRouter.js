const express = require('express');
const router = express.Router();
const authServices = require('../services/authService');
const usuarioServices = require('../services/usuarioService');
require("dotenv-safe").config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validator = require('validator');


router.post('/register', async function (req, res, next) {
    try {
        const parseJSON = JSON.parse(req.body.cadastro)
        const exist = await authServices.userExists(parseJSON.email);
        if (exist == null) {
            const salt = bcrypt.genSaltSync();
            parseJSON.senha = bcrypt.hashSync(parseJSON.senha, salt);
            res.json(await authServices.create(parseJSON));
        } else {
            res.status(500).json({ message: 'E-mail já cadastrado!' });
        }
    } catch (error) {
        console.log(error + 'Não foi possível criar o usuário');
        next(error);
    }
});

router.post('/login', async function (req, res, next) {
        try {
            if(!validator.default.isEmail(req.body.email) || validator.default.isEmpty(req.body.senha)){
                res.status(500).json({ message: 'E-mail ou senha inválidos!' });
            };

            const resposta = await usuarioServices.procura(req.body);
            console.log(resposta)
            if (!resposta) {
                res.status(500).json({ message: 'E-mail inválido!' });
            };

            if (bcrypt.compare(req.body.senha, resposta.senha)) {
                if (resposta) {
                    //trocar esse nome dps
                    const payload = {
                        id: resposta.id,
                        nome: resposta.nome,
                        sobrenome: resposta.sobrenome,
                        email: resposta.email,
                        senha: resposta.senha
                    };

                    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: 500 });
                    return res.json({resposta , auth: true, token: token });
                } else {
                    res.status(500).json({ message: 'Login inválido!' });
                }
            } else {
                res.status(500).json({ message: 'Senha inválido!' });
            }
        } catch (error) {
            console.log(error);
            next(error);
        }
    });

const blacklist = [];
router.post('/logout', function (req, res) {
    blacklist.push(req.headers['x-access-token'])
    res.end();
});

module.exports = { router };