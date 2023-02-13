const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

//BBDD
mongoose.set('strictQuery', false);
mongoose.connect(
    process.env.DB_URL
);
const db = mongoose.connection;
db.on('error', error=> console.error(error));
db.once('open', ()=> console.log('Conectado a BB.DD'));

//IMPORT ROUTES
const itemsRoutes = require('./routes/items');
const imgRoutes = require('./routes/img');


//MIDDLWARE
app.use(cors());
app.use(express.json());
app.use('/items',itemsRoutes);
app.use('/img',imgRoutes );
//RUTAS
app.get('/', (req, res)=> {
    res.send('HOME!');
});


//START
app.listen(3000);