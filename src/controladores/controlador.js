import { conexaoClient, conexaoPool } from "../conexoes/conexao_pg.js";
async function buscarEmpresas(request, response) {
    try {
        await conexaoClient.connect();
        const resultado = await conexaoClient.query('select * from empresas');
        await conexaoClient.end();
        return response.json(resultado.rows);
    } catch (error) {
        return response.json(error.message);
    }
}
async function buscarFiliais(request, response) {
    try {
        const resultado = await conexaoPool.query('select * from filiais');
        return response.json(resultado.rows);
    } catch (error) {
        return response.json(error.message);
    }
}
async function buscarPessoasComPaginacao(request, response) {
    const { pagina, registros } = request.query;
    const offset = (pagina === 1) ? 0 : (pagina-1)*registros;
    try {
        const query = "select * from pessoas order by id asc limit $1 offset $2";
        const params = [registros, offset];
        const { rowCount } = await conexaoPool.query("select * from pessoas");
        const resultado = await conexaoPool.query(query, params);
        const resposta = {
            pagina,
            numRegistros: registros,
            total: rowCount,
            registros: resultado.rows
        };
        return response.json(resposta);
    } catch (error) {
        return response.json(error.message);
    }
}
async function buscarEmpresaPorID(request, response) {
    const { id } = request.params;
    try {
        const query = "select * from empresas where id = $1";
        const params = [id];
        const resultado = await conexaoPool.query(query, params);
        return response.json(resultado.rows[0]);
    } catch (error) {
        return response.json(error.message);
    }
}
async function buscarFilialPorID(request, response) {
    const { id } = request.params;
    try {
        const query = "select * from filiais where id = $1";
        const params = [id];
        const resultado = await conexaoPool.query(query, params);
        return response.json(resultado.rows[0]);
    } catch (error) {
        return response.json(error.message);
    }
}
async function buscarPessoaPorID(request, response) {
    const { id } = request.params;
    try {
        const query = "select * from pessoas where id = $1";
        const params = [id];
        const resultado = await conexaoPool.query(query, params);
        return response.json(resultado.rows[0]);
    } catch (error) {
        return response.json(error.message);
    }
}
async function buscarDadosComJoin(request, response) {
    try {
        const query = `
            select e.nome as empresa, f.id as filial, p.nome, f.cidade, f.estado, f.pais
            from empresas e
            join filiais f on e.id = f.empresa_id
            join pessoas p on e.id = p.empresa_id;
        `;
        const resultado = await conexaoPool.query(query);
        return response.json(resultado.rows);
    } catch (error) {
        return response.json(error.message);
    }
}
export {
    buscarEmpresas,
    buscarFiliais,
    buscarEmpresaPorID,
    buscarFilialPorID,
    buscarPessoaPorID,
    buscarDadosComJoin,
    buscarPessoasComPaginacao
};