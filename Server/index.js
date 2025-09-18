const express = require('express');
const connectDB = require('./config/dataBase');
const cors = require('cors');
const productRoutes =  require('./routes/productRoute')


require('dotenv').config();

const app = express();

const corsOptions = {
    origin: ['http://localhost:5173', 'http://localhost:5176', 'http://localhost:5175','https://pasarela-de-pagos-practicas.onrender.com','https://pasarela-de-pagos-practicas.vercel.app'],
    optionsSuccessStatus: 200,
    methods: 'GET,POST,DELETE,PUT,PATCH',
    credentials: true,

}


app.use(cors(corsOptions));
app.use(express.json());

connectDB();


app.use('/api', productRoutes)



const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto: ${port}`);
});