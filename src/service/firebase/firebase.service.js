const admin = require('firebase-admin');

const sendNotificationByToken = async (token, data) => {
    try {
        const message = {
            notification: {
                title: `📢 Nuevo Evento: ${data.titulo}`,
                 body: `¡No te lo pierdas! 📅 ${data.fecha}`
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
            topis: "eventos"
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