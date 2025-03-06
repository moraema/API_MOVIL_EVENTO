const Generos = require('../models/genero.model');

const create = async(req, res) => {

    try {

        const { generoMusicales } = req.body;

        if (!generoMusicales) {
            return res.status(400).json({
                message: "Faltan datos obligatorios",
                error: "Campos requeridos: generoMusicales"
            });
        }


        const genero = new Generos({
            generoMusicales
        });

        const resultado = await genero.create();

        if (!resultado) {
            return res.status(400).json({
                message: "Error al crear el genero Musicales",
                error: "Error desconocido al insertar en la base de datos"
            });
        }

        return res.status(201).json({
            message: "Genero creado exitosamente",
            data: genero
        });


    } catch (error) {
        return res.status(500).json({
            message: "Error en el servidor al crear el genero",
            error: error.message
        })
    }
}

module.exports = {
    create
}