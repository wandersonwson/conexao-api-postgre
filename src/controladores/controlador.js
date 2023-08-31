import { conexaoClient, conexaoPool } from "../conexao/conexao_pg.js";
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
export {
    buscarEmpresas,
    buscarFiliais,
    buscarEmpresaPorID,
    buscarFilialPorID,
    buscarPessoaPorID
};