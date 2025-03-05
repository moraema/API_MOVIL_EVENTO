const db = require('../configs/db.config');

class Reserva {
    constructor({id, cantidad_lugares, total, evento_id, usuario_id}) {
        this.id = id;
        this.cantidad_lugares = cantidad_lugares;
        this.total = total;
        this.evento_id = evento_id;
        this.usuario_id = usuario_id;
    }

    async create(){
        const connection = await db.createConnection();

        const [result] = await connection.execute("INSERT INTO reserva (cantidad_lugares, total, evento_id, usuario_id) VALUES (?,?,?,?)",
            [this.cantidad_lugares, this.total, this.evento_id, this.usuario_id]
        );
        
        connection.end();
        
        if(result.insertId === 0){
            throw new Error('Error creando la reserva');
        }
        
        this.id = result.insertId;
        
        return this.id;
    }
}

module.exports = Reserva;