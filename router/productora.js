const { Router } = require('express');
const Productora = require('../models/Productora');
const Media = require('../models/Media');
const { validationResult, check } = require('express-validator');
const { validarJWT } = require('../middleware/validar-jwt');
const { validarRolAdmin } = require('../middleware/validar-rol-admin');

const router = Router();

router.get('/', [validarJWT, validarRolAdmin], async function (req, res) {
    try {
        const productoras = await Productora.find();
        res.send(productoras);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al obtener las productoras.');
    }
});

router.post('/', [validarJWT, validarRolAdmin], [
    check('nombre', 'El nombre de la productora es requerido').not().isEmpty(),
    check('estado', 'Estado inválido').isIn(['Activo', 'Inactivo']),
    check('slogan', 'El slogan es requerido').not().isEmpty(),
    check('descripcion', 'La descripción es requerida').not().isEmpty(),
], async function (req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errores: errors.array() });
        }

        const productora = new Productora({
            nombre: req.body.nombre,
            estado: req.body.estado,
            fechaCreacion: req.body.fechaCreacion || new Date(),
            fechaActualizacion: req.body.fechaActualizacion || new Date(),
            slogan: req.body.slogan,
            descripcion: req.body.descripcion
        });

        const resultado = await productora.save();
        res.send(resultado);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al crear la productora.');
    }
});

router.put('/:productoraId', [validarJWT, validarRolAdmin], [
    check('nombre', 'El nombre de la productora es requerido').not().isEmpty(),
    check('estado', 'Estado inválido').isIn(['Activo', 'Inactivo']),
    check('slogan', 'El slogan es requerido').not().isEmpty(),
    check('descripcion', 'La descripción es requerida').not().isEmpty(),
], async function (req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errores: errors.array() });
        }

        let productora = await Productora.findById(req.params.productoraId);
        if (!productora) {
            return res.status(404).send('Productora no encontrada');
        }

        productora.nombre = req.body.nombre || productora.nombre;
        productora.estado = req.body.estado || productora.estado;
        productora.slogan = req.body.slogan || productora.slogan;
        productora.descripcion = req.body.descripcion || productora.descripcion;
        productora.fechaActualizacion = new Date();

        const resultado = await productora.save();
        res.send(resultado);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al actualizar la productora.');
    }
});

router.delete('/:productoraId', [validarJWT, validarRolAdmin], async function (req, res) {
    try {
        const productoraId = req.params.productoraId;
        const mediaEnUso = await Media.find({ productora: productoraId });

        if (mediaEnUso.length > 0) {
            return res.status(400).json({
                msg: 'No se puede eliminar la productora, está en uso por alguna película o serie.'
            });
        }

        const productora = await Productora.findByIdAndDelete(productoraId);
        if (!productora) {
            return res.status(404).send('Productora no encontrada');
        }
        res.send({ mensaje: 'Productora eliminada correctamente' });
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al eliminar la productora.');
    }
});

module.exports = router;