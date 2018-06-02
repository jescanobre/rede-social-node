let controller = require("../controllers/usuarios");
let auth = require('../controllers/auth');

module.exports = function(app) {
    app.post('/api/usuarios/logar', auth.logar);
    app.get('/api/usuarios', controller.listarUsuarios);
    app.get('/api/usuarios/:id', controller.obterUsuario);
    app.post('/api/usuarios', controller.inserirUsuario);
    app.delete('/api/usuarios/:id', controller.deletarUsuario);
    app.put('/api/usuarios/:id', controller.updateUsuario);
    app.get('/api/usuarios/:id/posts', controller.postsUsuario);
}