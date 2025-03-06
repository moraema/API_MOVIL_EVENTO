const Eventos = require('../models/eventos.model');4
const { cloudinary } = require('../service/cloudinary/cloud.service');
const { sendNotificationByTopics } = require('../service/firebase/firebase.service');

const create = async (req, res) => {
    try {
        const { titulo, descripcion, fecha, capacidad, lugares_disponibles, precio, ubicacion, genero} = req.body;
        const imagen  = req.file;

        
       
        if (!imagen) {
            throw new Error('El archivo no fue cargado.');
        }

        
        const uploadResponse = await cloudinary.v2.uploader.upload(imagen.path,{
            folder: 'eventos',
            format: "jpg" 
        });

        const evento = new Eventos({
            titulo, 
            descripcion,
            fecha,
            capacidad,
            lugares_disponibles,
            precio,
            imagen: uploadResponse.secure_url,
            ubicacion,
            genero
        });

        const result = await evento.createEvento();
       
        if (result) {
            
            if (result) {
                await sendNotificationByTopics(evento)
            }

            res.status(201).json({
                message: "El evento se creó correctamente",
                data: evento
            })
        } else {
            res.status(500).json({
                message: "Error al crear el evento",
                error: error
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Error en el servidor al crear el evento",
            error: error.message
        })
    }
}

const getEvento = async (req, res) => {
    try {

        const getEventos = await Eventos.getEvento();

        if (getEventos) {
            return res.status(200).json({
                message: "Los eventos se obtuvieron correctamente",
                data: getEventos
            })
        } else {
            return res.status(404).json({
                message: "Los eventos no fueron encontrado",
                error: error
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Error en el servidor al obtener el evento",
            error: error.message
        })
    }
}

const getEventoById = async (req, res) => {
    try {
        const { id } = req.params;

        const geteventobyId = await Eventos.getEventoById(id);

        return res.status(200).json({
            message: "El evento se obtuvo correctamente",
            data: geteventobyId
        })
    } catch (error) {
        return res.status(500).json({
            message: "Error en el servidor al obtener el evento por ID",
            error: error.message
        })
    }
}

const deletoEvento = async (request, res) => {
    try {
        const { id } = request.params;

        if (!id) {
            return res.status(400).json({
                message: "Faltan datos obligatorios",
                error: "Faltan el id del evento"
            });
        }

        const deleteEvento = await Eventos.deleteEvento(id);

        if (!deleteEvento) {
            res.status(200).json({
                message: "El evento se eliminó correctamente"
            })
        } else {
            res.status(404).json({
                message: "El evento no fue encontrado"
            })
        }
        
    } catch (error) {
        return res.status(500).json({
            message: "Error en el servidor al eliminar el evento",
            error: error.message
        })
    }
}

const updateEvento = async (req, res) => {
    try {
        const { id } = req.params;
        const imagen = req.file;
       
        

        if (!id) {
            return res.status(400).json({
                message: "Faltan datos obligatorios",
                error: "Faltan el id del evento"
            });
        }

        
            const uploadResponse = await cloudinary.v2.uploader.upload(imagen.path,{
                folder: 'eventos'
            });
        

        const evento = {
            titulo: req.body.titulo,
            descripcion: req.body.descripcion,
            fecha: req.body.fecha,
            capacidad: req.body.capacidad,
            lugares_disponibles: req.body.lugares_disponibles,
            precio: req.body.precio,
            imagen: uploadResponse.secure_url,
            ubicacion: req.body.ubicacion,
            genero: req.body.genero
        }; 

        console.log(evento);
        const updateEvento = await Eventos.updateEvento(id, evento);

        if (!updateEvento) {
            return res.status(200).json({
                message: "El evento se actualizó correctamente",
                data: evento
            })
        } else {
            return res.status(404).json({
                message: "El evento no fue encontrado"
            }) 
        }
    } catch (error) {
        return res.status(500).json({
            message: "Error en el servidor al actualizar el evento",
            error: error.message
        })
    }
}

module.exports = {
    create,
    getEvento,
    getEventoById,
    updateEvento,
    deletoEvento,
}