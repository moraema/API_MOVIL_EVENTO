const Reserva = require('../models/reserva.model');
const { sendNotificationByToken } = require('../service/firebase/firebase.service');

const create = async (req, res) => {
    try {
        const {cantidad_lugares, total, evento_id, usuario_id, token } = req.body;

        const reserva = new Reserva({
            cantidad_lugares,
            total,
            evento_id,
            usuario_id,
        });

        const result = await reserva.create();

        if (result) {
            
            if (result) {
                await sendNotificationByToken(token, reserva)
            }

            res.status(201).json({
                message: "La reserva se creó correctamente",
                data: reserva
            })
        } else {
            res.status(500).json({
                message: "Error al crear la reserva",
                error: error
            })
        }
        
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