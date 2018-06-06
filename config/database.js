let mongoose = require ('mongoose');

module.exports = function(uri) {
    mongoose.connect(uri);
    mongoose.connection.on('connected', function() {
        console.log('Mongoose! Conectado em '+uri);
    }); 
    mongoose.connection.on('disconnected', function() {
        console.log('Mongoose! Desconectado de '+uri);
    });
    mongoose.connection.on('error', function(error){
        console.log('Mongoose! Erro na conexão: ' + error);
    });
    mongoose.set('debug',true);
}