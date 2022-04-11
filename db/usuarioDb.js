const Sequelize = require('sequelize');
const database = require('./db');

const clienteTabela = database.define('cliente', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }, 
    cnpj: {
        type: Sequelize.STRING,
        allowNull: false
    },
     nome_fantasia: {
        type: Sequelize.STRING,
        allowNull: false
     },
     razao_social: {
        type: Sequelize.STRING,
        allowNull: false
     },
     cep: {
        type: Sequelize.INTEGER,
        allowNull: false
     },
     endereco: {
        type: Sequelize.STRING,
        allowNull: false
     },
     numero: {
        type: Sequelize.INTEGER,
        allowNull: false
     },
     complemento: {
        type: Sequelize.STRING,
        allowNull: true
     },
     bairro: {
        type: Sequelize.STRING,
        allowNull: false
     },
     cidade: {
        type: Sequelize.STRING,
        allowNull: false
     },
     uf: {
        type: Sequelize.STRING,
        allowNull: false
     }
    
}, {
    freezeTableName: true
});

const usuarioTabela = database.define('usuario', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
     nome: {
        type: Sequelize.STRING,
        allowNull: false
     },
     sobrenome: {
        type: Sequelize.STRING,
        allowNull: false
     },
     telefone: {
        type: Sequelize.STRING,
        allowNull: false
     },
     email: {
        type: Sequelize.STRING,
        allowNull: false
     },
     senha: {
        type: Sequelize.STRING,
        allowNull: false
     }
}, {
    freezeTableName: true
});

clienteTabela.hasOne(usuarioTabela, {foreignKey: 'cliente_id', targetKey: 'id', as:'cliente', hooks:true, onDelete: 'CASCADE', onUpdate: 'CASCADE'});
 usuarioTabela.belongsTo(clienteTabela, {foreignKey: 'cliente_id', targetKey: 'id'});

module.exports = {
    usuarioTabela,
    clienteTabela
}