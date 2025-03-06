const Usuario = require('../models/usuario.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET

const loginUsuario = async (req, res) => {

    try {
        
        const { username, contraseña } = req.body;

        const usuario = await Usuario.getUsername(username);

        if (!username) {
            return res.status(401).json({
                message: "Usuario o contraseña incorrectos",
            })
        };

        const contraseñaValida = await bcrypt.compare(contraseña, usuario[0].contraseña);

        if (!contraseñaValida) {
            return res.status(401).json({
                message: "Usuario o contraseña incorrectos",
            })
        };

        const token = jwt.sign({ id: usuario[0].id }, JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json({
            status: 'succes',
            message: "Sesión iniciada exitosamente",
            token: token,
            id: usuario[0].id,
            token_dispositivo: usuario[0].token_dispositivo
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error en el servidor al iniciar sesión",
            error: error.message
        })
    }

}


module.exports = {
    loginUsuario
}

// listo