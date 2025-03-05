const Administrador = require('../models/administrador.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const JWT_SECRET = process.env.JWT_SECRET;

const loginAdmin = async (req, res) => {
     try {
        const { username, contraseña } = req.body;

        const administrador = await Administrador.getusername(username);

        if (!administrador) {
            return res.status(401).json({
                message: "Usuario o contraseña incorrectos",
            });
        }

        const contraseñaValida = await bcrypt.compare(contraseña, administrador[0].contraseña);

        if (!contraseñaValida) {
            return res.status(401).json({
                message: "Usuario o contraseña incorrectos",
            });
        }
        
        const token = jwt.sign({ id: administrador._id }, JWT_SECRET, { expiresIn: '1h' });
        
        return res.status(200).json({
            status: "success",
            message: "Autenticación exitosa",
            token
        });

     } catch (error) {
        return res.status(500).json({
            message: "Error en el servidor a crear el administrador",
            error: error.message
        })
     }
}

module.exports = {
    loginAdmin
}

// listo