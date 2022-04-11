const db = require('../db/db');
const tabelas = require('../db/usuarioDb');

async function procura(params) {
    if (params) {
        const procuraEmail = tabelas.usuarioTabela.findOne({
            where: { email: params.email },
            include: [
                {
                    association: 'cliente',
                    attributes: ["id","numero", "cep", "endereco", "cnpj", "nome_fantasia", "razao_social", "complemento", "bairro", "cidade", "uf"]
                }
            ]
        });
        return procuraEmail;
    }
    return
}

async function getUsuario() {
    const tabela = await tabelas.usuarioTabela.findAll({
        include: [
            {
                association: 'cliente',
                attributes: ["numero", "cep", "endereco", "cnpj", "nome_fantasia", "razao_social", "complemento", "bairro", "cidade", "uf"]
            }
        ]
    })

    return {
        tabela
    }
};

async function update(id, params) {
    const result = await tabelas.clienteTabela.update({
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
    }, {
        where: { id: id }
    }).then(async () => {
        const movimentacaoUpdate = await tabelas.usuarioTabela.update({
            nome: params.nome,
            sobrenome: params.sobrenome,
            telefone: params.telefone,
            email: params.email,
            senha: params.senha,
        }, {
            where: { cliente_id: id }
        })
    })

}

async function remove(id) {
    const deleteTabela = await tabelas.usuarioTabela.destroy({
        where: { id: id }
    });

}

module.exports = {
    getUsuario,
    update,
    remove,
    procura
};