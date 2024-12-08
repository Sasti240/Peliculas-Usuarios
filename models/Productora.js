const { Schema, model } = require('mongoose');

const ProductoraSchema = Schema({
    nombre: { type: String, required: true },
    estado: { type: String, required: true, enum: ['Activo', 'Inactivo'] },
    fechaCreacion: { type: Date, required: true },
    fechaActualizacion: { type: Date, required: true },
    slogan: { type: String },
    descripcion: { type: String }
});

module.exports = model('Productora', ProductoraSchema);