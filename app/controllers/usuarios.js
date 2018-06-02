let Usuario = require('../models/usuarios.js');
let Post = require('../models/posts.js');

module.exports.listarUsuarios = function(req, res) {
    let promise = Usuario.find().exec();
    promise.then(
        function(usuarios){
            res.json(usuarios);
        }
    ).catch(
        function(){
            res.status(404).send("Usuários não encontrados");
        }
    )
};

module.exports.obterUsuario = function(req, res) {
    let id = req.params.id;
    let promise = Usuario.findById(id).exec();
    promise.then(
        function(usuario){
            res.json({
                id: usuario.id, 
                nome: usuario.nome,
                email: usuario.email
            });
        }
    ).catch(
        function(error){
            res.status(404).send("Usuário não encontrado");
        }
    )
};

module.exports.inserirUsuario = function(req, res) {
    let usuario = new Usuario({
        nome: req.body.nome, 
        email: req.body.email,
        senha: bcrypt.hashSync (req.body.senha, 10)
    });
    let promise = Usuario.create(req.body);
    promise.then(
        function(usuario){
            console.log(usuario);
            res.status(201).json(usuario);
        }
    ).catch(
        function(error){
            res.status(500).send(error);
        }
    );
}

module.exports.deletarUsuario = function(req, res) {
    let id = req.params.id;
    let promise = Usuario.remove({"_id":id}).exec();
    promise.then(
        function(usuario){
            res.status(201).json(usuario);
        }
    ).catch(
        function(){
            res.status(404).send("Usuário não encontrado.");
        }
    )
}

module.exports.updateUsuario = function(req, res) {
    let id = req.params.id;
    let usuario = new Usuario ({
        _id: id, 
        nome: req.body.nome,
        email: req.body.email, 
        senha: req.body.senha
    })
    let promise = Usuario.findByIdAndUpdate(id, usuario).exec();
    promise.then(
        function(usuario){
            res.status(201).json({
                id: usuario.id, 
                nome: usuario.nome,
                email: usuario.email
            });
        }

    ).catch(
        function(){
            res.status(404).send("Usuário não encontrado.");
        }
    )
};

module.exports.postsUsuario = function(req, res) {
    let id = req.params.id;
    let promise = Post.find({"uid": id}).exec();
    promise.then(
        function(posts){
            res.json(posts);
        }
    ).catch(
        function(error){
            res.status(404).send("Posts não encontrado");
        }
    )
};