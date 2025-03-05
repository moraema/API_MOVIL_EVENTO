const db = require('../configs/db.config');

class Usuario {
    constructor({id, nombre, apellido, username, contraseña, email, token_dispositivo}) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.username = username;
        this.contraseña = contraseña;
        this.email = email;
        this.token_dispositivo = token_dispositivo;
    }

    async createUsuario() {
        const connection = await db.createConnection();

        const [result] = await connection.execute("INSERT INTO usuario (nombre, apellido, username, contraseña, email, token_dispositivo) VALUES (?, ?, ?, ?, ?, ?)",
            [this.nombre, this.apellido, this.username, this.contraseña, this.email, this.token_dispositivo]
        )

        connection.end();

        if (result.insertId === 0) {
            throw new Error('Error creando el usuario');
        }

        this.id = result.insertId;

        return this.id;

    }

    static async deleteUsuario(id) {
        const connection = await db.createConnection();

        const [result] = await connection.execute("DELETE FROM usuario WHERE id =?", [id]);
        
        connection.end();

        if (result.affectedRows === 0) {
            throw new Error('No se encontró el usuario');
        }

        return
        
    }


    static async getUsername(username) {
        const connection = await db.createConnection();

        const [result] = await connection.execute("SELECT id, contraseña FROM usuario WHERE username =?", 
            [username]
        );

        connection.end();

        if (result.length === 0) {
            throw new Error('No se encontró el Usuario');
        }

        return result;

    }


}

module.exports = Usuario;

