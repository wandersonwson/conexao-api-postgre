import pg from "pg";
const conexaoClient = new pg.Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'wsa93otl',
    database: 'conexao_pg'
});
const conexaoPool = new pg.Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'wsa93otl',
    database: 'conexao_pg'
});
export { conexaoClient, conexaoPool };