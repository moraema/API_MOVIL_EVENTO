const db = require('../configs/db.config');

class Administrador {
    constructor({id, nombre, apellido, username, contraseña, email }) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.username = username;
        this.contraseña = contraseña;
        this.email = email;
    }

    async createAdmin() {
        const connection = await db.createConnection();

        const [result] = await connection.execute("INSERT INTO administrador (nombre, apellido, username, contraseña, email) VALUES (?, ?, ?, ?, ?)",
            [this.nombre, this.apellido, this.username, this.contraseña, this.email]
        )

        connection.end();

        if (result.insertId === 0) {
            throw new Error('Error creando el administrador');
        }

        this.id = result.insertId;

        return this.id;

    }

    static async deleteAdmin(id) {
        const connection = await db.createConnection();

        const [result] = await connection.execute("DELETE FROM administrador WHERE id =?", [id]);
        
        connection.end();

        if (result.affectedRows === 0) {
            throw new Error('No se encontró el administrador');
        }

        return
        
    }

    static async getusername(username) {
        const connection = await db.createConnection();

        const [result] = await connection.execute("SELECT id, contraseña FROM administrador WHERE username =?", 
            [username]
        );
        
        connection.end();

        if (result.length === 0) {
            throw new Error('No se encontró el administrador');
        }

        return result;

    }


}

module.exports = Administrador;

