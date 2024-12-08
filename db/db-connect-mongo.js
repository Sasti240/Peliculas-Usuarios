const mongoose = require('mongoose');

const getConection = async () => {

    try {

        const url = 'mongodb://santiago-iud:9o5ORnlRhxLWHXcd@cluster0-shard-00-00.tgt2t.mongodb.net:27017,cluster0-shard-00-01.tgt2t.mongodb.net:27017,cluster0-shard-00-02.tgt2t.mongodb.net:27017/bd-peliculas?ssl=true&replicaSet=atlas-8xu0t5-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0'
        
        console.log('Intentando conectar a la base de datos...');
        await mongoose.connect(url);

        console.log('Conexión exitosa');
    } catch (error) {
        console.log('Error en la conexión a la base de datos:', error);
    }
}

module.exports = {
    getConection
}