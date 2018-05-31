let usuarios = [{_id: 1, nome: "Maria", email: "maria@email.com", senha: "q1w2e3"},
    {_id: 2, nome: "Joao", email: "joao@email.com", senha: "q1w2e3r4"}];

module.exports.listarUsuarios = function(req, res) {
    res.json(usuarios);
};

module.exports.obterUsuario = function(req, res) {
    let id = req.params.id;
    let usuario = usuarios.find((u => (u._id==id)));
    if(usuario) {
        res.json(usuario);
    } else {
        res.status(404).send('Usuario não encontrado :(');
    }
};

module.exports.inserirUsuario = function(req, res) {
    usuarios.push(req.body);
    res.status(200).send(req.body);
}

module.exports.deletarUsuario = function(req, res) {
    let id = req.params.id;
    let usuario = usuarios.find(usuario => (usuario._id == id));
    if (usuario) {
        let i = usuarios.indexOf(usuario);
        if (i != -1) {
            usuarios.splice(i, 1);
        }
        res.json(usuario);
    }
    else {
        res.status(404).send('Usuario não encontrado');
    }
}

module.exports.updateUsuario = function(req, res) {
    res.send('');
}
