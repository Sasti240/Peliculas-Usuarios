const { Schema, model } = require('mongoose')

const GeneroSchema = Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    estado: { type: String, required: true, enum: ['Activo', 'Inactivo'] },
    fechaCreacion: { type: Date, required: true},
    fechaActualizacion: { type: Date, required: true}
});

module.exports = model('Genero', GeneroSchema);