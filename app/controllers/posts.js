let posts = [
    {_id: 1, texto: "Opa mundo", likes: 2, uid: 1},
    {_id: 2, texto: "Opa mundo 2", likes: 4, uid: 2}];

module.exports.listarPosts = function(req, res) {
    res.json(posts);
}

module.exports.obterPost = function(req, res) {
    let id = req.params.id; 
    let post = posts.find((p))
}