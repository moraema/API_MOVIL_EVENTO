const Administrador = require('../models/administrador.model');
const bcrypt = require('bcrypt');
const saltosBcrypt = parseInt(process.env.SALTOS_BCRPYT);


const create = async(req, res) => {

    try {

        const { nombre, apellido, username, contraseña, email } = req.body;

        if (!nombre || !apellido || !username || !contraseña || !email) {
            return res.status(400).json({
                message: "Faltan datos obligatorios",
                error: "Campos requeridos: nombre, apellido, username, contraseña, email"
            });
        }


        const administrador = new Administrador({
            nombre,
            apellido,
            username,
            contraseña: bcrypt.hashSync(contraseña, saltosBcrypt),
            email
        });

        const resultado = await administrador.createAdmin();

        if (!resultado) {
            return res.status(400).json({
                message: "Error al crear el administrador",
                error: "Error desconocido al insertar en la base de datos"
            });
        }

        return res.status(201).json({
            message: "Administrador creado exitosamente",
            data: administrador
        });


    } catch (error) {
        return res.status(500).json({
            message: "Error en el servidor al crear el administrador",
            error: error.message
        })
    }
}


const deleteAdministrador = async(req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                message: "Faltan datos obligatorios",
                error: "Falta el id del administrador"
            });
        }

        const resultado = await Administrador.deleteAdmin(id);


        return res.status(200).json({
            message: "Administrador eliminado exitosamente",
            data: resultado
        });

    } catch (error) {
        return res.status(400).json({
            menssage: "Error en el servidor al eliminar el administrador",
            error: error.message
        })
    }
}



module.exports = {
    create,
    deleteAdministrador
}

// listo