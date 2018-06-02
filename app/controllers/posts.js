let Post = require('../models/posts.js');

module.exports.listarPosts = function(req, res) {
    let promise = Post.find().exec();
    promise.then(
        function(posts){
            res.json(posts);
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
            res.json(post);
        }
    ).catch(
        function(error){
            res.status(404).send("Post não encontrado");
        }
    )
};

module.exports.inserirPost = function(req, res) {
    let promise = Post.create(req.body);
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
    let promise = Post.remove({"_id":id}).exec();
    promise.then(
        function(post){
            res.status(201).json(post);
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
    let promise = Post.findByIdAndUpdate(id, post).exec();
    promise.then(
        function(post){
            res.status(201).json({
                id: post.id, 
                texto: post.texto,
                likes: post.likes,
                uid: post.uid
            });
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