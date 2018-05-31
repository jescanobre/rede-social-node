let controller = require("../controllers/posts");

module.exports = function(app) {
    app.get('/api/posts', controller.listarPosts);
    app.get('/api/posts/:id', controller.obterPost);
    app.post('/api/posts', controller.inserirPost);
    app.delete('/api/posts/:id', controller.deletarPost);
    app.put('/api/posts/:id', controller.updatePost);
    app.get('/api/posts/:id/usuario', controller.usuarioPost);
}