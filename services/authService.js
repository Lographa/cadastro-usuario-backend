const db = require('../db/db');
const tabelas = require('../db/usuarioDb');

async function create(params) {
    console.log(params)
    const createCliente = await tabelas.clienteTabela.create({
        cnpj: params.cnpj, 
        nome_fantasia: params.nome_fantasia, 
        razao_social: params.razao_social,
        cep: params.cep,
        endereco: params.endereco,
        numero: params.numero,
        complemento: params.complemento,
        bairro: params.bairro,
        cidade: params.cidade,
        uf: params.uf,
    });

    const clienteID = createCliente.id;

    
    const createUsuario = await tabelas.usuarioTabela.create({
        nome: params.nome, 
        sobrenome: params.sobrenome, 
        telefone: params.telefone,
        email: params.email,
        senha: params.senha,
        cliente_id: clienteID
    });
};

async function userExists(params) {
    
    const procuraEmail = tabelas.usuarioTabela.findOne({ where: { email: params} });
    if(procuraEmail === null){
        return ;
    } else {
        return procuraEmail;
    }
};

module.exports = {
    create,
    userExists
}