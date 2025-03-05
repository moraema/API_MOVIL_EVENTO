require('dotenv').config();
const cors = require('cors')
const express = require('express');
const app = express();
const PORT = process.env.PORT;


const adminRoute = require('./src/routes/admin.routes');
const usuarioroutes = require('./src/routes/usuario.routes');
const loginRoutes = require('./src/routes/login.routes');
const eventoRoutes = require('./src/routes/evento.routes');
const reservaRoutes = require('./src/routes/reserva.routes');

app.use(cors({origin: "*"}))
app.use(express.json());

app.use('/admin', adminRoute);
app.use('/usuarios', usuarioroutes);
app.use('/auth', loginRoutes);
app.use('/eventos', eventoRoutes);
app.use('/reservas', reservaRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}) 