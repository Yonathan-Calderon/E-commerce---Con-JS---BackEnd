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



//MOCK
const itemsMock = require('./mock/items.json');

//MIDDLWARE
app.use(cors())
//RUTAS
app.get('/', (req, res)=> {
    res.send('HOME!');
});
//ITEMS
app.get('/items', (req, res)=> {
    res.send(itemsMock)
});
//IMAGES
app.get('/img/:imgName', (req, res)=>{
    const image = req.params.imgName; 
    res.sendFile(`${__dirname}/img/${image}`);
});


//START
app.listen(3000);