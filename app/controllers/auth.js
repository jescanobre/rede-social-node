let bcrypt = require('bcrypt');
let Usuario = require('../models/usuarios');

module.exports.logar = function(req, res) {
    let promise = Usuario.findOne({'email': req.body.email}).exec();
    promise.then(
        function (usuario) {
            if(bcrypt.compareSync(req.body.senha, usuario.senha)) {
                res.status(200).json({
                    id: usuario._id,
                    message: "Usuário logado!"
                });
            } else {
                res.status(401).send("Login inválido");
            }
        } 
    ).catch(
        function(erro){
            res.status(401).send("Inválido")
        }
    );    
} 

