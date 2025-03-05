const Reserva = require('../models/reserva.model');

const create = async (req, res) => {
    try {
        const {cantidad_lugares, total, evento_id, usuario_id, } = req.body;

        const reserva = new Reserva({
            cantidad_lugares,
            total,
            evento_id,
            usuario_id,
        });

        const resultado = await reserva.create();

        if (!resultado) {
            return res.status(400).json({
                message: "Error al crear el administrador",
                error: "Error desconocido al insertar en la base de datos"
            });
        }

        return res.status(201).json({
            message: "Reserva creada exitosamente",
            data: reserva
        })
        
    } catch (error) {
        return res.status(500).json({
            message: "Error en el servidor al crear la reserva",
            error: error.message
        })
    }
}

module.exports = {
    create
}