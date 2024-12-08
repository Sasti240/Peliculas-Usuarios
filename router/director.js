const { Router } = require('express');
const Director = require('../models/Director'); 
const Media = require('../models/Media');
const { validationResult, check } = require('express-validator');
const { validarJWT } = require('../middleware/validar-jwt');
const { validarRolAdmin } = require('../middleware/validar-rol-admin');

const router = Router();

router.get('/', [validarJWT, validarRolAdmin], async function (req, res) {
    try {
        const directores = await Director.find();
        res.send(directores);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al obtener los directores');
    }
});

router.post('/', [validarJWT, validarRolAdmin], [
    check('nombre', 'El nombre es requerido').not().isEmpty(),
    check('estado', 'Estado inválido').isIn(['Activo', 'Inactivo']),
], async function (req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errores: errors.array() });
        }

        const director = new Director({
            nombre: req.body.nombre,
            estado: req.body.estado,
            fechaCreacion: req.body.fechaCreacion || new Date(),
            fechaActualizacion: req.body.fechaActualizacion || new Date()
        });

        const resultado = await director.save();
        res.send(resultado);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al crear el director');
    }
});

router.put('/:directorId', [validarJWT, validarRolAdmin], [
    check('nombre', 'El nombre es requerido').not().isEmpty(),
    check('estado', 'Estado inválido').isIn(['Activo', 'Inactivo']),
], async function (req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errores: errors.array() });
        }

        let director = await Director.findById(req.params.directorId);
        if (!director) {
            return res.status(404).json({ mensaje: 'Director no encontrado' });
        }

        director.nombre = req.body.nombre;
        director.estado = req.body.estado;
        director.fechaActualizacion = new Date();

        const resultado = await director.save();
        res.send(resultado);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al actualizar el director');
    }
});

router.delete('/:directorId', [validarJWT, validarRolAdmin], async function (req, res) {
    try {
        const directorId = req.params.directorId;
        const mediaEnUso = await Media.find({ director: directorId });

        if (mediaEnUso.length > 0) {
            return res.status(400).json({
                msg: 'No se puede eliminar el director, está en uso por alguna película o serie.'
            });
        }

        const director = await Director.findByIdAndDelete(directorId);
        if (!director) {
            return res.status(404).send('Director no encontrado');
        }

        res.send({ msg: 'Director eliminado correctamente' });
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al eliminar el director.');
    }
});

module.exports = router;