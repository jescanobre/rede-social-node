let controller = require("../controllers/usuarios");

module.exports = function(app) {
    app.get('/api/usuarios', controller.listarUsuarios);
    app.get('/api/usuarios/:id', controller.obterUsuario);
    app.post('/api/usuarios', controller.inserirUsuario);
    app.delete('/api/usuarios/:id', controller.deletarUsuario);
    // app.put('/api/usuarios/:id', controller.updateUsuario);
    // app.get('/api/usuarios/:id/posts', controller.postsUsuario);
}