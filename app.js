const pets = require('./routes/pets');
const express = require('express');
const mongoose = require('mongoose');

// Importar variables de entorno
require('dotenv').config({ path: 'variables.env'});

// Conectar a la BD
mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
	.then(()=> console.log('Conectado a MongoDB...'))
	.catch(err => console.log('No se pudo conectar con MongoDB...', err));


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api/pets', pets);

// Leer localhost de variables y puerto
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;

//Configuración del puerto y conexión
app.listen(port, host, ()=> {
	console.log('Api RESTFul Ok ejecutándose...');
	console.log(`${host} ${port}`);
})