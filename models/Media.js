const { Schema, model } = require('mongoose');

const MediaSchema = Schema({
    serial: { type: String, required: true, unique: true },
    titulo: { type: String, required: true },
    sinopsis: { type: String, required: true },
    url: { type: String, required: true, unique: true },
    imagen: { type: String, required: true },
    fechaCreacion: { type: Date, required: true },
    fechaActualizacion: { type: Date, required: true },
    anioEstreno: { type: Number, required: true },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: false },
    genero: { type: Schema.Types.ObjectId, ref: 'Genero', required: true },
    director: { type: Schema.Types.ObjectId, ref: 'Director', required: true },
    productora: { type: Schema.Types.ObjectId, ref: 'Productora', required: true },
    tipo: { type: Schema.Types.ObjectId, ref: 'Tipo', required: true }
});

module.exports = model('Media', MediaSchema);