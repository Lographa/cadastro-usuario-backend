const Sequelize = require('sequelize');

const sequelize = new Sequelize('cadastrodb', 'root', 'container', {dialect: 'mysql', host: 'localhost'});

module.exports = sequelize;