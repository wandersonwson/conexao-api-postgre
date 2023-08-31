import express from "express";
import { conexaoClient, conexaoPool } from "../conexao/conexao_pg.js";
const app = express();
app.use(express.json());
app.get("/client", async (request, response) => {
    try {
        await conexaoClient.connect();
        const resultado = await conexaoClient.query('select * from empresas');
        await conexaoClient.end();
        return response.json(resultado.rows);
    } catch (error) {
        return response.json(error.message);
    }
});
app.get("/pool", async (request, response) => {
    try {
        const resultado = await conexaoPool.query('select * from filiais');
        return response.json(resultado.rows);
    } catch (error) {
        return response.json(error.message);
    }
});
app.get("/empresas/:id", async (request, response) => {
    const { id } = request.params;
    try {
        const query = "select * from empresas where id = $1";
        const params = [id];
        const resultado = await conexaoPool.query(query, params);
        return response.json(resultado.rows[0]);
    } catch (error) {
        return response.json(error.message);
    }
});
app.get("/filiais/:id", async (request, response) => {
    const { id } = request.params;
    try {
        const query = "select * from filiais where id = $1";
        const params = [id];
        const resultado = await conexaoPool.query(query, params);
        return response.json(resultado.rows[0]);
    } catch (error) {
        return response.json(error.message);
    }
});
app.get("/pessoas/:id", async (request, response) => {
    const { id } = request.params;
    try {
        const query = "select * from pessoas where id = $1";
        const params = [id];
        const resultado = await conexaoPool.query(query, params);
        return response.json(resultado.rows[0]);
    } catch (error) {
        return response.json(error.message);
    }
});
export default app;