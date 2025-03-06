const db = require('../configs/db.config');

class Genero {
    constructor({ id, generoMusicales }) {
        this.id = id;
        this.generoMusicales = generoMusicales;
    }

      async create(){
            const connection = await db.createConnection();
    
            const [result] = await connection.execute("INSERT INTO genero (generoMusicales) VALUES (?)",
                [this.generoMusicales]
            );
            
            connection.end();
            
            if(result.insertId === 0){
                throw new Error('Error creando el genero');
            }
            
            this.id = result.insertId;
            
            return this.id;
        }
    }

module.exports = Genero;