function validarID(request, response, next) {
    const { id } = request.params;
    if(isNaN(Number(id))) {
        return response.status(400).json({erro: "ID inválido"});
    }
    next();
}
export { validarID };