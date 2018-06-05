let jwt = require('jsonwebtoken');
let Post = require('../models/posts.js');

module.exports.listarPosts = function(req, res) {
    let promise = Post.find().exec();
    promise.then(
        function(posts){
            res.status(200).json(posts);
        }
    ).catch(
        function(){
            res.status(404).send("Posts não encontrados");
        }
    )
};

module.exports.obterPost = function(req, res) {
    let id = req.params.id;
    let promise = Post.findById(id).exec();
    promise.then(
        function(post){
            res.status(200).json(post);
        }
    ).catch(
        function(error){
            res.status(404).send("Post não encontrado");
        }
    )
};

module.exports.inserirPost = function(req, res) {
    let payload = jwt.decode(req.query.token);
    let post = new Post({
        texto: req.body.texto, 
        likes: req.body.likes,
        uid: payload.id
    })

    let promise = Post.create(post);
    promise.then(
        function(post){
            console.log(post);
            res.status(201).json(post);
        }
    ).catch(
        function(error){
            res.status(500).send(error);
        }
    );
}

module.exports.deletarPost = function(req, res) {
    let id = req.params.id;
    let payload = jwt.decode(req.query.token);
    let promise = Post.remove({"_id":id}).exec();
    promise.then(
        function(post){
            if(req.body.uid == payload.id){
                res.status(201).json("Post removido!");
            }else{
                res.status(404).send("Usuario inválido");
            }
        }
    ).catch(
        function(){
            res.status(404).send("Post não encontrado.");
        }
    )
}

module.exports.updatePost = function(req, res) {
    let id = req.params.id;

    let post = new Post ({
        _id: id, 
        texto: req.body.texto,
        likes: req.body.likes, 
        uid: req.body.uid
    })

    let payload = jwt.decode(req.query.token);

    let promise = Post.findByIdAndUpdate(id, post).exec();
    promise.then(
        function(post){
            if(req.body.uid == payload.id){
                res.status(200).json(post);
            }else{
                res.status(500).send("Usuario inválido");
            }
        }
    ).catch(
        function(){
            res.status(404).send("Post não encontrado.");
        }
    )
}

module.exports.usuarioPost = function(req, res) {
    let id = req.params.id;
    let promise = Post.findById(id).populate("uid", "-senha").exec();
    promise.then(
        function(post){
            res.json(post.uid);
        }
    ).catch(
        function(error){
            res.status(404).send("Usuário não tem posts.");
        }
    )
}