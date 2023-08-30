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
export default app;