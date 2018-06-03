let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');
let Usuario = require('../models/usuarios');

module.exports.signin = function(req, res) {
    let promise = Usuario.findOne({'email': req.body.email}).exec();
    promise.then(
        function(usuario){
            if(bcrypt.compareSync(req.body.senha, usuario.senha)) {
                let token = jwt.sign({id: usuario._id}, 'senha_secreta');
                console.log(token);
                res.status(200).json({
                    id: usuario._id,
                    token: token,
                    message: "Logado!"
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
};

module.exports.verificarToken = function(req, res, next){
    jwt.verify(req.query.token, 'senha_secreta',
        function(err, decoded) {
            if(err){
                res.status(401).json({message: "Não autorizado"})
            } else{
                next()
            }
        } 
    )
};

