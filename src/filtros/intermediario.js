function validarID(request, response, next) {
    const { id } = request.params;
    if(isNaN(Number(id))) {
        return response.status(400).json({erro: "ID inválido"});
    }
    next();
}
function validarPaginacao(request, response, next) {
    const { pagina, registros } = request.query;
    if(pagina && registros) {
        if(isNaN(Number(pagina))) {
            return response.status(400).json({erro: "Página inválida"});
        }
        if(isNaN(Number(registros))) {
            return response.status(400).json({erro: "Número de registros inválido"});
        }
    }
    next()
}
export { validarID, validarPaginacao };