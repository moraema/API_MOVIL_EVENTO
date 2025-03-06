const admin = require('firebase-admin');

const sendNotificationByToken = async (token, data) => {
    try {
        const message = {
            notification: {
                title: `📢 SE ha creado una nueva reserva`,
                 body: `Acomprado ${data.cantidad_lugares} boletos y a pago: ${data.total} pesos MXN`
            },
            token: token,
        };

        await admin.messaging().send(message);
        console.log("Notificación enviada correctamente al token");
    } catch (error) {
        console.error("Error al enviar la notificación:", error);
    }
}

const sendNotificationByTopics = async (data) => {
    try {
        const message = {
            notification: {
                title: `�� Nuevo Evento: ${data.titulo}`,
                 body: `¡No te lo pierdas! 📅 ${data.fecha}`
            },
            topic: "eventos"
        };
        
        await admin.messaging().send(message);
        console.log("Notificación enviada correctamente a los topicos");
    } catch (error) {
        console.error("Error al enviar la notificación:", error);
    }
}

module.exports = {
    sendNotificationByToken,
    sendNotificationByTopics
};