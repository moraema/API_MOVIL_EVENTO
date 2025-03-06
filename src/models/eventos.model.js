const db = require('../configs/db.config');

class Eventos {
    constructor({ titulo, descripcion, fecha, capacidad, lugares_disponibles, precio, imagen, ubicacion, genero}) {
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.fecha = fecha;
        this.capacidad = capacidad;
        this.lugares_disponibles = lugares_disponibles;
        this.precio = precio;
        this.imagen = imagen;
        this.ubicacion = ubicacion;
        this.genero = genero;
    }

    async createEvento() {
        const connection = await db.createConnection();

        const [result] = await connection.execute("INSERT INTO evento (titulo, descripcion, fecha, capacidad, lugares_disponibles, precio, imagen, ubicacion, genero) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [this.titulo, this.descripcion, this.fecha, this.capacidad, this.lugares_disponibles, this.precio, this.imagen, this.ubicacion, this.genero]
        )
        
        connection.end();

        if (result.insertId === 0) {
            throw new Error('Error creando el evento');
        }

        this.id = result.insertId;
        
        return this.id;
    }


    static async deleteEvento(id) {
        const connection = await db.createConnection();

        const [result] = await connection.execute("DELETE FROM reserva WHERE evento_id =?", [id]);
        const [row] = await connection.execute("DELETE FROM evento WHERE id =?", [id]);
        
        connection.end();

        if (result.affectedRows === 0 && row.affectedRows === 0) {
            throw new Error('No se encontró el evento');
        }

        return
    }
 

    static async getEvento() {
        const connection = await db.createConnection();

        const [result] = await connection.execute("SELECT id, titulo, descripcion, fecha, capacidad, lugares_disponibles, precio, imagen, ubicacion, genero FROM evento");

        connection.end();

        if (result.affectedRows === 0) {
            throw new Error("Erro al obtener los evento")
        }

        return result;
    }

    static async getEventoById(id) {
        const connection = await db.createConnection();

       const [result] = await connection.execute("SELECT id, titulo, descripcion, fecha, capacidad, lugares_disponibles, precio, imagen, ubicacion, genero FROM evento WHERE id =?", [id]);

     /*  const [result] = await connection.execute(
        `SELECT e.id, e.titulo, e.descripcion, e.fecha, e.capacidad, 
                e.lugares_disponibles, e.precio, e.imagen, e.ubicacion, e.genero, 
                r.cantidad_lugares, r.total 
         FROM evento e 
         JOIN reserva r ON e.id = r.evento_id 
         WHERE r.usuario_id = ?`, 
        [id] 
      );
      */
      

        connection.end();

        if (result.length > 0) {
            const row = result[0];
          return new Eventos({id: row.id, titulo: row.titulo, descripcion: row.descripcion, fecha: row.fecha, capacidad: row.capacidad, lugares_disponibles: row.lunares_disponibles, precio: row.precio, imagen: row.imagen, ubicacion: row.ubicacion, genero: row.genero});
          // return new Eventos({id: row.id, titulo: row.titulo, descripcion: row.descripcion, fecha: row.fecha, capacidad: row.capacidad, lugares_disponibles: row.lunares_disponibles, precio: row.precio, imagen: row.imagen, ubicacion: row.ubicacion, genero: row.genero, cantidad_lugares: row.cantidad_lugares, total: row.total});
        }

        return null;
    }

    static async updateEvento(id, {titulo, descripcion, fecha, capacidad, lugares_disponibles, precio, imagen, ubicacion, genero}) {
        const connection = await db.createConnection();

        const [result] = await connection.execute("UPDATE evento SET titulo = ?, descripcion = ?, fecha = ?, capacidad = ?, lugares_disponibles = ?, precio = ?, imagen = ?, ubicacion = ?, genero = ?  WHERE id = ?",
            [titulo, descripcion, fecha, capacidad, lugares_disponibles, precio, imagen, ubicacion, genero, id]
        )

        if (result.affectedRows === 0) {
            throw new Error("No se puedo actualizar el evento")
        }

        return
    }

}

module.exports = Eventos;