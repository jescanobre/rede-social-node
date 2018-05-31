var mongoose = require ('mongoose');

module.exports = function(uri) {
    mongoose.connect(uri);
    //o que eh uri?
    mongoose.connection.on('connected', function() {
        console.log('Mongoose! Conectado em '+uri);
    }); 
    mongoose.connection.on('disconnected', function() {
        console.log('Mongoose! Desconectado de '+uri);
    });
    mongoose.connection.on('error', function(errp){
        console.log('Mongoose! Erro na conexão: ' + erro);
    });
    mongoose.set('debug',true);
}