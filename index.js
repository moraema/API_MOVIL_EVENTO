require('dotenv').config();
const cors = require('cors')
const express = require('express');
const app = express();
const admin = require('firebase-admin');
const PORT = process.env.PORT;

const serviceFirebase = require('./firstfirebase-f8428-firebase-adminsdk-fbsvc-e236e84d1e.json');
const adminRoute = require('./src/routes/admin.routes');
const usuarioroutes = require('./src/routes/usuario.routes');
const loginRoutes = require('./src/routes/login.routes');
const eventoRoutes = require('./src/routes/evento.routes');
const reservaRoutes = require('./src/routes/reserva.routes');
const generoRoutes = require('./src/routes/genero.routes');

admin.initializeApp({
    credential: admin.credential.cert(serviceFirebase),
});

app.use(cors({origin: "*"}))
app.use(express.json());


app.use('/admin', adminRoute);
app.use('/usuarios', usuarioroutes);
app.use('/auth', loginRoutes);
app.use('/eventos', eventoRoutes);
app.use('/reservas', reservaRoutes);
app.use('/generos', generoRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}) 