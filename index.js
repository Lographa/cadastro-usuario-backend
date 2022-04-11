const express = require('express');
const app = express();
const db = require('./db/db');
const importado = require('./db/usuarioDb');
const usuarioRouter = require('./routes/usuarioRouter');
const authRouter = require('./routes/authRouter');
const bodyParse = require('body-parser');
const cors = require('cors');

app.use(cors());

app.use(bodyParse.json());
app.use( express.urlencoded({
    extended: true
}));

app.get('/', (req,res) => {
    res.json({message:'ok' })
})

app.listen('8000', function() {
    console.log("aberto na porta 8000");
})

db.sync(() => console.log("banco de dados aberto"));

app.use('/usuario', usuarioRouter);
app.use('/login', authRouter.router);