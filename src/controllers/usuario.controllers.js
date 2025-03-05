const Usuario = require('../models/usuario.model');
const bcrypt = require('bcrypt');
const saltosBcrypt = parseInt(process.env.SALTOS_BCRPYT);


const create = async(req, res) => {

    try {

        const { nombre, apellido, username, contraseña, email, token_dispositivo } = req.body;

        if (!nombre || !apellido || !username || !contraseña || !email) {
            return res.status(400).json({
                message: "Faltan datos obligatorios",
                error: "Campos requeridos: nombre, apellido, username, contraseña, email, token del dispostitivo"
            });
        }


        const usuario = new Usuario({
            nombre,
            apellido,
            username,
            contraseña: bcrypt.hashSync(contraseña, saltosBcrypt),
            email,
            token_dispositivo
        });

        const resultado = await usuario.createUsuario();

        if (!resultado) {
            return res.status(400).json({
                message: "Error al crear el usuario",
                error: "Error desconocido al insertar en la base de datos"
            });
        }

        return res.status(201).json({
            message: "Usuario creado exitosamente",
            data: usuario
        });


    } catch (error) {
        return res.status(500).json({
            message: "Error en el servidor a crear el usuario",
            error: error.message
        })
    }
}


const deleteUsuario = async(req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                message: "Faltan datos obligatorios",
                error: "Falta el id del usuario"
            });
        }

        const resultado = await Usuario.deleteUsuario(id);


        return res.status(200).json({
            message: "Usuario eliminado exitosamente",
            data: resultado
        });

    } catch (error) {
        return res.status(400).json({
            mensa: "Error en el servidor al eliminar el usuario",
            error: error.message
        })
    }
}


module.exports = {
    create,
    deleteUsuario
}